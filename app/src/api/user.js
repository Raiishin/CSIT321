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

export const editUser = async (oldId, newName, newEmail) => {
  try {
    const { data } = await axios.post(`${config.backendEndpoint}/user/update`, {
      oldId,
      newName,
      newEmail
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (name, email, password, address) => {
  try {
    const { data } = await axios.post(`${config.backendEndpoint}/user/create`, {
      name,
      password,
      email
    });

    return data;
  } catch (error) {
    throw error;
  }
};
