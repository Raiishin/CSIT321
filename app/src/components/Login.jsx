import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    // Perform form validation here
    const validationErrors = {};

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      validationErrors.email = 'Invalid email address.';
    }

    if (password.length < 8) {
      validationErrors.password = 'Invalid password.';
    }

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, you can proceed with the form submission
      // Call your API or perform any other necessary action here
    } else {
      // If there are validation errors, update the state to display error messages
      setErrors(validationErrors);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleLogin}>
          <div className={`mb-4 ${errors.email ? 'border-red' : ''}`}>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${errors.email ? 'border-red' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red">{errors.email}</div>}
          </div>

          <div className={`mb-4 ${errors.password ? 'border-red' : ''}`}>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${errors.password ? 'border-red' : ''}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-red">{errors.password}</div>}
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
      </div>
    </div>
  );
};

export default Login;