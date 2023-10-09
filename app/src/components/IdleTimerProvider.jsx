import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

import useGlobalStore from '../store/globalStore';

const IdleTimerContext = createContext();

const IdleTimerProvider = ({ children }) => {
  const userId = useGlobalStore(state => state.userId);
  const idleTimeout = 180000; //3mins
  const [showPopup, setShowPopup] = useState(false);
  const reset = useGlobalStore(state => state.reset);

  let logoutTimer;
  let activityTimer;

  const navigate = useNavigate();

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
      setShowPopup(true); // Show the popup when idleTimeout occurs
    }, idleTimeout);
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
    clearTimeout(logoutTimer);
    clearTimeout(activityTimer);
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
      activityEvents.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(logoutTimer);
      clearTimeout(activityTimer);
      setShowPopup(false);
    };
  }, [userId, navigate]);

  const value = {
    showPopup,
    handleConfirm,
    handleLogout,
  };

  // Wrap children with IdleTimerProvider only if userId is defined
  return userId ? (
    <IdleTimerContext.Provider value={value}>
      {children}
      {showPopup && (
        <ConfirmationPopup
          onCancel={handleLogout}
          onConfirm={handleConfirm}
        />
      )}
    </IdleTimerContext.Provider>
  ) : (
    // If userId is not defined, render children directly without IdleTimerProvider
    <>{children}</>
  );
};

export default IdleTimerProvider;