import config from '../config/index';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import axios from 'axios';
import { isUndefined } from 'lodash';

export const generateRegistration = async userId => {
  const { data } = await axios.get(`${config.backendEndpoint}/generate/registration`, {
    params: { userId }
  });

  return data;
};

export const generateAuthenticationByUserId = async userId => {
  const { data } = await axios.get(`${config.backendEndpoint}/generate/authentication`, {
    params: { userId }
  });

  return data;
};

export const generateAuthenticationByEmail = async email => {
  const { data } = await axios.get(`${config.backendEndpoint}/generate/authentication`, {
    params: { email }
  });

  return data;
};

export const verifyRegistration = async body => {
  const { data } = await axios.post(`${config.backendEndpoint}/verify/registration`, body);

  return data;
};

export const verifyAuthentication = async body => {
  const { data } = await axios.post(`${config.backendEndpoint}/verify/authentication`, body);

  return data;
};

export const registerUser = async (userId, setRegistrationStatus = () => {}) => {
  const generatedRegistration = await generateRegistration(userId);

  // Pass the options to the authenticator and wait for a response
  const registrationResponse = await startRegistration(generatedRegistration);

  setRegistrationStatus('registration in progress');

  const verifyRegistrationBody = {
    ...registrationResponse,
    userId,
    expectedChallenge: generatedRegistration.challenge
  };

  return await verifyRegistration(verifyRegistrationBody);
};

export const authenticateUser = async (params, setAuthenticationStatus = () => {}) => {
  const generatedAuthentication = !isUndefined(params.email)
    ? await generateAuthenticationByEmail(params.email)
    : await generateAuthenticationByUserId(params.userId);

  // Pass the options to the authenticator and wait for a response
  const authenticationResponse = await startAuthentication(generatedAuthentication);

  setAuthenticationStatus('authentication in progress');

  const verifyAuthenticationBody = {
    ...authenticationResponse,
    expectedChallenge: generatedAuthentication.challenge,
    ...(!isUndefined(params.email) && { email: params.email }),
    ...(!isUndefined(params.userId) && { userId: params.userId })
  };

  return await verifyAuthentication(verifyAuthenticationBody);
};
