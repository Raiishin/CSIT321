<<<<<<< HEAD
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

import config from '../config/index';
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

>>>>>>> cf392c7 (Added :: IdleTimerProvider)
import useGlobalStore from '../store/globalStore';

const IdleTimerContext = createContext();

const IdleTimerProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
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
<<<<<<< HEAD
=======
    clearTimeout(logoutTimer);
    clearTimeout(activityTimer);
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
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
<<<<<<< HEAD
      activityEvents.forEach(event => {
=======
      activityEvents.forEach((event) => {
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
<<<<<<< HEAD
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
=======
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(logoutTimer);
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
      clearTimeout(activityTimer);
      setShowPopup(false);
    };
  }, [userId, navigate]);

<<<<<<< HEAD
  return userId ? (
    <IdleTimerContext.Provider value={{ showPopup, handleConfirm, handleLogout }}>
      {children}
      {showPopup && <ConfirmationPopup onCancel={handleLogout} onConfirm={handleConfirm} />}
    </IdleTimerContext.Provider>
  ) : (
=======
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
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
    <>{children}</>
  );
};

<<<<<<< HEAD
export default IdleTimerProvider;
=======
export default IdleTimerProvider;
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
