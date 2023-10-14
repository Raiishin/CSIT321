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
import Class from '../models/class.js';
import config from '../config/index.js';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { convertTimeStringToDate } from './index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const classes = collection(db, 'classes');
const modules = collection(db, 'modules');
const users = collection(db, 'users');

export const sortClasses = classesByModuleArr => {
  const arr = [...classesByModuleArr];

  // For each module, sort according to date then time
  if (arr.length > 1) {
    arr.sort((a, b) => {
      if (a.date === b.date) {
        return +a.startTime.substring(0, 2) === +b.startTime.substring(0, 2) // Check time
          ? +a.startTime.substring(2, 2) - +b.startTime.substring(2, 2)
          : +a.startTime.substring(0, 2) - +b.startTime.substring(0, 2);
      } else {
        const dateA = convertTimeStringToDate(a.date);
        const dateB = convertTimeStringToDate(b.date);

        return isAfter(dateB, dateA) ? -1 : 1;
      }
    });
  }

  return arr;
};

export const latestClass = async moduleIds => {
  const classesData = [];

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

        classesData.push({ ...classObj, moduleId, moduleName });
      }
    }
  }

  const sortedClassesData = sortClasses(Object.values(classesData));

  // Get the first class that falls after today
  const now = new Date();

  let latestClass;

  for (let i = 0; i < sortedClassesData.length; i++) {
    const classData = sortedClassesData[i];

    if (
      (isSameDay(convertTimeStringToDate(classData.date), now) &&
        isBefore(now, convertTimeStringToDate(classData.date, classData.endTime))) ||
      isAfter(convertTimeStringToDate(classData.date, classData.startTime), now)
    ) {
      latestClass = classData;
      break;
    }
  }

  return latestClass;
};
