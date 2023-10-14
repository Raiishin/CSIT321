import React from 'react';
import { useNavigate } from 'react-router-dom';

import useGlobalStore from '../store/globalStore';
import userTypeEnum from '../constants/userTypeEnum';

import viewTimetableImage from '../assets/view-timetable.jpg';
import takeAttendanceImage from '../assets/take-attendance.jpg';
import logoutImage from '../assets/logout.jpg';
import createAccountImage from '../assets/create-new-accounts.jpg';
import editAccountImage from '../assets/edit-accounts.jpg';

import { destroySession } from '../api/user';

const Dashboard = () => {
  const navigate = useNavigate();

  const userType = useGlobalStore(state => state.userType);
  const userName = useGlobalStore(state => state.userName);
  const reset = useGlobalStore(state => state.reset);

  return (
    <div>
      <div class="flex justify-center pt-6 pb-4">
        <p className="text-cyan text-4xl font-bold">Welcome Student {userName}!</p>
      </div>

      <div class="flex justify-center pb-8">
        <p className="text-cyan text-2xl font-bold">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-3 gap-10 bg-light-cyan justify-items-center content-center h-[40vh]">
        {userType === userTypeEnum.STUDENT && (
          <>
            <button onClick={() => navigate('/timetable')}>
              <img src={viewTimetableImage} alt="viewTimetableImage" class="w-40" />
            </button>

            <button onClick={() => navigate('/attendance')}>
              <img src={takeAttendanceImage} alt="takeAttendanceImage" class="w-40" />
            </button>
          </>
        )}

        {userType === userTypeEnum.ADMIN && (
          <>
            <button onClick={() => navigate('/account/edit')}>
              <img src={editAccountImage} alt="editAccountImage" class="w-40" />
            </button>

            <button onClick={() => navigate('/account/create')}>
              <img src={createAccountImage} alt="createAccountImage" class="w-40" />
            </button>
          </>
        )}

        <div className="p-4 items-center justify-center">
          <button
            onClick={async () => {
              reset();
              navigate('/');
              await destroySession();
            }}>
            <img src={logoutImage} alt="logoutImage" class="w-40" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
