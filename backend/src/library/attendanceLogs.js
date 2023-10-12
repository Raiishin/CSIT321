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

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const attendanceLogs = collection(db, 'attendance_logs');


/**
 * @param {string} classId
 * @returns an object from firebase
 * @throws an error message if attendance is not found
 */
export const getAttendanceByClassId = async (classId, throwError) => {

    //Get Attended students
    const searchQuery = query(attendanceLogs, where('classId', '==', classId));
    const attendanceData = await getDocs(searchQuery); 

    // Check if user exists
    if (attendanceData.docs.length === 0) {
        if (throwError) {
        throw new Error(errorMessages.ATTENDANCENOTFOUND);
        } else {
        return [];
        }
    }

    // Extract user IDs from the attendance data and return them as an array with duplicates removed
    const userIds = Array.from(new Set(attendanceData.docs.map((doc) => doc.data().userId)));
    return userIds;

};
