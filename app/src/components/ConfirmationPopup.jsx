// ConfirmationPopup.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmationPopup = ({ message, onCancel, onConfirm }) => {
  const [timer, setTimer] = useState(15); //Countdown timer (15 seconds)
  const navigate = useNavigate();
  const location = useLocation();

  const handleTimerExpired = useCallback(() => {
    // When the timer reaches zero, navigate to the home page
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    let countdown;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      handleTimerExpired();
    }

    return () => clearInterval(countdown);
  }, [timer, handleTimerExpired]);

  // Determine whether to render the popup based on the current route
  const shouldRenderPopup = location.pathname !== '/';

  if (!shouldRenderPopup) {
    return null; // Do not render the popup if on the home page
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md">
      <p className="text-lg font-semibold mb-2">Session Timeout</p>
        <p className="text-lg">
          You're being timed out due to inactivity. Please choose to stay logged in or to log out.
          Otherwise, you will be logged out automatically.</p>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-[#5355d6] text-white hover:bg-blue-600 px-4 py-2 rounded font-semibold mr-2"
            onClick={onConfirm}
          >
            Stay Logged In
          </button>
          <button
            className="bg-gray-400 text-white hover:bg-gray-500 px-4 py-2 rounded font-semibold ml-2"
            onClick={onCancel}
          >
            Log Off ({timer})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;