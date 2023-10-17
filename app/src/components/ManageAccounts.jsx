import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize, isUndefined } from 'lodash-es';
import editIcon from '../assets/editing.png';
import useGlobalStore from '../store/globalStore';
import { getAllUserData } from '../api/user';
import userTypeEnum from '../constants/userTypeEnum';
import Loading from './Loading';

const ManageAccounts = () => {
  const navigate = useNavigate();
  const { userId, setPreviousPath, userType } = useGlobalStore();
  const previousPath = window.location.pathname;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const getUserTypeText = type => {
    const keys = Object.keys(userTypeEnum);

    for (let i = 0; i < keys.length; i++) {
      if (userTypeEnum[keys[i]] === type) {
        return capitalize(keys[i].toLowerCase());
      }
    }
  };

  useEffect(() => {
    // if the user is not logged in, redirect to the login page using Navigate
    if (isUndefined(userId) || userType !== userTypeEnum.ADMIN) {
      setPreviousPath(previousPath);
      console.log('redirecting from', previousPath, ' to /login');
      navigate('/login');
    }

    const getAllUsers = async () => {
      try {
        const { usersData: data } = await getAllUserData();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getAllUsers();
  }, [userId, setPreviousPath, navigate, previousPath]);

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