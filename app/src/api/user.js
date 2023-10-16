import axios from 'axios';
import config from '../config/index';

const baseEndpoint = `${config.backendEndpoint}/user`;

export const login = async (email, password) => {
  const { data } = await axios.post(`${baseEndpoint}/login`, { email, password });

  return data;
};

export const destroySession = async () => {
  const { data } = await axios.delete(`${baseEndpoint}/session`);

  return data;
};

export const resetPassword = async (email, password) => {
  const { data } = await axios.post(`${baseEndpoint}/reset-password`, { email, password });

  return data;
};
