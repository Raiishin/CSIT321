import config from '../config/index';

export const generateRegistration = async userId => {
  const response = await fetch(`${config.backendEndpoint}/generate/registration?userId=${userId}`);

  const responseJSON = await response.json();

  return responseJSON;
};

export const generateAuthentication = async userId => {
  const response = await fetch(
    `${config.backendEndpoint}/generate/authentication?userId=${userId}`
  );

  const responseJSON = await response.json();

  return responseJSON;
};

export const verifyRegistration = async body => {
  const response = await fetch(`${config.backendEndpoint}/verify/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  const responseJSON = await response.json();

  return responseJSON;
};

export const verifyAuthentication = async body => {
  const response = await fetch(`${config.backendEndpoint}/verify/authentication`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  const responseJSON = await response.json();

  return responseJSON;
};
