import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Timetable from './components/Timetable';
import CreateAccount from './components/CreateAccount';
import ManageAccounts from './components/ManageAccounts';
import EditUser from './components/EditUser';

import useGlobalStore from './store/globalStore';
import { isUndefined } from 'lodash';

import IdleTimerProvider from './components/IdleTimerProvider';
import ResetPassword from './components/ResetPassword';

const App = () => {
  const userId = useGlobalStore(state => state.userId);

  return (
    <IdleTimerProvider>
      <div>
        <Navbar />

        <div className="bg-light-brown h-[100vh]">
          <Routes>
            <Route path="/" element={isUndefined(userId) ? <Home /> : <Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance" element={<Attendance />} />

            <Route path="/accounts" element={<ManageAccounts />} />
            <Route path="/account/create" element={<CreateAccount />} />
            <Route path="/account/edit" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </IdleTimerProvider>
  );
};

export default App;
