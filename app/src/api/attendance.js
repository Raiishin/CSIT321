import axios from 'axios';
import config from '../config/index';

export const markAttendance = async userId => {
  const { data } = await axios.post(`${config.backendEndpoint}/attendance/mark`, { userId });

  return data;
};
