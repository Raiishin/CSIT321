export const handleAuthenticateUser = async body => {
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

  return verified;
};
