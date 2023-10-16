import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import useGlobalStore from '../store/globalStore';

const CreateAccountPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedType, setSelectedType] = useState(''); // to store the selected radio button value
  const [errors, setErrors] = useState({}); // to store validation errors

  const navigate = useNavigate();
  const globalStore = useGlobalStore();

  const handleSubmit = async e => {
    e.preventDefault();

    // Perform form validation here
    const validationErrors = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required.';
    }

    if (address.trim() === '') {
      validationErrors.address = 'Address is required.';
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      validationErrors.email = 'Invalid email address.';
    }

    if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!selectedType) {
      validationErrors.selectedType = 'Please select a type.';
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
    <div className="pt-14">
      <div className="max-w-[40%] mx-auto py-5 p-12 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex">
            {/* Name */}
            <div className="flex-1">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${
                  errors.name ? 'border-red' : ''
                }`}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {errors.lastName && <div className="text-red">{errors.lastName}</div>}
            </div>
          </div>

          {/* Address */}
          <div className={`mb-2 ${errors.address ? 'border-red' : ''}`}>
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${
                errors.address ? 'border-red' : ''
              }`}
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            {errors.address && <div className="text-red">{errors.address}</div>}
          </div>

          {/* Email */}
          <div className={`mb-2 ${errors.email ? 'border-red' : ''}`}>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${
                errors.email ? 'border-red' : ''
              }`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className={`mb-2 ${errors.password ? 'border-red' : ''}`}>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${
                errors.password ? 'border-red' : ''
              }`}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-red">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className={`mb-2 ${errors.confirmPassword ? 'border-red' : ''}`}>
            <label htmlFor="cfmpassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="cfmpassword"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md ${
                errors.confirmPassword ? 'border-red' : ''
              }`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="text-red">{errors.confirmPassword}</div>}
          </div>

          {/* Radio Buttons */}
          <div className={`mb-2 flex pt-4 ${errors.selectedType ? 'border-red' : ''}`}>
            <p className="text-gray-700 font-bold">Account Type:</p>
            <label className="text-gray-700 font-bold ml-5">
              <input
                type="radio"
                name="options"
                value="Student"
                className="ml-2"
                checked={selectedType === 'Student'}
                onChange={() => setSelectedType('Student')}
              />
              Student
            </label>
            <label className="text-gray-700 font-bold ml-5">
              <input
                type="radio"
                name="options"
                value="Staff"
                className="ml-2"
                checked={selectedType === 'Staff'}
                onChange={() => setSelectedType('Staff')}
              />
              Staff
            </label>
            <label className="text-gray-700 font-bold ml-5">
              <input
                type="radio"
                name="options"
                value="Admin"
                className="ml-2"
                checked={selectedType === 'Admin'}
                onChange={() => setSelectedType('Admin')}
              />
              Admin
            </label>
            {errors.selectedType && <div className="text-red ml-2">{errors.selectedType}</div>}
          </div>

          {/* Enrolment Radio Buttons */}
          <div className={`mb-2 flex pt-4 ${errors.selectedType ? 'border-red' : ''}`}>
            <p className="text-gray-700 font-bold">Enrolment Type:</p>
            <label className="text-gray-700 font-bold ml-5">
              <input
                type="radio"
                name="options"
                value="FT"
                className="ml-2 mr-2"
                checked={selectedType === 'FT'}
                onChange={() => setSelectedType('FT')}
              />
              Full-time
            </label>
            <label className="text-gray-700 font-bold ml-5">
              <input
                type="radio"
                name="options"
                value="PT"
                className="ml-2 mr-2"
                checked={selectedType === 'PT'}
                onChange={() => setSelectedType('PT')}
              />
              Part-time
            </label>
            {errors.selectedType && <div className="text-red ml-2">{errors.selectedType}</div>}
          </div>

          <div className="mb-4 pt-5">
            <button
              className="bg-[#75c058] w-full text-white font-bold py-2 px-4 rounded shadow-md"
              type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
