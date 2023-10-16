import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  where
} from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const users = collection(db, 'users');

/**
 * @param {string} userId
 * @returns an object from firebase
 * @throws an error message if user is not found
 */
export const getUserById = async userId => {
  // Get user data
  const userDocRef = doc(users, userId);
  const userDocSnapshot = await getDoc(userDocRef);

  // Check if user exists
  if (!userDocSnapshot.exists()) {
    throw new Error(errorMessages.USERNOTFOUND);
  }

  return userDocSnapshot.data();
};

/**
 * @param {string} email
 * @returns an object from firebase
 * @throws an error message if user is not found
 */
export const getUserByEmail = async (email, throwError = true) => {
  // Get user data
  const searchQuery = query(users, where('email', '==', email));
  const usersData = await getDocs(searchQuery);

  // Check if user exists
  if (usersData.docs.length === 0) {
    if (throwError) {
      throw new Error(errorMessages.USERNOTFOUND);
    } else {
      return undefined;
    }
  }

  return { id: usersData.docs[0].id, ...usersData.docs[0].data() };
};
