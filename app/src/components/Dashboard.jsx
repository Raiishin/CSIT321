import React from 'react';
import { useNavigate } from 'react-router-dom';

import useGlobalStore from '../store/globalStore';
import userTypeEnum from '../constants/userTypeEnum';

import viewTimetableImage from '../assets/view-timetable.jpg';
import takeAttendanceImage from '../assets/take-attendance.jpg';
import logoutImage from '../assets/logout.jpg';
import createAccountImage from '../assets/create-new-accounts.jpg';
import editAccountImage from '../assets/edit-accounts.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const userId = useGlobalStore(state => state.userId);
  const userType = useGlobalStore(state => state.userType);
  const reset = useGlobalStore(state => state.reset);

  return (
    <div>
      <div class="flex justify-center pt-6 pb-4 z-10">
        <p className="text-cyan text-4xl font-bold">Welcome Student {userId}!</p>
      </div>

      <div class="flex justify-center pb-8 z-10">
        <p className="text-cyan text-2xl font-bold">What would you like to do today?</p>
      </div>

      <div className="z-20 grid grid-cols-3 gap-10 bg-light-cyan justify-items-center content-center h-[40vh]">
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
              <img src={editAccountImage} alt="editAccountImage" class="w-40 z-20" />
            </button>

            <button onClick={() => navigate('/account/create')}>
              <img src={createAccountImage} alt="createAccountImage" class="w-40 z-20" />
            </button>
          </>
        )}

        <div className="p-4 items-center justify-center">
          <button
            onClick={() => {
              reset();
              navigate('/');
            }}
          >
            <img src={logoutImage} alt="logoutImage" class="w-40 z-20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
