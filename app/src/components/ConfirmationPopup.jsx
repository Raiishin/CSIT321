import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../store/globalStore';

const ConfirmationPopup = ({ onCancel, onConfirm }) => {
  const [timer, setTimer] = useState(15);
  const navigate = useNavigate();
  const reset = useGlobalStore(state => state.reset);

  const handleTimerExpired = useCallback(() => {
    reset(); // Set user to undefined
    navigate('/'); // Navigate back to the home page
    onCancel(); // Call onCancel to close the popup if needed
  }, [reset, navigate, onCancel]);

  useEffect(() => {
    let countdown;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      handleTimerExpired();
    }

    return () => clearInterval(countdown);
  }, [timer, handleTimerExpired]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 rounded shadow-md max-w-md z-[1000]">
        <p className="text-lg font-semibold mb-2">Session Timeout</p>
        <p className="text-lg">
          You're being timed out due to inactivity. Please choose to stay logged in or to log out.
          Otherwise, you will be logged out automatically.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-[#5355d6] text-white hover:bg-blue-600 px-4 py-2 rounded font-semibold mr-2"
            onClick={onConfirm}
          >
            Stay Logged In
          </button>
          <button
            className="bg-gray-400 text-white hover:bg-gray-500 px-4 py-2 rounded font-semibold ml-2"
            onClick={() => {
              reset();
              navigate('/');
              onCancel();
            }}
          >
            Log Off ({timer})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
