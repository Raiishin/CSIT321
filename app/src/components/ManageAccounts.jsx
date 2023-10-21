import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize, isUndefined } from 'lodash-es';
import editIcon from '../assets/editing.png';
import useGlobalStore from '../store/globalStore';
import { getAllUserData, unlockUser } from '../api/user';
import userTypeEnum from '../constants/userTypeEnum';
import Loading from './Loading';

const ManageAccounts = () => {
  const navigate = useNavigate();
  const { userId, setPreviousPath, userType } = useGlobalStore();
  const previousPath = window.location.pathname;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [updating, setUpdating] = useState(false);

  const getUserTypeText = type => {
    const keys = Object.keys(userTypeEnum);

    for (let i = 0; i < keys.length; i++) {
      if (userTypeEnum[keys[i]] === type) {
        return capitalize(keys[i].toLowerCase());
      }
    }
  };

  const handleUnlock = async () => {
    // code to send an unlock request to the server
    // const unlockResponse = await unlockUser(userId);
    console.log('Sent unlock request');
    /* if the unlock request was successful, 
    re-retrieve all the users' data from the server
    to conveniently show other accounts that may have
    new lock statuses
    */
    getAllUsers();
    console.log('Running getAllUsers() in handleUnlock()...');
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { usersData: data } = await getAllUserData();
      setUserData(data);
      console.log('data', data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setUpdating(false);
  };

  useEffect(() => {
    // if the user is not logged in, redirect to the login page using Navigate
    if (isUndefined(userId) || userType !== userTypeEnum.ADMIN) {
      setPreviousPath(previousPath);
      console.log('redirecting from', previousPath, ' to /login');
      navigate('/login');
    }

    getAllUsers();
  }, [userId, setPreviousPath, navigate, previousPath, updating]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 pt-6">
          <div className="col-span-3 flex justify-center">
            <p className="text-[#ccd6f6] text-4xl font-bold">Edit Accounts</p>
          </div>

          <div className="col-span-3 max-h-[80%] overscroll-auto overflow-y-auto m-12">
            <table className="border-collapse bg-gray-50 border-b-2 border-slate-500 w-full font-sans">
              <thead className="bg-[#dcdcdc]">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">User Type</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Address</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Edit</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Unlock</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => (
                  <tr className="bg-white" key={index}>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {getUserTypeText(+data.type)}
                    </td>

                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.name}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.email}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.address}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      <Link to="/account/edit" state={{ data }}>
                        <img src={editIcon} alt="editIcon" className="w-6" />
                      </Link>
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.is_locked ? (
                        <button
                          onClick={() => handleUnlock(data.userId)}
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-28">
                          Unlock
                        </button>
                      ) : (
                        <button class="bg-transparent hover:bg-blue-500 text-slate-400 font-semibold  py-2 px-4 border border-blue-500 rounded cursor-not-allowed w-28">
                          Not Locked
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccounts;
