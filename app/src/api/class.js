import axios from 'axios';
import config from '../config/index';

export const getClasses = async token => {
  const { data } = await axios.get(`${config.backendEndpoint}/classes`, {
    headers: { Authorization: token }
  });

  return data;
};

export const getLatestClass = async token => {
  const { data } = await axios.get(`${config.backendEndpoint}/class/latest`, {
    headers: { Authorization: token }
  });

  return data;
};
