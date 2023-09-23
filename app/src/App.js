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
import CreateAccountPage from './components/CreateAccountPage';
import EditAccountPage from './components/EditAccountPage';

import useGlobalStore from './store/globalStore';
import { isUndefined } from 'lodash';

const App = () => {
  const userId = useGlobalStore(state => state.userId);

  return (
    <div>
      <Navbar />

      <div className="bg-light-brown h-[100vh] w-[100vw]">
        <Routes>
          <Route path="/" element={isUndefined(userId) ? <Home /> : <Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />

          <Route path="/timetable" element={<Timetable />} />
          <Route path="/attendance" element={<Attendance />} />

          <Route path="/account/create" element={<CreateAccountPage />} />
          <Route path="/account/edit" element={<EditAccountPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
