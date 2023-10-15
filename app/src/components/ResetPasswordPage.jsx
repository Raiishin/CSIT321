import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    const validationErrors = {};

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      validationErrors.email = 'Invalid email address.';
    }

    if (newPassword.length < 8) {
      validationErrors.newPassword = 'New password must be at least 8 characters.';
    }

    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
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
    <div className="pt-12">
      <div className="max-w-[35%] mx-auto py-10 p-12 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Reset your password</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={`mb-4 ${errors.email ? 'border-red' : ''}`}>
            <label htmlFor="email" type="email" id="email" className="block text-gray-700 font-bold mb-2">
              Your Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${errors.email ? 'border-red' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red">{errors.email}</div>}
          </div>

          {/* New Password */}
          <div className={`mb-4 ${errors.newPassword ? 'border-red' : ''}`}>
            <label htmlFor="newpassword" type="password" id="newpassword" className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${errors.newPassword ? 'border-red' : ''}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && <div className="text-red">{errors.newPassword}</div>}
          </div>

          {/* Confirm Password */}
          <div className={`mb-4 ${errors.confirmPassword ? 'border-red' : ''}`}>
            <label htmlFor="cfmpassword" type="password" id="cfmpassword" className="block text-gray-700 font-bold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${errors.confirmPassword ? 'border-red' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="text-red">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <div className="mb-4 pt-5">
            <button type="submit" className="w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;