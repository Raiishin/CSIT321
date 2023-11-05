import axios from 'axios';
import config from '../config/index';

const baseEndpoint = `${config.backendEndpoint}/user`;

export const login = async (email, password) => {
  const { data } = await axios.post(`${baseEndpoint}/login`, { email, password });

  return data;
};

export const resetPassword = async (email, password, token) => {
  const { data } = await axios.post(
    `${baseEndpoint}/reset-password`,
    { email, password },
    { headers: { Authorization: token } }
  );

  return data;
};

export const getAllUserData = async token => {
  const { data } = await axios.get(`${baseEndpoint}s`, { headers: { Authorization: token } });

  return data;
};

export const updateUser = async (token, id, name, email, address, isLocked) => {
  const { data } = await axios.post(
    `${baseEndpoint}/update`,
    { id, name, email, address, isLocked },
    { headers: { Authorization: token } }
  );

  return data;
};

export const createUser = async (params, token) => {
  const { data } = await axios.post(`${baseEndpoint}/create`, params, {
    headers: { Authorization: token }
  });

  return data;
};

export const deleteUser = async (token, userId) => {
  const { data } = await axios.delete(baseEndpoint, {
    params: { userId },
    headers: { Authorization: token }
  });

  return data;
};

export const resetBiometrics = async (token, userId) => {
  const { data } = await axios.post(
    `${baseEndpoint}/reset-biometrics`,
    { userId },
    { headers: { Authorization: token } }
  );

  return data;
};
