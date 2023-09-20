import config from '../config/index';

export const getClasses = async userId => {
  const response = await fetch(`${config.backendEndpoint}/classes?userId=${userId}`);

  const responseJSON = await response.json();

  return responseJSON;
};
