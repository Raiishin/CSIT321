// User Controller
import { initializeApp } from 'firebase/app';
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
import Student from '../models/student.js'
import Lecturer from '../models/lecturer.js'
import Admin from '../models/admin.js'
import userTypeEnum from '../constants/userTypeEnum.js'
import { isUndefined } from 'lodash-es';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');
const modulesCol = collection(db, 'modules');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

const view = async (req, res) => {
  const { user_id } = req.query;

   // Get current user information via email
   const userRef = doc(db, 'users', user_id);
   const userDataRef = await getDoc(userRef);

   if (userDataRef.exists()) {
    const user = userDataRef.data();
    return res.json({ user });
  } else {
    return res.json({ message: 'User not found' });
  }
};

const create = async (req, res) => {
  const { name, password, email, type, is_active, modules } = req.body;

  // Validate if user already exists using email
  const searchQuery = query(users, where('email', '==', email));
  const usersData = await getDocs(searchQuery);

  // Error handling if email already exists
  if (usersData.docs.length !== 0) {
    return res.json({ message: 'This email already exists' });
  }

  // Check if modules exist in the "modules" collection
  for (const moduleId of modules) {
    const moduleRef = doc(modulesCol, moduleId);
    const moduleDoc = await getDoc(moduleRef);

    if (!moduleDoc.exists()) {
      return res.json({ message: `Module ${moduleId} does not exist` });
    }
  }

  // Error handling if email already exists
  if (usersData.docs.length !== 0) {
    return res.json({ message: 'This email already exists' });
  }

  // Create new user, default to being a STUDENT
  const resp = await addDoc(users, {
    name,
    password,
    email,
    type, // Set the type property to userTypeEnum
    is_active,
    modules
  });

  // Fetch the user data from the newly created user
  const userRef = doc(db, 'users', resp.id);
  const userData = await getDoc(userRef);

  let returnObject;

  // Check if the user exists (userData is not null)
  if (userData.exists()) {
    const data = userData.data();
    console.log("DataType: " + data.type);
    
    if (data.type === userTypeEnum.STUDENT) {
      // Create a Student object with the retrieved data
      returnObject = new Student(resp.id, data.name, data.email, data.password, data.type, data.is_active, data.modules);
    } else if (data.type === userTypeEnum.LECTURER) {
      // Create a lecturer object with the retrieved data
      returnObject = new Lecturer(resp.id, data.name, data.email, data.password, data.type, data.is_active, data.modules);
    } else if (data.type === userTypeEnum.ADMIN) {
      // Create an Admin object with the retrieved data
      returnObject = new Admin(resp.id, data.name, data.email, data.password, data.type, data.is_active, data.modules);
    } else {
      // Create a User object with the retrieved data
      returnObject = new User(resp.id, data.name, data.email, data.password, data.type, data.is_active, data.modules);
    }

    return res.json(returnObject);

  } else {
    return res.json({ message: 'User not found after creation' });
  }

};

const update = async (req, res) => {
  const { id, name, password, email, is_active, modules } = req.body;

  try{
    // Get current user information via email
    const userRef = doc(db, 'users', id);
    const userDataRef = await getDoc(userRef);

    // Update user information
    const updatedUser = { ...userDataRef.data() };

    // Update name if provided and not empty
    if (name !== isUndefined && name !== '') {
      updatedUser.name = name;
    }

    // Update password if provided and not empty
    if (password !== isUndefined && password !== '') {
      updatedUser.password = password;
    }

    // Update email if provided and not empty
    if (email !== isUndefined && email !== '') {
      updatedUser.email = email;
    }

    // Update is_active if provided and not empty
    if (is_active !== isUndefined) {
      updatedUser.is_active = is_active;
    }

    // Update modules if provided and not empty
    if (modules !== isUndefined) {
      updatedUser.modules = modules;
    }

    // Update in Firebase
    await setDoc(userRef, updatedUser);

    // Retrieve the updated user
    const userData = await getDoc(userRef);

    let returnObject;

    if (userData.type === userTypeEnum.STUDENT) {
      // Create a Student object with the retrieved data
      returnObject = new Student(id, userData.name, userData.email, userData.password, userData.type, userData.is_active, userData.modules);
    } else if (data.type === userTypeEnum.LECTURER) {
      // Create a lecturer object with the retrieved data
      returnObject = new Lecturer(id, userData.name, userData.email, userData.password, userData.type, userData.is_active, userData.modules);
    } else if (data.type === userTypeEnum.ADMIN) {
      // Create an Admin object with the retrieved data
      returnObject = new Admin(id, userData.name, userData.email, userData.password, userData.type, userData.is_active, userData.modules);
    } else {
      // Create a User object with the retrieved data
      returnObject = new User(id, userData.name, userData.email, userData.password, userData.type, userData.is_active, userData.modules);
    }
    return res.json(returnObject);

  }catch (error) {
    console.error('Error updating user:', error);
    return res.json({ message: 'User update failed!' });
  }

};

const deleteUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    // Get a reference to the user document
    const userRef = doc(db, 'users', user_id);
    const userDataRef = await getDoc(userRef);

    // Check if the user exists
    if (!userDataRef.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user document
    await deleteDoc(userRef);

    return res.json({ message: 'User has been deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export default {
  index,
  view,
  create,
  update,
  deleteUser
};
