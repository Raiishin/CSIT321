import axios from 'axios';
import config from '../config/index';

export const getClasses = async token => {
  const { data } = await axios.get(`${config.backendEndpoint}/classes`, {
    headers: { Authorization: token }
  });

  return data;
};
