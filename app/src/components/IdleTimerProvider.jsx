import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

const IdleTimerContext = createContext();

const IdleTimerProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const idleTimeout = 180000; // 3 minutes (180,000 milliseconds)
  const [showPopup, setShowPopup] = useState(false);

  let logoutTimer;

  const navigate = useNavigate();

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      setShowPopup(true);
    }, idleTimeout);
  };

  const logout = () => {
    setUserLoggedIn(false);
    navigate('/');
  };

  const handleConfirm = () => {
    setShowPopup(false);
    resetLogoutTimer();
  };

  const handleLogout = () => {
    setShowPopup(false);
    logout();
  };

  useEffect(() => {
    resetLogoutTimer();

    const activityEvents = ['mousemove', 'keydown'];

    const handleActivity = () => {
      resetLogoutTimer();
    };

    if (userLoggedIn) {
      activityEvents.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(logoutTimer);
    };
  }, [userLoggedIn, navigate]);

  const value = {
    userLoggedIn,
    showPopup,
    handleConfirm,
    handleLogout,
  };

  return (
    <IdleTimerContext.Provider value={value}>
      {children}
      {showPopup && (
        <ConfirmationPopup
          onCancel={handleLogout}
          onConfirm={handleConfirm}
        />
      )}
    </IdleTimerContext.Provider>
  );
};

export const useIdleTimer = () => {
  return useContext(IdleTimerContext);
};

export default IdleTimerProvider;
