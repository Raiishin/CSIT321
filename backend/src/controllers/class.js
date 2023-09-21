// Classes Controller
import { isAfter } from 'date-fns';
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

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const classes = collection(db, 'classes');
const modules = collection(db, 'modules');
const users = collection(db, 'users');

// TODO :: Refactor the nested loop if possible
const index = async (req, res) => {
  const { userId } = req.query;

  try {
    // Get user data
    const userDocRef = doc(users, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (!userDocSnapshot.exists()) {
      return res.json({ message: 'User not found' });
    }

    // Get the user data
    const userData = userDocSnapshot.data();

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

      const moduleClassesData = classesSnapshot.docs.map(doc => doc.data());

      // Fetch Lecturer names for each class and add them to classesByModule
      for (const classData of moduleClassesData) {
        const userDocRef = doc(users, classData.lecturer_id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const lecturerName = userDocSnapshot.data().name;

          // Create a new instance of the Classes class for each class
          const classObj = new Class(
            classData.date,
            classData.start_time,
            classData.end_time,
            lecturerName,
            classData.period,
            classData.type,
            classData.venue
          );

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
    const classesByModuleArr = Object.values(classesByModule);

    // For each module, sort according to date then time
    for (let j = 0; j < classesByModuleArr.length; j++) {
      classesByModuleArr[j].sort((a, b) => {
        if (a.date === b.date) {
          return +a.startTime.substring(0, 2) - +b.startTime.substring(0, 2);
        } else {
          const dateStrA = a.date.split('-');
          const dateStrB = b.date.split('-');

          const dateA = new Date(+dateStrA[0], +dateStrA[1] - 1, +dateStrA[2]);
          const dateB = new Date(+dateStrB[0], +dateStrB[1] - 1, +dateStrB[2]);

          return isAfter(dateB, dateA) ? -1 : 1;
        }
      });
    }

    // Return the classes data as an array
    return res.json({ data: classesByModuleArr });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default {
  index
};
