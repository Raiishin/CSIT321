// Auth Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { isUndefined } from 'lodash-es';
import dotenv from 'dotenv';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from '@simplewebauthn/server';
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

dotenv.config();

const { expectedOrigin, rpID } = config;

/**
 * 2FA and Passwordless WebAuthn flows expect you to be able to uniquely identify the user that
 * performs registration or authentication. The user ID you specify here should be your internal,
 * _unique_ ID for that user (uuid, etc...). Avoid using identifying information here, like email
 * addresses, as it may be stored within the authenticator.
 *
 * Here, the example server assumes the following user has completed login:
 */

const loggedInUserId = 'internalUserId';

const inMemoryUserDeviceDB = {
  [loggedInUserId]: {
    id: loggedInUserId,
    name: loggedInUserId,
    devices: []
  }
};

const generateRegistration = async (req, res) => {
  const { userId } = req.query;

  // Query for user from firebase
  // const usersData = await getDoc(doc(db, 'users', userId));

  // const user = usersData.data();

  // const devices = JSON.parse(user.devices);

  if (!inMemoryUserDeviceDB.hasOwnProperty(userId)) {
    inMemoryUserDeviceDB[userId] = {
      id: userId,
      name: userId,
      devices: []
    };
  }

  const user = inMemoryUserDeviceDB[userId];

  const { devices } = user;

  console.log('devices', devices);

  // The username can be a human-readable name, email, etc... as it is intended only for display.
  const options = await generateRegistrationOptions({
    rpName: 'CSIT321 FYP',
    rpID,
    userID: userId,
    // userID: loggedInUserId,
    userName: user.name,
    timeout: 60000,
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
};

const generateAuthentication = async (req, res) => {
  const { userId } = req.query;

  // Query for user from firebase
  // const usersData = await getDoc(doc(db, 'users', userId));

  // const user = usersData.data();

  // const devices = JSON.parse(user.devices);

  const user = inMemoryUserDeviceDB[userId];

  const { devices } = user;

  const options = await generateAuthenticationOptions({
    timeout: 60000,
    allowCredentials: devices.map(dev => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports
    })),
    userVerification: 'required',
    rpID
  });

  return res.send(options);
};

const registerUser = async (req, res) => {
  const { expectedChallenge, userId, ...body } = req.body;

  const user = inMemoryUserDeviceDB[userId];

  const { devices } = user;

  // // Query for user from firebase
  // const userRef = doc(db, 'users', userId);
  // const usersData = await getDoc(userRef);

  // const user = usersData.data();

  // const devices = JSON.parse(user.devices);

  try {
    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    });

    const { verified, registrationInfo } = verification;

    // NOTE :: devices must store credentialID in Uint8Array format else will break

    if (!isUndefined(verified) && !isUndefined(registrationInfo)) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;

      const existingDevice = devices.find(device =>
        isoUint8Array.areEqual(device.credentialID, credentialID)
      );

      // const existingDevice = devices.find(device => {
      //   console.log(device.credentialID);
      //   device.credentialID === credentialID.toString();
      // });

      if (!existingDevice) {
        /**
         * Add the returned device to the user's list of devices
         */
        const newDevice = {
          credentialPublicKey,
          credentialID,
          // credentialID: credentialID.toString(),
          counter,
          transports: body.response.transports
        };

        devices.push(newDevice);
      }
    }

    // // Update devices for user in firebase
    // const updatedUser = { ...user };
    // updatedUser.devices = JSON.stringify(devices);

    // // Update in firebase
    // await setDoc(userRef, updatedUser);

    return res.send({ verified });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  const { expectedChallenge, userId, ...body } = req.body;

  // Query for user from firebase
  // const usersData = await getDoc(doc(db, 'users', userId));

  // const user = usersData.data();

  // const devices = JSON.parse(user.devices);

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

  console.log('dbAuthenticator', dbAuthenticator);

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

  // console.log('verification', verification);

  const { verified, authenticationInfo } = verification;

  if (verified) {
    // Update the authenticator's counter in the DB to the newest count in the authentication
    dbAuthenticator.counter = authenticationInfo.newCounter;
  }

  return res.send({ verified });
};

export default {
  generateRegistration,
  generateAuthentication,
  registerUser,
  authenticateUser
};
