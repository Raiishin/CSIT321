import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/user';
import { getModules } from '../api/module';
import { isUndefined, isString } from 'lodash-es';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Select
} from '@mui/material';
import userTypeEnum from '../constants/userTypeEnum';
import useGlobalStore from '../store/globalStore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [selectedUserType, setSelectedUserType] = useState(undefined);
  const [selectedEnrollmentType, setSelectedEnrollmentType] = useState(undefined);
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  const token = useGlobalStore(state => state.token);

  useEffect(() => {
    const getModulesData = async () => {
      const { modulesData: data } = await getModules();
      setModules(data);
    };

    if (selectedUserType === userTypeEnum.STUDENT) {
      getModulesData();
    }
  }, [selectedUserType]);

  const [errors, setErrors] = useState({}); // to store validation errors

  const navigate = useNavigate();

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

    if (isUndefined(password) || password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    console.log('selectedUserType', selectedUserType);
    if (isUndefined(selectedUserType)) {
      validationErrors.selectedUserType = 'Please select a user type.';
    }

    if (!isUndefined(selectedUserType) && selectedUserType === userTypeEnum.STUDENT) {
      if (isUndefined(selectedEnrollmentType)) {
        validationErrors.selectedEnrollmentType = 'Please select an enrollment type.';
      }

      if (selectedModules.length === 0) {
        validationErrors.selectedModules = 'Please select at least 1 module.';
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, you can proceed with the form submission
      const response = await createUser(
        {
          name,
          address,
          email,
          password,
          type: +selectedUserType,
          ...(!isUndefined(selectedEnrollmentType) && { enrollmentStatus: selectedEnrollmentType }),
          ...(selectedModules.length > 0 && { modules: selectedModules })
        },
        token
      );

      if (!isUndefined(response.message)) {
        alert(response.message);
      }

      return navigate('/accounts');
      // Call your API or perform any other necessary action here
    } else {
      console.log('validationErrors', validationErrors);
      // If there are validation errors, update the state to display error messages
      setErrors(validationErrors);
    }
  };

  return (
    <div className="pt-14">
      <div className="max-w-[70%] mx-auto py-5 p-12 rounded shadow-md bg-smoke-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex">
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
              {errors.name && <div className="text-red">{errors.name}</div>}
            </div>
          </div>

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

          <div className="flex flex-row items-center">
            <p className="text-gray-700 font-bold mr-4">Account Type:</p>
            <RadioGroup row onChange={e => setSelectedUserType(+e.target.value)}>
              <FormControlLabel value={userTypeEnum.STUDENT} control={<Radio />} label="Student" />
              <FormControlLabel value={userTypeEnum.STAFF} control={<Radio />} label="Staff" />
              <FormControlLabel value={userTypeEnum.ADMIN} control={<Radio />} label="Admin" />
            </RadioGroup>
            {errors.selectedUserType && (
              <div className="text-red ml-2">{errors.selectedUserType}</div>
            )}
          </div>

          {selectedUserType === userTypeEnum.STUDENT && (
            <>
              <div className="flex flex-row items-center">
                <p className="text-gray-700 font-bold mr-4">Enrolment Type:</p>
                <RadioGroup row onChange={e => setSelectedEnrollmentType(e.target.value)}>
                  <FormControlLabel value="FT" control={<Radio />} label="Full-time" />
                  <FormControlLabel value="PT" control={<Radio />} label="Part-time" />
                </RadioGroup>
                {errors.selectedEnrollmentType && (
                  <div className="text-red ml-2">{errors.selectedEnrollmentType}</div>
                )}
              </div>

              <div className="flex flex-row items-center">
                <FormControl variant="standard" sx={{ width: 500 }}>
                  <InputLabel>Enrolled Modules</InputLabel>
                  <Select
                    multiple
                    value={selectedModules}
                    onChange={e => {
                      const {
                        target: { value }
                      } = e;

                      // On autofill we get a stringified value.
                      setSelectedModules(isString(value) ? value.split(',') : value);
                    }}
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 }
                      }
                    }}
                  >
                    {modules.map(module => (
                      <MenuItem key={module.id} value={module.id}>
                        {module.id}: {module.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.selectedModules && (
                  <div className="text-red ml-2">{errors.selectedModules}</div>
                )}
              </div>
            </>
          )}

          <div className="mb-4 pt-5">
            <button
              className="bg-[#75c058] w-full text-white font-bold py-2 px-4 rounded shadow-md"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
