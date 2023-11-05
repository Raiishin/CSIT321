import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize, isUndefined } from 'lodash-es';
import editIcon from '../assets/editing.png';
import deleteIcon from '../assets/delete.png';
import useGlobalStore from '../store/globalStore';
import { getAllUserData, updateUser, resetBiometrics, deleteUser } from '../api/user';
import userTypeEnum from '../constants/userTypeEnum';
import LoadingRing from './LoadingRing';

const ManageAccounts = () => {
  const navigate = useNavigate();
  const previousPath = window.location.pathname;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const { userId, setPreviousPath, userType, token } = useGlobalStore();

  const getUserTypeText = type => {
    const keys = Object.keys(userTypeEnum);

    for (let i = 0; i < keys.length; i++) {
      if (userTypeEnum[keys[i]] === type) {
        return capitalize(keys[i].toLowerCase());
      }
    }
  };

  const handleUnlock = async (id, name, email, address) => {
    try {
      setLoading(true);

      const resp = await updateUser(token, id, name, email, address, false);

      alert(resp.message);

      await getAllUsers();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDelete = async id => {
    try {
      setLoading(true);

      const resp = await deleteUser(token, id);

      if (resp.success) {
        await getAllUsers();
      } else {
        throw new Error(resp);
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const resetUserBiometrics = async id => {
    try {
      setLoading(true);

      const resp = await resetBiometrics(token, id);

      if (resp.success) {
        await getAllUsers();
      } else {
        throw new Error(resp);
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const { usersData: data } = await getAllUserData(token);
      setUserData(data);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // If the user is not logged in, redirect to the login page using Navigate
    if (isUndefined(userId) || userType !== userTypeEnum.ADMIN) {
      setPreviousPath(previousPath);
      console.log('redirecting from', previousPath, ' to /login');
      navigate('/login');
    }

    getAllUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingRing />
        </div>
      ) : (
        <div className="grid grid-cols-2 bg-light-brown">
          <div className="col-span-3 flex justify-center">
            <p className="text-[#ccd6f6] text-4xl font-bold">Manage Accounts</p>
          </div>

          <div className="col-span-3 max-h-[600px] overscroll-auto overflow-y-auto m-12">
            <table className="border-collapse bg-gray-50 border-b-2 border-slate-500 w-full font-sans">
              <thead className="bg-[#dcdcdc]">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">User Type</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Address</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Unlock User</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Reset User Biometrics
                  </th>
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
                    <td className="p-3 text-sm font-semibold tracking-wide text-left flex flex-row gap-4">
                      <Link to="/account/edit" state={{ data }}>
                        <img src={editIcon} alt="editIcon" className="w-6" />
                      </Link>
                      <div onClick={async () => await handleDelete(data.id)}>
                        <img src={deleteIcon} alt="deleteIcon" className="w-6" />
                      </div>
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.is_locked ? (
                        <button
                          onClick={async () =>
                            await handleUnlock(data.id, data.name, data.email, data.address)
                          }
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-28">
                          Unlock
                        </button>
                      ) : (
                        <button class="bg-transparent hover:bg-blue-500 text-slate-400 font-semibold  py-2 px-4 border border-blue-500 rounded cursor-not-allowed w-28">
                          Not Locked
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      <button
                        onClick={async () => await resetUserBiometrics(data.id)}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-28">
                        Reset
                      </button>
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
