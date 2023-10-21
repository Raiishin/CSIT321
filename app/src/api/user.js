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

export const getAllUserData = async () => {
  const { data } = await axios.get(`${baseEndpoint}s`);

  return data;
};

export const updateUser = async (id, name, email, address) => {
  const { data } = await axios.post(`${baseEndpoint}/update`, { id, name, email, address });

  return data;
};

export const unlockUser = async id => {
  /* 
  Since ID is unique, we can use it in our request
  to backend to unlock the user's account

  Probably doesn't work since backend/controller/user.js 
  doesn't have an API endpoint for this
  */
  const { data } = await axios.post(`${baseEndpoint}/unlock`, { id });

  return data;
};

export const createUser = async params => {
  const { data } = await axios.post(`${baseEndpoint}/create`, params);

  return data;
};
