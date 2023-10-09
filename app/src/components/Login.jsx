import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import useGlobalStore from '../store/globalStore';
import { ColorRing } from 'react-loader-spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    setLoading(true);

    const { userId, userType, userName } = await login(email, password);

    useGlobalStore.setState({ userId, userType, userName });

    return navigate('/');
  };

  return (
    <div className="pt-20">
      <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        {loading ? (
          <div className="flex place-content-center m-16">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
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
