import axios from 'axios';
import config from '../config/index';

export const login = async (email, password) => {
  const { data } = await axios.post(`${config.backendEndpoint}/user/login`, { email, password });

  return data;
};

export const destroySession = async () => {
  const { data } = await axios.delete(`${config.backendEndpoint}/user/session`);

  return data;
};
