// User Controller
import { initializeApp } from 'firebase/app';
import bcrypt from 'bcrypt';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore/lite';
import config from '../config/index.js';
import User from '../models/user.js';
import Student from '../models/student.js';
import Lecturer from '../models/lecturer.js';
import Admin from '../models/admin.js';
import userTypeEnum from '../constants/userTypeEnum.js';
import { isUndefined } from 'lodash-es';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

const view = async (req, res) => {
  const { userId } = req.query;

  // Get current user information via email
  const userRef = doc(db, 'users', userId);
  const userDataRef = await getDoc(userRef);

  return res.json(
    userDataRef.exists() ? { user: userDataRef.data() } : { message: 'User not found' }
  );
};

const create = async (req, res) => {
  const { name, password, email, type, isActive, modules } = req.body;

  // Validate if user already exists using email
  const searchQuery = query(users, where('email', '==', email));
  const usersData = await getDocs(searchQuery);

  // Error handling if email already exists
  if (usersData.docs.length !== 0) {
    return res.json({ message: 'This email already exists' });
  }

  const modulesCol = collection(db, 'modules');

  // Check if modules exist in the "modules" collection
  for (const moduleId of modules) {
    const moduleRef = doc(modulesCol, moduleId);
    const moduleDoc = await getDoc(moduleRef);

    if (!moduleDoc.exists()) {
      return res.json({ message: `Module ${moduleId} does not exist` });
    }
  }

  return bcrypt.hash(password, config.salt, async (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.json({ message: err.message });
    }

    // Create new user, default to being a STUDENT
    const resp = await addDoc(users, {
      name,
      password: hash,
      email,
      type,
      is_active: isActive,
      modules
    });

    // Fetch the user data from the newly created user
    const userRef = doc(db, 'users', resp.id);
    const userData = await getDoc(userRef);

    let returnObject;

    // Check if the user exists (userData is not null)
    if (userData.exists()) {
      const data = userData.data();

      if (data.type === userTypeEnum.STUDENT) {
        // Create a Student object with the retrieved data
        returnObject = new Student(
          resp.id,
          data.name,
          data.password,
          data.email,
          data.type,
          data.is_active,
          data.modules
        );
      } else if (data.type === userTypeEnum.LECTURER) {
        // Create a lecturer object with the retrieved data
        returnObject = new Lecturer(
          resp.id,
          data.name,
          data.password,
          data.email,
          data.type,
          data.is_active,
          data.modules
        );
      } else if (data.type === userTypeEnum.ADMIN) {
        // Create an Admin object with the retrieved data
        returnObject = new Admin(
          resp.id,
          data.name,
          data.password,
          data.email,
          data.type,
          data.is_active,
          data.modules
        );
      } else {
        // Create a User object with the retrieved data
        returnObject = new User(
          resp.id,
          data.name,
          data.password,
          data.email,
          data.type,
          data.is_active,
          data.modules
        );
      }

      // checks if hashedPassword matches the one stored in DB
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.json({ message: err.message });
        }
      });

      return res.json(returnObject);
    } else {
      return res.json({ message: 'User not found after creation' });
    }
  });
};

const update = async (req, res) => {
  const { id, name, password, email, isActive, modules } = req.body;

  try {
    // Get current user information via email
    const userRef = doc(db, 'users', id);
    const userDataRef = await getDoc(userRef);

    // Update user information
    const userData = { ...userDataRef.data() };

    // Update name if provided and not empty
    if (!isUndefined(name) && name !== '') {
      userData.name = name;
    }

    // Update password if provided and not empty
    if (!isUndefined(password) && password !== '') {
      userData.password = password;
    }

    // Update email if provided and not empty
    if (!isUndefined(email) && email !== '') {
      userData.email = email;
    }

    // Update is_active if provided and not empty
    if (!isUndefined(isActive)) {
      userData.is_active = isActive;
    }

    // Update modules if provided and not empty
    if (!isUndefined(modules)) {
      userData.modules = modules;
    }

    // Update in Firebase
    await setDoc(userRef, userData);

    // Retrieve the updated user
    const updatedUserData = await getDoc(userRef);

    let returnObject;

    if (updatedUserData.type === userTypeEnum.STUDENT) {
      // Create a Student object with the retrieved data
      returnObject = new Student(
        id,
        updatedUserData.name,
        updatedUserData.email,
        updatedUserData.password,
        updatedUserData.type,
        updatedUserData.is_active,
        updatedUserData.modules
      );
    } else if (data.type === userTypeEnum.LECTURER) {
      // Create a lecturer object with the retrieved data
      returnObject = new Lecturer(
        id,
        updatedUserData.name,
        updatedUserData.email,
        updatedUserData.password,
        updatedUserData.type,
        updatedUserData.is_active,
        updatedUserData.modules
      );
    } else if (data.type === userTypeEnum.ADMIN) {
      // Create an Admin object with the retrieved data
      returnObject = new Admin(
        id,
        updatedUserData.name,
        updatedUserData.email,
        updatedUserData.password,
        updatedUserData.type,
        updatedUserData.is_active,
        updatedUserData.modules
      );
    } else {
      // Create a User object with the retrieved data
      returnObject = new User(
        id,
        updatedUserData.name,
        updatedUserData.email,
        updatedUserData.password,
        updatedUserData.type,
        updatedUserData.is_active,
        updatedUserData.modules
      );
    }

    return res.json(returnObject);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.json({ message: 'User update failed!' });
  }
};

const destroy = async (req, res) => {
  const { userId } = req.query;

  try {
    // Get a reference to the user document
    const userRef = doc(db, 'users', userId);
    const userDataRef = await getDoc(userRef);

    // Check if the user exists
    if (!userDataRef.exists()) {
      return res.json({ message: 'User not found' });
    }

    // Delete the user document
    await deleteDoc(userRef);

    return res.json({ message: 'User has been deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.json({ message: 'Internal server error' });
  }
};

// Returns an additional response key (success: Boolean!)
const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Get current user information via email
    const searchQuery = query(users, where('email', '==', email));
    const usersData = await getDocs(searchQuery);

    // User not found
    if (usersData.docs.length === 0) {
      return res.json({ success: false, message: 'No user found' });
    }

    const userDoc = usersData.docs[0];
    const userData = userDoc.data();

    return bcrypt.compare(password, userData.password, async (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.json({ success: result, message: err.message });
      }

      // Check if the user is active
      if (userData.is_active) {
        // Check if passwords match
        if (result) {
          return res.json({ success: result, message: 'Login successful' });
        } else {
          return res.json({ success: result, message: 'Incorrect password' });
        }
      } else {
        return res.json({ success: result, message: 'User is not active' });
      }
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export default {
  index,
  view,
  create,
  update,
  destroy,
  login
};
