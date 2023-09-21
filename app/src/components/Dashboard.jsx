import React from 'react';
import { useNavigate } from 'react-router-dom';

import useGlobalStore from '../store/globalStore';

import viewTimetableImage from '../assets/view-timetable.jpg';
import takeAttendanceImage from '../assets/take-attendance.jpg';
import logoutImage from '../assets/logout.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const reset = useGlobalStore(state => state.reset);

  return (
    <div>
      <div class="flex justify-center pt-6 pb-4">
        <p className="text-cyan text-4xl font-bold">Welcome Student 123!</p>
      </div>

      <div class="flex justify-center pb-8">
        <p className="text-cyan text-2xl font-bold">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-3 gap-10 bg-light-cyan justify-items-center content-center h-[40vh]">
        <div className="p-4 items-center justify-center">
          <button onClick={() => navigate('/timetable')}>
            <img src={viewTimetableImage} alt="viewTimetableImage" class="w-40" />
          </button>
        </div>

        <div className="p-4 items-center justify-center">
          <button onClick={() => navigate('/attendance')}>
            <img src={takeAttendanceImage} alt="takeAttendanceImage" class="w-40" />
          </button>
        </div>

        <div className="p-4 items-center justify-center">
          <button
            onClick={() => {
              reset();
              navigate('/');
            }}
          >
            <img src={logoutImage} alt="logoutImage" class="w-40" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
