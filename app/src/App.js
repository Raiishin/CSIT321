import logo from './logo.svg';
import Navbar from './components/Navbar';
import { startRegistration } from '@simplewebauthn/browser';
import React, { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('blank');

  const attemptRegistration = async () => {
    const resp = await fetch('http://localhost:5001/generate/registration');
    const jsonResp = await resp.json();

    let attResp;
    try {
      // Pass the options to the authenticator and wait for a response
      attResp = await startRegistration(jsonResp);
    } catch (error) {
      // Some basic error handling
      // if (error.name === 'InvalidStateError') {
      //   elemError.innerText = 'Error: Authenticator was probably already registered by user';
      // } else {
      //   elemError.innerText = error;
      // }
      // throw error;
    }

    console.log('attResp', attResp);
    console.log('jsonResp', jsonResp);

    setStatus('registration in progress');

    const verificationResp = await fetch('http://localhost:5001/verify/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...attResp, expectedChallenge: jsonResp.challenge })
    });

    // Wait for the results of verification
    const verificationJSON = await verificationResp.json();
    console.log('verificationJSON', verificationJSON);

    setStatus('registration completed');

    // Show UI appropriate for the `verified` status
    // if (verificationJSON && verificationJSON.verified) {
    //   elemSuccess.innerHTML = 'Success!';
    // } else {
    //   elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
    //     verificationJSON,
    //   )}</pre>`;
    // }
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

      <div>Status: {status}</div>
    </div>
  );
};

export default App;
