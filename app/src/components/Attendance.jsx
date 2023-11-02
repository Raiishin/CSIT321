import React, { useEffect, useState } from 'react';
import { authenticateUser } from '../api/auth';
import useGlobalStore from '../store/globalStore';
import { markAttendance } from '../api/attendance';
import { getLatestClass } from '../api/class';
import { isUndefined } from 'lodash';
import LoadingRing from './LoadingRing';

const Attendance = () => {
  const [latestClassData, setLatestClassData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { userId, token } = useGlobalStore();

  const retrieveLatestClassData = async () => {
    const resp = await getLatestClass(token);
    setLatestClassData(resp === '' ? undefined : resp);
  };

  const attemptMarkAttendance = async () => {
    try {
      const verifyAuthenticationResponse = await authenticateUser({ userId });

      setLoading(true);

      if (verifyAuthenticationResponse.verified) {
        const resp = await markAttendance(token);

        setLoading(false);

        alert(!isUndefined(resp.status) ? resp.status : resp.message);
      }

      await retrieveLatestClassData();
    } catch (error) {
      // Some basic error handling
      alert(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);

    retrieveLatestClassData();

    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="bold text-6xl mt-8 mb-8">Class Details</h1>

      {loading || isUndefined(latestClassData) ? (
        <LoadingRing />
      ) : (
        <div className="flex flex-col gap-2">
          <p className="bold text-2xl">
            Class: {latestClassData.moduleId} - {latestClassData.moduleName}
          </p>
          <p className="bold text-2xl">Type: {latestClassData.type}</p>
          <p className="bold text-2xl">Date: {latestClassData.date}</p>
          <p className="bold text-2xl">
            Time: {latestClassData.startTime} - {latestClassData.endTime}
          </p>
          <p className="bold text-2xl">Lecturer: {latestClassData.lecturerName}</p>

          <button
            className={`mt-2 border p-2 pl-8 pr-8 ${
              latestClassData.marked === 'PRESENT' && 'bg-green-400'
            }
            ${latestClassData.marked === 'LATE' && 'bg-red'}`}
            onClick={attemptMarkAttendance}
            disabled={latestClassData.marked !== ''}>
            {latestClassData.marked !== '' ? latestClassData.marked : 'Take Attendance'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
