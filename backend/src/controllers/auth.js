/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * An example Express server showing off a simple integration of @simplewebauthn/server.
 *
 * The webpages served from ./public use @simplewebauthn/browser.
 */

import {
  // Registration
  generateRegistrationOptions,
  verifyRegistrationResponse,
  // Authentication
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from '@simplewebauthn/server';
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers';
import dotenv from 'dotenv';
import config from '../config/index.js';

dotenv.config();

const { RP_ID = 'localhost' } = process.env;
const { expectedOrigin } = config;
/**
 * RP ID represents the "scope" of websites on which a authenticator should be usable. The Origin
 * represents the expected URL from which registration or authentication occurs.
 */
export const rpID = RP_ID;
// This value is set at the bottom of page as part of server initialization (the empty string is
// to appease TypeScript until we determine the expected origin based on whether or not HTTPS
// support is enabled)

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
    username: loggedInUserId,
    devices: []
  }
};

const generateRegistration = async (req, res) => {
  const user = inMemoryUserDeviceDB[loggedInUserId];

  // The username can be a human-readable name, email, etc... as it is intended only for display.
  const { username, devices } = user;

  const opts = {
    rpName: 'SimpleWebAuthn Example',
    rpID,
    userID: loggedInUserId,
    userName: username,
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
    authenticatorSelection: {
      residentKey: 'discouraged'
    },
    /**
     * Support the two most common algorithms: ES256, and RS256
     */
    supportedAlgorithmIDs: [-7, -257]
  };

  const options = await generateRegistrationOptions(opts);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  req.session.currentChallenge = options.challenge;

  return res.send(options);
};

const generateAuthentication = async (req, res) => {
  // You need to know the user by this point
  const user = inMemoryUserDeviceDB[loggedInUserId];

  const opts = {
    timeout: 60000,
    allowCredentials: user.devices.map(dev => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports
    })),
    userVerification: 'required',
    rpID
  };

  const options = await generateAuthenticationOptions(opts);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  req.session.currentChallenge = options.challenge;

  return res.send(options);
};

const registerUser = async (req, res) => {
  const { expectedChallenge, ...body } = req.body;

  const user = inMemoryUserDeviceDB[loggedInUserId];

  console.log('body', body);
  console.log('user', user);
  console.log('expectedChallenge', expectedChallenge);

  let verification;
  try {
    const opts = {
      response: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    };
    verification = await verifyRegistrationResponse(opts);

    console.log('verification', verification);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }

  const { verified, registrationInfo } = verification;

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo;

    const existingDevice = user.devices.find(device =>
      isoUint8Array.areEqual(device.credentialID, credentialID)
    );

    if (!existingDevice) {
      /**
       * Add the returned device to the user's list of devices
       */
      const newDevice = {
        credentialPublicKey,
        credentialID,
        counter,
        transports: body.response.transports
      };
      user.devices.push(newDevice);
    }
  }

  req.session.currentChallenge = undefined;

  return res.send({ verified });
};

// app.post('/verify-authentication', async (req, res) => {
//   const body = req.body;

//   const user = inMemoryUserDeviceDB[loggedInUserId];

//   const expectedChallenge = req.session.currentChallenge;

//   let dbAuthenticator;
//   const bodyCredIDBuffer = isoBase64URL.toBuffer(body.rawId);
//   // "Query the DB" here for an authenticator matching `credentialID`
//   for (const dev of user.devices) {
//     if (isoUint8Array.areEqual(dev.credentialID, bodyCredIDBuffer)) {
//       dbAuthenticator = dev;
//       break;
//     }
//   }

//   if (!dbAuthenticator) {
//     return res.status(400).send({ error: 'Authenticator is not registered with this site' });
//   }

//   let verification;
//   try {
//     const opts = {
//       response: body,
//       expectedChallenge: `${expectedChallenge}`,
//       expectedOrigin,
//       expectedRPID: rpID,
//       authenticator: dbAuthenticator,
//       requireUserVerification: true
//     };
//     verification = await verifyAuthenticationResponse(opts);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).send({ error: error.message });
//   }

//   const { verified, authenticationInfo } = verification;

//   if (verified) {
//     // Update the authenticator's counter in the DB to the newest count in the authentication
//     dbAuthenticator.counter = authenticationInfo.newCounter;
//   }

//   req.session.currentChallenge = undefined;

//   res.send({ verified });
// });

export default {
  generateRegistration,
  generateAuthentication,
  registerUser
};
