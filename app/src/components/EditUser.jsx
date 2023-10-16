import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { editUser } from '../api/user';

const EditUser = () => {
  // Access the passed data as props
  const location = useLocation();
  const { data } = location.state;

  // Use data in your component
  const { id, name, password, email, is_active, modules, enrollment_status, type } = data;

  // uncomment this when our db is updated to include address field
  // const { address } = data;
  // const [newAddress, setNewAddress] = useState(address);
  const handleAddressChange = e => {
    // setNewAddress(e.target.value);
  };

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleEmailChange = e => {
    setNewEmail(e.target.value);
  };

  const handleUpdate = () => {
    // handle update logic
    editUser(id, newName, newEmail /*, newAddress*/);

    // uncomment this when our db is updated to include address field
    //editUser(id, newName, newAddress);
  };

  const handleCancel = () => {
    // handle cancel logic
    // route user back to /account
  };

  // console.log('data from EditUser.jsx: ', data);
  return (
    <div>
      <div className="pt-20">
        <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-smoke-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Edit {name}</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md"
              value={name}
            />
          </div>

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
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue shadow-md"
              value={/*address*/ ''}
            />
            <button
              type="submit"
              className="mt-10 w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded"
              onClick={handleUpdate}>
              Update
            </button>
            <button
              type="submit"
              className="mt-5 w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded"
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
