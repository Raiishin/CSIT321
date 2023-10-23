// Class Controller
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from 'firebase/firestore/lite';
import config from '../config/index.js';
import Class from '../models/class.js';
import { latestClass, sortClasses } from '../library/class.js';
import { getAttendanceByClassId } from '../library/attendanceLogs.js';
import { getUserById, getTotalStudentsByModuleId } from '../library/user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const classes = collection(db, 'classes');
const modules = collection(db, 'modules');
const users = collection(db, 'users');
const attendanceLogs = collection(db, 'attendance_logs');

// TODO :: Refactor the nested loop if possible
// 1 possible way is to query for all lecturers first, then each time, filter through the array and find the lecturer name
const index = async (req, res) => {
  const { userId } = req;

  try {
    // Get user data
    const userData = await getUserById(userId);

    // Retrieve Module IDs
    const moduleIds = userData.modules;

    // Initialize an object to group classes by moduleId and moduleName
    const classesByModule = {};

    // Retrieve Modules data
    for (let i = 0; i < moduleIds.length; i++) {
      const moduleId = moduleIds[i];

      const moduleDocRef = doc(modules, moduleId);
      const moduleDocSnapshot = await getDoc(moduleDocRef);

      const moduleName = moduleDocSnapshot.data().name;

      const classesQuery = query(classes, where('module_id', '==', moduleId));
      const classesSnapshot = await getDocs(classesQuery);

      const moduleClassesData = classesSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      // Fetch Lecturer names for each class and add them to classesByModule
      for (const classData of moduleClassesData) {
        const userDocRef = doc(users, classData.lecturer_id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const lecturerName = userDocSnapshot.data().name;

          // Create a new instance of the Classes class for each class
          const classObj = new Class(
            classData.id,
            classData.date,
            classData.start_time,
            classData.end_time,
            lecturerName,
            classData.period,
            classData.type,
            classData.venue
          );

          // Add totalStudents property to the classObj if the user is a staff member
          if (userData.type === userTypeEnum.STAFF) {
            const totalStudents = await getTotalStudentsByModuleId(moduleIds[i]);
            const attendees = await getAttendanceByClassId(classData.id);

            classObj.totalStudents = totalStudents;
            classObj.attendees = attendees.length;
          }

          // Get attendance status of each class
          if (userData.type === userTypeEnum.STUDENT) {
            const attendanceLogsQuery = query(attendanceLogs, where('classId', '==', classData.id));
            const attendanceLogsSnapshot = await getDocs(attendanceLogsQuery);

            classObj.attendanceStatus = !attendanceLogsSnapshot.empty
              ? attendanceLogsSnapshot.docs[0].data().status
              : undefined;
          }

          // Initialize the classes array if not already present
          if (!classesByModule.hasOwnProperty(moduleId)) {
            classesByModule[moduleId] = [{ ...classObj, moduleId, moduleName }];
          } else {
            // Push the classObj to the classes array
            classesByModule[moduleId].push({ ...classObj, moduleId, moduleName });
          }
        }
      }
    }

    const keys = Object.keys(classesByModule);
    for (let i = 0; i < keys.length; i++) {
      classesByModule[keys[i]] = sortClasses(classesByModule[keys[i]]);
    }

    // Return the classes data as an array
    return res.json({ data: classesByModule });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// For Mark Attendance Page
const latest = async (req, res) => {
  const { userId } = req;

  try {
    // Get user data
    const userData = await getUserById(userId);

    // Retrieve Module IDs
    const moduleIds = userData.modules;

    const userLatestClass = await latestClass(moduleIds);

    return res.json(userLatestClass);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default {
  index,
  latest
};
