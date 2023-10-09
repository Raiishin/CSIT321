<<<<<<< HEAD
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
=======
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

import config from '../config/index';
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
import useGlobalStore from '../store/globalStore';

const IdleTimerContext = createContext();

const IdleTimerProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
  const [showPopup, setShowPopup] = useState(false);

  const userId = useGlobalStore(state => state.userId);
  const reset = useGlobalStore(state => state.reset);

  const navigate = useNavigate();

  let activityTimer;

  const resetLogoutTimer = () => {
    clearTimeout(activityTimer);

    activityTimer = setTimeout(() => {
      setShowPopup(true); // Show the popup when idleTimeout occurs
<<<<<<< HEAD
    }, idleTimeout);
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
=======
    }, config.sessionIdleTimeout);
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
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
<<<<<<< HEAD
=======
    clearTimeout(logoutTimer);
    clearTimeout(activityTimer);
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
=======
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
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
<<<<<<< HEAD
      activityEvents.forEach(event => {
=======
      activityEvents.forEach((event) => {
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
=======
      activityEvents.forEach(event => {
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
<<<<<<< HEAD
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
=======
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
      clearTimeout(activityTimer);
      setShowPopup(false);
    };
  }, [userId, navigate]);

<<<<<<< HEAD
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
=======
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
  return userId ? (
    <IdleTimerContext.Provider value={{ showPopup, handleConfirm, handleLogout }}>
      {children}
      {showPopup && <ConfirmationPopup onCancel={handleLogout} onConfirm={handleConfirm} />}
    </IdleTimerContext.Provider>
  ) : (
<<<<<<< HEAD
    // If userId is not defined, render children directly without IdleTimerProvider
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
=======
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
    <>{children}</>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default IdleTimerProvider;
=======
export default IdleTimerProvider;
>>>>>>> cf392c7 (Added :: IdleTimerProvider)
=======
export default IdleTimerProvider;
>>>>>>> d54bbe2 (Added :: Timetable to separate by Module Code)
