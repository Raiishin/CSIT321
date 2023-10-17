import axios from 'axios';
import config from '../config/index';

export const getModules = async () => {
  const { data } = await axios.get(`${config.backendEndpoint}/modules`);

  return data;
};
