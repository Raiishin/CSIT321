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

  const {userId} = req.query;

  // Check if user_id is undefined, empty, or contains only whitespace
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    console.log("Invalid userId provided.");
    return res.json({ message: 'Invalid userId provided' });
  }

  try {
    // Get user data
    const userDocRef = doc(users, userId);
    const userDocSnapshot = await getDoc(userDocRef);
  
    // Check if the user document exists
    if (!userDocSnapshot.exists()) {
      console.log(`User with userId ${userId} not found.`);
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Get the user data
    const userData = userDocSnapshot.data();
  
    // Retrieve Module IDs
    const moduleIds = userData.modules;

    // Retrieve Modules data
    const modulesData = [];

    for (const moduleId of moduleIds) {
      const moduleDocRef = doc(modules, moduleId);
      const moduleDocSnapshot = await getDoc(moduleDocRef);

      if (moduleDocSnapshot.exists()) {
        modulesData.push({ id: moduleId, ...moduleDocSnapshot.data() });
      } else {
        console.log(`Module with ID ${moduleId} not found.`);
      }
    }

      // Initialize an object to group classes by moduleId and moduleName
      const classesByModule = {};

      // Fetch classes for each module
      for (const moduleId of moduleIds) {
        const classesQuery = query(classes, where('module_id', '==', moduleId));
        const classesSnapshot = await getDocs(classesQuery);
        const moduleClassesData = classesSnapshot.docs.map(doc => doc.data());

        // Get the module name or set it to null if not found
        const moduleName = modulesData.find(module => module.id === moduleId)?.name || null;

        // Fetch Lecture names for each class and add them to classesByModule
        for (const classData of moduleClassesData) {
          const userDocRef = doc(users, classData.user_id); // Use the user_id field from classData
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const lecturer_name = userDocSnapshot.data().name;

            // Create a new instance of the Classes class for each class
            const classObj = new Class(
              classData.date,
              classData.start_time,
              classData.end_time,
              lecturer_name
            );

            // Initialize the classes array if not already present
            if (!classesByModule[moduleId]) {
              classesByModule[moduleId] = {
                moduleId,
                moduleName,
                classes: [],
              };
            }

            // Push the classObj to the classes array
            classesByModule[moduleId].classes.push(classObj);
          } else {
            console.log(`Lecturer with userId ${classData.user_id} not found.`);
          }
        }
      }

      // Convert the grouped object to an array
      const classesData = Object.values(classesByModule);

      // Return the classes data as a JSON response
      return res.status(200).json({ Data: classesData });
    } catch (error) {
      console.error(`Error querying user data: ${error.message}`);
      return res.status(500).json({ error: '500 Internal server error' });
    }

};

export default {
  index
};
