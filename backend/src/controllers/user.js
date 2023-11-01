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
import { getUserById, getUserByEmail, generateToken } from '../library/user.js';
import dotenv from 'dotenv';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from '@simplewebauthn/server';
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  loginSchema,
  registerSchema,
  authenticationSchema
} from '../validator/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');

dotenv.config();

const { expectedOrigin, rpID } = process.env;

/**
 * 2FA and Passwordless WebAuthn flows expect you to be able to uniquely identify the user that
 * performs registration or authentication. The user ID you specify here should be your internal,
 * _unique_ ID for that user (uuid, etc...). Avoid using identifying information here, like email
 * addresses, as it may be stored within the authenticator.
 *
 * Here, the example server assumes the following user has completed login:
 */

const inMemoryUserDeviceDB = {
  ['internalUserId']: {
    id: 'internalUserId',
    name: 'internalUserId',
    devices: []
  }
};

const generateRegistration = async (req, res) => {
  try {
    const { userId } = userIdSchema.parse(req.query);

    if (!inMemoryUserDeviceDB.hasOwnProperty(userId)) {
      inMemoryUserDeviceDB[userId] = {
        id: userId,
        name: userId,
        devices: []
      };
    }

    const user = inMemoryUserDeviceDB[userId];

    const { devices } = user;

    const options = await generateRegistrationOptions({
      rpName: 'CSIT321 FYP',
      rpID,
      userID: userId,
      userName: user.name,
      timeout: 60 * 1000, // (1 minute)
      attestationType: 'none',
      /**
       * Passing in a user's list of already-registered authenticator IDs here prevents users from
       * registering the same device multiple times. The authenticator will simply throw an error in
       * the browser if it's asked to perform registration when one of these ID's already resides
       * on it.
       */
      excludeCredentials: devices.map(dev => ({
        id: dev.credentialID,
        type: 'public-key',

        transports: dev.transports
      })),
      authenticatorSelection: { residentKey: 'discouraged' },
      /**
       * Support the two most common algorithms: ES256, and RS256
       */
      supportedAlgorithmIDs: [-7, -257]
    });

    return res.send(options);
  } catch (error) {
    console.log(error);
  }
};

const generateAuthentication = async (req, res) => {
  try {
    let userId = req.query?.userId ?? '';

    if (!isUndefined(req.query.email)) {
      const userData = await getUserByEmail(req.query.email);

      userId = userData.id;
    }

    const user = inMemoryUserDeviceDB[userId];

    const { devices } = user;

    const options = await generateAuthenticationOptions({
      timeout: 60 * 1000, // (1 minute)
      allowCredentials: devices.map(dev => ({
        id: dev.credentialID,
        type: 'public-key',
        transports: dev.transports
      })),
      userVerification: 'required',
      rpID
    });

    return res.send(options);
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  //const { expectedChallenge, userId, ...body } = req.body;
  try {
    const { expectedChallenge, userId, ...body } = registerSchema.parse(req.body);
    const user = inMemoryUserDeviceDB[userId];

    const { devices } = user;

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    });

    const { verified, registrationInfo } = verification;

    if (!isUndefined(verified) && !isUndefined(registrationInfo)) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;

      const existingDevice = devices.find(device =>
        isoUint8Array.areEqual(device.credentialID, credentialID)
      );

      if (!existingDevice) {
        // Add the returned device to the user's list of devices
        const newDevice = {
          credentialPublicKey,
          credentialID,
          counter,
          transports: body.response.transports
        };

        devices.push(newDevice);
      }
    }

    return res.send({ verified, token: generateToken(userId) });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    //const { expectedChallenge, ...body } = req.body;
    const { expectedChallenge, ...body } = authenticationSchema.parse(req.body);

    let userId = body?.userId ?? '';

    if (!isUndefined(body.email)) {
      const userData = await getUserByEmail(body.email);

      userId = userData.id;
    }

    const user = inMemoryUserDeviceDB[userId];

    const { devices } = user;

    let dbAuthenticator;
    const bodyCredIDBuffer = isoBase64URL.toBuffer(body.rawId);

    // "Query the DB" here for an authenticator matching `credentialID`
    for (const dev of devices) {
      if (isoUint8Array.areEqual(dev.credentialID, bodyCredIDBuffer)) {
        dbAuthenticator = dev;
        break;
      }
    }

    if (isUndefined(dbAuthenticator)) {
      return res
        .status(400)
        .send({ error: { message: 'Authenticator is not registered with this site' } });
    }

    let verification;
    try {
      const opts = {
        response: body,
        expectedChallenge: `${expectedChallenge}`,
        expectedOrigin,
        expectedRPID: rpID,
        authenticator: dbAuthenticator,
        requireUserVerification: true
      };
      verification = await verifyAuthenticationResponse(opts);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }

    const { verified, authenticationInfo } = verification;

    if (verified) {
      // Update the authenticator's counter in the DB to the newest count in the authentication
      dbAuthenticator.counter = authenticationInfo.newCounter;
    }

    return res.send({ verified, token: generateToken(userId) });
  } catch (error) {
    console.log(error);
  }
};

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  return res.json({ usersData });
};

// TODO :: Should refactor this to by email as well
const view = async (req, res) => {
  //const { userId } = req.query;
  try {
    const { userId } = userIdSchema.parse(req.query);
    // Get user data
    const userData = await getUserById(userId);

    return res.json({ user: userData });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, address, email, password, type } = createUserSchema.parse(req.body);
    // Get user data
    const user = await getUserByEmail(email, false);

    if (!isUndefined(user) && !isUndefined(user.id)) {
      throw new Error(errorMessages.USERALREADYEXISTS);
    }

    // Validate if user already exists using email
    const searchQuery = query(users, where('email', '==', email));
    const usersData = await getDocs(searchQuery);

    // Error handling if email already exists
    if (usersData.docs.length !== 0) {
      throw new Error('This email already exists');
    }

    const newUserData = {
      name,
      address,
      email,
      type,
      is_active: true,
      is_locked: false,
      failed_login_attempts: 0
    };

    if (type === userTypeEnum.STUDENT) {
      const { modules, enrollmentStatus } = req.body;

      const modulesCollection = collection(db, 'modules');
      const modulesSnapshot = await getDocs(modulesCollection);
      const modulesIdData = modulesSnapshot.docs.map(doc => doc.id);

      for (let i = 0; i < modules.length; i++) {
        const el = modulesIdData.find(el => el === modules[i]);

        if (isUndefined(el)) {
          throw new Error(`Module ${moduleId} does not exist`);
        }
      }

      newUserData.modules = modules;
      newUserData.enrollment_status = enrollmentStatus;
    }

    return bcrypt.hash(password, config.salt, async (err, hash) => {
      if (err) {
        throw new Error(err);
      }

      // Create new user, default to being a STUDENT
      const resp = await addDoc(users, { ...newUserData, password: hash });

      // Fetch the user data from the newly created user
      const userData = await getUserById(resp.id);

      let returnObject;

      // Check if the user exists (userData is not null)
      if (userData.type === userTypeEnum.STUDENT) {
        // Create a Student object with the retrieved data
        returnObject = new Student(
          resp.id,
          userData.name,
          userData.address,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.is_locked,
          userData.failed_login_attempts,
          userData.modules,
          userData.enrollment_status
        );
      } else if (userData.type === userTypeEnum.STAFF) {
        // Create a staff object with the retrieved data
        returnObject = new Staff(
          resp.id,
          userData.name,
          userData.address,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.is_locked,
          userData.failed_login_attempts,
          userData.modules
        );
      } else if (userData.type === userTypeEnum.ADMIN) {
        // Create an Admin object with the retrieved data
        returnObject = new Admin(
          resp.id,
          userData.name,
          userData.address,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.is_locked,
          userData.failed_login_attempts
        );
      } else {
        // Create a User object with the retrieved data
        returnObject = new User(
          resp.id,
          userData.name,
          userData.address,
          userData.password,
          userData.email,
          userData.type,
          userData.is_active,
          userData.is_locked,
          userData.failed_login_attempts
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
  try {
    const { id, name, email, address, isLocked } = updateUserSchema.parse(req.body);
    // Get current user information via email
    const userRef = doc(db, 'users', id);
    const userDataRef = await getDoc(userRef);

    // Update user information
    const userData = userDataRef.data();
    userData.name = name;
    userData.email = email;
    userData.address = address;

    if (!isUndefined(isLocked)) {
      userData.is_locked = isLocked;
    }

    // Update in Firebase
    await setDoc(userRef, userData);

    return res.json({ success: true, message: 'User update completed!' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.json({ success: false, message: errorMessages.USERUPDATEFAILED });
  }
};

const destroy = async (req, res) => {
  //const { userId } = req.query;
  try {
    const { userId } = userIdSchema.parse(req.query);
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
  try {
    const { email, password } = loginSchema.parse(req.body);
    // Get user data
    const { id } = await getUserByEmail(email);

    const userDocRef = doc(users, id);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    if (userData.is_locked) {
      return res.json({ success: false, message: errorMessages.ACCOUNTLOCKED });
    }

    // If user fails login more than 5 times, account will be locked
    if (userData.failed_login_attempts > 4) {
      userData.is_locked = true;

      await setDoc(userDocRef, userData);

      return res.json({ success: false, message: errorMessages.ACCOUNTLOCKED });
    }

    console.log('userData', userData);
    if (userData.is_active && !userData.is_locked) {
      return bcrypt.compare(password, userData.password, async (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          throw new Error(err);
        }

        // Check if passwords match
        if (result) {
          userData.failed_login_attempts = 0; // Reset failed login attempts count
          userData.is_locked = false;

          await setDoc(userDocRef, userData);

          const userAuth = inMemoryUserDeviceDB[userDocSnapshot.id] ?? {};
          const devices = isUndefined(userAuth.devices) ? [] : userAuth.devices;

          return res.json({ success: result, ...userData, id: userDocSnapshot.id, devices });
        } else {
          userData.failed_login_attempts = userData.failed_login_attempts + 1;

          await setDoc(userDocRef, userData);

          return res.json({ success: result, message: errorMessages.INCORRECTPASSWORD });
        }
      });
    } else {
      return res.json({ success: false, message: errorMessages.USERISIANCTIVE });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  //const { email, password } = req.body;
  try {
    const { email, password } = loginSchema.parse(req.body);
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
  generateRegistration,
  generateAuthentication,
  registerUser,
  authenticateUser,
  index,
  view,
  create,
  update,
  destroy,
  login,
  resetPassword
};
