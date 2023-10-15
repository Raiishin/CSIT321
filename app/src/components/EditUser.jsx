import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const EditUser = () => {
  // Access the passed data as props
  const location = useLocation();
  const { data } = location.state;

  // Use data in your component
  const { id, name, password, email, is_active, modules, enrollment_status, type } = data;

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
  };

  const handleCancel = () => {
    // handle cancel logic
    // route user back to /account
  };

  console.log('data from EditUser.jsx: ', data);
  return (
    <div>
      <div className="pt-20">
        <div className="max-w-sm mx-auto py-10 p-6 rounded shadow-md bg-smoke-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Edit User {name}</h2>
          <p>
            <span style={{ marginRight: '1em' }}>Name:</span>
            <input type="text" value={newName} onChange={handleNameChange} />
          </p>
          <p>
            <span style={{ marginRight: '1em' }}>Email: </span>
            <input type="email" value={newEmail} onChange={handleEmailChange} />
          </p>
          {/* <p>Type: {type}</p> */}
          {/* <p>Password: {password}</p> */}
          {/* <p>Modules: {modules.join(', ')}</p>
          <p>Enrollment Status: {enrollment_status}</p> */}
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
  );
};

export default EditUser;
