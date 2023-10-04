import React, { useState,useCallback } from 'react';
import { Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import {
  generateRegistration,
  generateAuthentication,
  verifyRegistration,
  verifyAuthentication
} from './api/user';


import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import FAQs from './components/FAQs';
import AdminMainPage from './components/AdminMainPage';
import EditAccountPage from './components/SAEditAccountPage';
import CreateAccountPage from './components/SACreateAccountPage';
import EditExistingUserPage from './components/SAEditExistingUserPage';
import StaffAttendancePage from './components/StaffAttendancePage';
import StaffTimetable from './components/StaffTimeTable';

import IdleTimerProvider from './components/IdleTimerProvider';

const App = () => {
  
  return (
      <div>
      <IdleTimerProvider>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/FAQs" element={<FAQs />} />
      </Routes>

      </IdleTimerProvider>
      {/*
      <EditExistingUserPage/>
      <CreateAccountPage/>
      <AdminMainPage />
      <StaffTimetable/>
      <Routes>
        <Route path="/EditAccountPage" element={<EditAccountPage />} />
        <Route path="/CreateAccountPage" element={<CreateAccountPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>

      <LandingPage />

  */}
    </div>
  );
};

export default App;
