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

// edit user account function
export const editUser = async (oldId, updatedUserData) => {
  try {
    // console.log('oldId: ', oldId);
    // console.log('updatedUserData: ', updatedUserData);

    const { id, name, password, email, isActive, modules, enrollmentStatus } = updatedUserData;

    // console.log('id: ', id);
    // console.log('name: ', name);
    // console.log('password: ', password);
    // console.log('email: ', email);
    // console.log('isActive: ', isActive);
    // console.log('modules: ', modules);
    // console.log('enrollmentStatus: ', enrollmentStatus);

    const { data } = await axios.post(`${config.backendEndpoint}/user/update`, {
      id,
      name,
      password,
      email,
      isActive,
      modules,
      enrollmentStatus
    });
    console.log('data: ', data.message);
    return data; // The edited user data, if available
  } catch (error) {
    throw error; // Handle the error as needed
  }
};
export const destroySession = async () => {
  const { data } = await axios.delete(`${config.backendEndpoint}/user/session`);

  return data;
};

export const destroySession = async () => {
  const { data } = await axios.delete(`${config.backendEndpoint}/user/session`);

  return data;
};
