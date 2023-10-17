import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const attendanceLogs = collection(db, 'attendance_logs');

/**
 * @param {string} classId
 * @returns an array of attendance objects from firebase
 * @throws an error message if attendance is not found
 */
export const getAttendanceByClassId = async classId => {
  const searchQuery = query(attendanceLogs, where('classId', '==', classId));
  const attendanceData = (await getDocs(searchQuery)).docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  const uniqueUserIds = {};
  const resultArray = [];

  // Dedupe the attendanceData based on userId
  for (const obj of attendanceData) {
    if (!uniqueUserIds[obj.userId]) {
      uniqueUserIds[obj.userId] = true;
      resultArray.push(obj);
    }
  }

  return resultArray;
};
