import logo from './logo.svg';
import Navbar from './components/Navbar';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import React, { useState } from 'react';
import {
  generateRegistration,
  generateAuthentication,
  verifyRegistration,
  verifyAuthentication
} from './api/user';

const userId = 'dOan3fY4B2BZRbTxdMgZ';

const App = () => {
  const [registrationStatus, setRegistrationStatus] = useState('blank');
  const [authenticationStatus, setAuthenticationStatus] = useState('blank');

  const attemptRegistration = async () => {
    const generatedRegistration = await generateRegistration(userId);

    try {
      // Pass the options to the authenticator and wait for a response
      const registrationResponse = await startRegistration(generatedRegistration);

      console.log('registrationResponse', registrationResponse);
      console.log('generatedRegistration', generatedRegistration);

      setRegistrationStatus('registration in progress');

      const verifyRegistrationBody = JSON.stringify({
        ...registrationResponse,
        userId,
        expectedChallenge: generatedRegistration.challenge
      });

      const verifyRegistrationResponse = await verifyRegistration(verifyRegistrationBody);

      console.log('verifyRegistrationResponse', verifyRegistrationResponse);

      setRegistrationStatus('registration completed');
    } catch (error) {
      // Some basic error handling
      setRegistrationStatus(
        error.name === 'InvalidStateError'
          ? 'Error: Authenticator was probably already registered by user'
          : error.message
      );
    }
  };

  const attemptAuthentication = async () => {
    const generatedAuthentication = await generateAuthentication(userId);

    try {
      // Pass the options to the authenticator and wait for a response
      const authenticationResponse = await startAuthentication(generatedAuthentication);

      console.log('authenticationResponse', authenticationResponse);
      console.log('generatedAuthentication', generatedAuthentication);

      setAuthenticationStatus('authentication in progress');

      const verifyAuthenticationBody = JSON.stringify({
        ...authenticationResponse,
        userId,
        expectedChallenge: generatedAuthentication.challenge
      });

      const verifyAuthenticationResponse = await verifyAuthentication(verifyAuthenticationBody);

      console.log('verifyAuthenticationResponse', verifyAuthenticationResponse);

      setAuthenticationStatus(
        verifyAuthenticationResponse.verified
          ? 'authentication completed'
          : verifyAuthenticationResponse.error.message
      );
    } catch (error) {
      // Some basic error handling
      setAuthenticationStatus(error.message);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="h-16" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <button onClick={attemptRegistration}>Hello click me</button>
      <div>Registration Status: {registrationStatus}</div>

      <button onClick={attemptAuthentication}>Hello click me</button>
      <div>Authentication Status: {authenticationStatus}</div>
    </div>
  );
};

export default App;
