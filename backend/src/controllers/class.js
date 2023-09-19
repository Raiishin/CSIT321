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

const index = async (req, res) => {
  const { userId } = req.query;

  try {
    const userDocRef = doc(users, userId);

    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      console.log(`User with userId ${userId} not found.`);
      return res.json({ message: 'User not found' });
    }

    const userData = userDocSnapshot.data();

    // Retrieve classes from user
    const userClasses = userData.classes;

    // Parse the userClasses into an array of class IDs
    const userClassesArray = userClasses.replace(/[{}]/g, '').split(',');

    // Fetch the classes associated with the user's class IDs
    const classesData = [];

    for (const classId of userClassesArray) {
      // Query the classes collection based on classId
      const classQuery = query(classes, where('class_id', '==', classId.trim()));
      const classSnapshot = await getDocs(classQuery);

      const classData = classSnapshot.docs.map(doc => doc.data());

      classesData.push(...classData);
    }

    // Fetch module names for each class
    for (const classObj of classesData) {
      const module_id = classObj.modules_id;
      // Create a query with 'where' condition for 'module_id'
      const searchQuery = query(modules, where('modules_id', '==', module_id));
      const modulesData = await getDocs(searchQuery);

      if (!modulesData.empty) {
        // Access the 'name' field
        classObj.module_name = modulesData.docs[0].data().name;
      } else {
        classObj.module_name = null; // Module not found
      }
    }

    // Fetch Lecture names for each class
    for (const classObj of classesData) {
      const userId = classObj.userId;
      const userDocRef = doc(users, userId);
      const userData = await getDoc(userDocRef);

      if (userData.exists()) {
        // Access the data directly using .data()
        classObj.lecturer_name = userData.data().name;

        // Initialize the classes property as an empty array
        classObj.classes = [];

        // Create a new instance of the Classes class and store it in the array
        const classInstance = new Class(
          classObj.date,
          classObj.start_time,
          classObj.end_time,
          classObj.lecturer_name
        );

        classObj.classes.push(classInstance);
      } else {
        classObj.lecturer_name = null;
      }
    }
    // Create a Map to group classes by module
    const classesByModule = new Map();

    // Group classes by module
    for (const classInstance of classesData) {
      const module_id = classInstance.modules_id;
      if (!classesByModule.has(module_id)) {
        classesByModule.set(module_id, {
          modules_id: module_id,
          module_name: classInstance.module_name,
          classes: []
        });
      }
      classesByModule.get(module_id).classes.push({
        date: classInstance.date,
        start_time: classInstance.start_time,
        end_time: classInstance.end_time,
        lecturer_name: classInstance.lecturer_name
      });
    }

    // Convert the Map to an array of objects
    const resultData = Array.from(classesByModule.values());

    // Respond with the modified data structure
    return res.json({ data: resultData });
  } catch (error) {
    console.error(`Error querying user or classes: ${error.message}`);
    return res.status(500).json({ error: '500 Internal server error' });
  }
};

export default {
  index
  //   view,
  //   create,
  //   update
};
