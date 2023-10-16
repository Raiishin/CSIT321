import { differenceInMinutes, isBefore, isAfter } from 'date-fns';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore/lite';
import config from '../config/index.js';
import attendanceStatusEnum from '../constants/attendanceStatusEnum.js';
import { latestClass } from '../library/class.js';
import { getUserById } from '../library/user.js';
import { getObjectKey, convertTimeStringToDate } from '../library/index.js';
import errorMessages from '../constants/errorMessages.js';
import { isUndefined } from 'lodash-es';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const attendanceLogs = collection(db, 'attendance_logs');

const create = async (req, res) => {
  const { userId } = req.body;

  try {
    // Get user data
    const userData = await getUserById(userId);

    // Retrieve Module IDs
    const moduleIds = userData.modules;

    // Retrieve latest class
    const userLatestClass = await latestClass(moduleIds);
    console.log('userLatestClass', userLatestClass);

    if (isUndefined(userLatestClass)) {
      throw new Error(errorMessages.NOCLASSESAVAILABLE);
    }

    // Check if class is already marked
    const attendanceLogsQuery = query(attendanceLogs, where('classId', '==', userLatestClass.id));
    const attendanceLogsSnapshot = await getDocs(attendanceLogsQuery);

    attendanceLogsSnapshot.docs.map(doc => {
      if (doc.exists()) {
        throw new Error(errorMessages.ATTENDANCEMARKED);
      }
    });

    // Check if now is within the time frame of 30 minutes before class start to class end
    const now = new Date();

    const startDateTime = convertTimeStringToDate(userLatestClass.date, userLatestClass.startTime);
    const endDateTime = convertTimeStringToDate(userLatestClass.date, userLatestClass.endTime);

    if (isAfter(now, endDateTime) || differenceInMinutes(startDateTime, now) > 30) {
      throw new Error(errorMessages.UNABLETOMARKATTENDANCE);
    }

    const attendanceStatus =
      (isBefore(now, startDateTime) && differenceInMinutes(startDateTime, now) <= 30) || // If now is before startDateTime + less than 30 minutes before startDateTime = PRESENT
      (isAfter(now, startDateTime) && differenceInMinutes(now, startDateTime) <= 60) // If now is after startDateTime + less than 60 minutes after startDateTime = PRESENT
        ? attendanceStatusEnum.PRESENT
        : attendanceStatusEnum.LATE;

    const data = {
      userId: userId,
      classId: userLatestClass.id,
      createdAt: now,
      status: attendanceStatus
    };

    await addDoc(attendanceLogs, data);

    // If data is returned with no error, return success with status
    return res.json({ status: getObjectKey(attendanceStatusEnum, attendanceStatus) });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default {
  create
};
