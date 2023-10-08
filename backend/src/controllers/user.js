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
import Staff from '../models/staff.js';
import Admin from '../models/admin.js';
import userTypeEnum from '../constants/userTypeEnum.js';
import { isUndefined } from 'lodash-es';
import errorMessages from '../constants/errorMessages.js';
import { getUserById, getUserByEmail } from '../library/user.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

// TODO :: Should refactor this to by email as well
const view = async (req, res) => {
  const { userId } = req.query;

  try {
    // Get user data
    const userData = await getUserById(userId);

    return res.json({ user: userData });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { name, password, email, type, isActive, modules, enrollmentStatus } = req.body;

  try {
    // Get user data
    const user = await getUserByEmail(email, false);

    if (!isUndefined(user) && !isUndefined(user.id)) {
      throw new Error(errorMessages.USERALREADYEXISTS);
    }

    const modulesCol = collection(db, 'modules');

    // Check if modules exist in the "modules" collection
    for (const moduleId of modules) {
      const moduleRef = doc(modulesCol, moduleId);
      const moduleDoc = await getDoc(moduleRef);

      if (!moduleDoc.exists()) {
        throw new Error(`Module ${moduleId} does not exist`);
      }
    }

    return bcrypt.hash(password, config.salt, async (err, hash) => {
      if (err) {
        throw new Error(err);
      }

      // Create new user, default to being a STUDENT
      const resp = await addDoc(users, {
        name,
        password: hash,
        email,
        type,
        is_active: isActive,
        modules,
        enrollment_status: enrollmentStatus
      });

      // Fetch the user data from the newly created user
      const userData = await getUserById(resp.id);

      console.log('userData', userData);

      let returnObject;

      if (userData.type === userTypeEnum.STUDENT) {
        // Create a Student object with the retrieved data
        returnObject = new Student(
          resp.id,
          userData.name,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.modules,
          userData.enrollment_status
        );
      } else if (userData.type === userTypeEnum.STAFF) {
        // Create a staff object with the retrieved data
        returnObject = new Staff(
          resp.id,
          userData.name,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.modules
        );
      } else if (userData.type === userTypeEnum.ADMIN) {
        // Create an Admin object with the retrieved data
        returnObject = new Admin(
          resp.id,
          userData.name,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.modules
        );
      } else {
        // Create a User object with the retrieved data
        returnObject = new User(
          resp.id,
          userData.name,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.modules
        );
      }

      // checks if hashedPassword matches the one stored in DB
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          throw new Error(err);
        }
      });

      return res.json(returnObject);
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id, name, password, email, isActive, modules, enrollmentStatus } = req.body;

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

    // Update enrollmentStatus if provided and not empty
    if (!isUndefined(enrollmentStatus)) {
      userData.enrollmentStatus = enrollmentStatus;
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
        updatedUserData.modules,
        updatedUserData.enrollmentStatus
      );
    } else if (data.type === userTypeEnum.STAFF) {
      // Create a staff object with the retrieved data
      returnObject = new Staff(
        id,
        updatedUserData.name,
        updatedUserData.email,
        updatedUserData.password,
        updatedUserData.type,
        updatedUserData.is_active,
        updatedUserData.modules
      );
    } else if (updatedUserData.type === userTypeEnum.ADMIN) {
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
      throw new Error(errorMessages.USERNOTFOUND);
    }

    // Delete the user document
    await deleteDoc(userRef);

    return res.json({ message: 'User has been deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.json({ message: error.message });
  }
};

// Returns an additional response key (success: Boolean!)
const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Get user data
    const userData = await getUserByEmail(email);

    return bcrypt.compare(password, userData.data.password, async (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.json({ success: result, message: err.message });
      }

      // Check if the user is active
      if (userData.data.is_active) {
        // Check if passwords match
        return res.json({
          success: result,
          userName: userData.data.name,
          userId: userData.id,
          userType: userData.data.type,
          message: result ? 'Login successful' : errorMessages.INCORRECTPASSWORD
        });
      } else {
        return res.json({ success: result, message: errorMessages.USERISIANCTIVE });
      }
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Get current user information via email
    const searchQuery = query(users, where('email', '==', email));
    const usersData = await getDocs(searchQuery);

    // User not found
    if (usersData.docs.length === 0) {
      throw new Error(errorMessages.USERNOTFOUND);
    }

    const userDoc = usersData.docs[0];
    const userData = userDoc.data();
    const userRef = doc(db, 'users', userDoc.id);

    // Update password if provided and not empty
    if (!isUndefined(password) && password !== '') {
      bcrypt.compare(password, userData.password, async (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.json({ success: false, message: 'Error comparing passwords' });
        }

        if (!result) {
          // Passwords don't match, proceed with the update
          const hashedPassword = await bcrypt.hash(password, config.salt);
          userData.password = hashedPassword;

          // Update in Firebase
          await setDoc(userRef, userData);

          return res.json({ success: true, message: 'Password reset successful' });
        } else {
          // Passwords match, return a response without updating
          return res.json({ success: true, message: 'Password remains unchanged' });
        }
      });
    } else {
      // Password provided is empty return error message.
      return res.json({ success: false, message: 'Password cannot be empty' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default {
  index,
  view,
  create,
  update,
  destroy,
  login,
  resetPassword
};
