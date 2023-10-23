import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import useGlobalStore from '../store/globalStore';
import Loading from './Loading';
import { registerUser, authenticateUser } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { previousPath } = useGlobalStore();

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      setLoading(true);

      if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        setLoading(false);
      } else {
        const loginResponse = await login(email, password);

        if (!loginResponse.success) {
          alert(loginResponse.message);
          setLoading(false);
        } else {
          const { id: userId, type: userType, name: userName, devices } = loginResponse;

          let token;
          // Registration
          if (devices.length === 0) {
            // Pass the options to the authenticator and wait for a response
            const registerAuthenticaionResponse = await registerUser(userId);

            token = registerAuthenticaionResponse.token;
          } else {
            const verifyAuthenticationResponse = await authenticateUser({ userId });

            if (!verifyAuthenticationResponse.verified) {
              throw new Error('Authentication failed');
            }

            token = verifyAuthenticationResponse.token;
          }

          useGlobalStore.setState({ userId, userType: +userType, userName, token });

          if (previousPath) {
            console.log('previousPath ', previousPath);
            return navigate(previousPath);
          }

          return navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        {loading ? (
          <div className="flex place-content-center m-16">
            <Loading />
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 pt-5">
              <button
                type="submit"
                className="w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded"
              >
                Login
              </button>
            </div>

            <div className="text-start">
              <a href="/reset-password" className="text-gray-500 hover:underline">
                Forgot Password? Click here
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
