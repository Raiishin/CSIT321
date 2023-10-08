import axios from 'axios';
import config from '../config/index';

export const getClasses = async userId => {
  const { data } = await axios.get(`${config.backendEndpoint}/classes`, {
    params: { userId }
  });

  return data;
};
