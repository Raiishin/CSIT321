// Classes Controller
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
            lecturerName
          );

          // Initialize the classes array if not already present
          if (!classesByModule.hasOwnProperty(moduleId)) {
            classesByModule[moduleId] = { moduleId, moduleName, classes: [classObj] };
          } else {
            // Push the classObj to the classes array
            classesByModule[moduleId].classes.push(classObj);
          }
        }
      }
    }

    // Return the classes data as an array
    return res.status(200).json({ data: Object.values(classesByModule) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  index
};
