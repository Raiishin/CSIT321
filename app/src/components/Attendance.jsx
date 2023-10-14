import React, { useState } from 'react';
import { authenticateUser } from '../api/auth';
import useGlobalStore from '../store/globalStore';
import { markAttendance } from '../api/attendance';
import { isUndefined } from 'lodash';

const Attendance = () => {
  const [authenticationStatus, setAuthenticationStatus] = useState('blank');

  const userId = useGlobalStore(state => state.userId);

  const attemptMarkAttendance = async () => {
    try {
      const verifyAuthenticationResponse = await authenticateUser(userId, setAuthenticationStatus);

      if (verifyAuthenticationResponse.verified) {
        const resp = await markAttendance(userId);
        setAuthenticationStatus(!isUndefined(resp.status) ? resp.status : resp.message);
      }
    } catch (error) {
      // Some basic error handling
      setAuthenticationStatus(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div>
        <button onClick={attemptMarkAttendance}>Hello click me</button>
        <div>Authentication Status: {authenticationStatus}</div>
      </div>
    </div>
  );
};

export default Attendance;
