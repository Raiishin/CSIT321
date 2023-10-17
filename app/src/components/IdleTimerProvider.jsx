import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

import config from '../config/index';
import useGlobalStore from '../store/globalStore';

const IdleTimerContext = createContext();

const IdleTimerProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  const userId = useGlobalStore(state => state.userId);
  const reset = useGlobalStore(state => state.reset);

  const navigate = useNavigate();

  let activityTimer;

  const resetLogoutTimer = () => {
    clearTimeout(activityTimer);

    activityTimer = setTimeout(() => {
      setShowPopup(true); // Show the popup when idleTimeout occurs
    }, config.sessionIdleTimeout);
  };

  const logout = () => {
    resetLogoutTimer();
    setShowPopup(false); // Reset the popup state
    reset(); // Set user to undefined
    navigate('/');
  };

  const handleConfirm = () => {
    setShowPopup(false);
    resetLogoutTimer();
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    resetLogoutTimer();

    const activityEvents = ['mousemove', 'keydown'];

    const handleActivity = () => {
      clearTimeout(activityTimer); // Reset the activity timer
      resetLogoutTimer(); // Start the logout timer again
    };

    // Conditionally use the IdleTimerProvider when userId is defined
    if (userId) {
      activityEvents.forEach(event => {
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(activityTimer);
      setShowPopup(false);
    };
  }, [userId, navigate]);

  return userId ? (
    <IdleTimerContext.Provider value={{ showPopup, handleConfirm, handleLogout }}>
      {children}
      {showPopup && <ConfirmationPopup onCancel={handleLogout} onConfirm={handleConfirm} />}
    </IdleTimerContext.Provider>
  ) : (
    <>{children}</>
  );
};

export default IdleTimerProvider;
