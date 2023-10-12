import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../store/globalStore';
import editIcon from '../assets/editing.png';
import { getAllUserData } from '../api/user';

const EditAccountPage = () => {
  const navigate = useNavigate();
  const { userId, setPreviousPath } = useGlobalStore();
  const previousPath = window.location.pathname;
  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState([]);
  const [userData, setUserData] = useState([]);

  // Function to fetch user data
  const getAllUsers = async () => {
    try {
      const data = await getAllUserData();

      // Extract email into an array state
      const emailData = data.usersData.map(user => user.email);

      // Extract user data into an array state
      const usersData = data.usersData.map(user => ({
        email: user.email,
        enrollment_status: user.enrollment_status,
        is_active: user.is_active,
        modules: user.modules,
        name: user.name,
        password: user.password,
        type: user.type
      }));

      setUserData(usersData);
      setEmailData(emailData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // let data;
  useEffect(() => {
    // if the user is not logged in, redirect to the login page using Navigate
    if (userId === undefined && previousPath !== '/login') {
      setPreviousPath(previousPath);
      console.log('redirecting from', previousPath, ' to /login');
      navigate('/login');
    }

    console.log('running getAllUsers...');
    getAllUsers();
  }, [userId, setPreviousPath, navigate, previousPath]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 pt-9 w-full">
          <div className="col-span-3 flex justify-center pt-8 bg-zinc-900">
            <p className="text-[#ccd6f6] text-4xl font-bold">Edit Accounts</p>
          </div>

          <div className="w-[90%] col-span-3 max-h-[60%] overscroll-auto overflow-y-auto mt-24 ml-20">
            <table className="border-collapse bg-gray-50 border-b-2 border-slate-500 w-[100%] font-sans">
              <thead className="bg-[#dcdcdc]">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => (
                  <tr className="bg-white" key={index}>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {index + 1}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {data.name}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      {emailData[index]}
                    </td>
                    <td className="p-3 text-sm font-semibold tracking-wide text-left">
                      <button>
                        <img src={editIcon} alt="editIcon" className="w-6" />
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

export default EditAccountPage;
