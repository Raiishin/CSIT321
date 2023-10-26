import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleRate = () => {
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSfdGzaK1cwkOHoNZS1DKdRjenpBGZM8dJJ9Bsd-jAoGICowPw/viewform?usp=sf_link';
  };
  return (
    <div>
      <div className="py-20">
        <div className="flex flex-col m-16 place-items-center">
          <p className="text-5xl font-bold text-white">You have logout successfully!</p>
          <p className="text-5xl font-bold text-white">Thank you for using</p>
          <p className="text-5xl font-bold text-white">SIM Attendance Application</p>
          <p className="text-3xl font-bold text-white pt-10">
            Please leave a rating / review to help us improve
          </p>

          <button
            onClick={() => {
              handleRate();
            }}
            class="mt-10 bg-transparent bg-blue-500 text-blue-700 font-semibold text-white py-2 px-4 border border-white-500 hover:border-transparent rounded">
            Leave Rating / Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
