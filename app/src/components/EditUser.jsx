import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../api/user';

const EditUser = () => {
  const location = useLocation();
  const { data } = location.state;
  const { id, name, email, address } = data;

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newAddress, setNewAddress] = useState(address);

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const res = await updateUser(id, newName, newEmail, newAddress);
    if (!res.success) {
      alert(res.message);
    } else {
      navigate('/accounts');
    }
  };

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
              value={newName}
              onChange={e => setNewName(e.target.value)}
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
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
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
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
            />
            <button
              type="submit"
              className="mt-10 w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="submit"
              className="mt-5 w-full hover:bg-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue rounded"
              onClick={() => navigate('/accounts')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
