import axios from 'axios';
import config from '../config/index';

export const markAttendance = async token => {
  const { data } = await axios.post(
    `${config.backendEndpoint}/attendance/mark`,
    {},
    { headers: { Authorization: token } }
  );

  return data;
};
