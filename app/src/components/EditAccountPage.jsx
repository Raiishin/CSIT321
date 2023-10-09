import React from 'react';
import editIcon from '../assets/editing.png';
import useGlobalStore from '../store/globalStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditAccountPage = () => {
  const testData = [
    'John Doe',
    'Mickey Mouse',
    'John Wick',
    'Donald Trump',
    'Donald Duck',
    'Nicky Minaj',
    'Fred Perry',
    'Benjamin Barker',
    'Tim Cook',
    'Steve Jobs'
  ];

  const navigate = useNavigate();
  const { userId, setPreviousPath } = useGlobalStore();
  const previousPath = window.location.pathname;

  useEffect(() => {
    // if user is not logged in, redirect to login page using Navigate
    if (userId === undefined) {
      setPreviousPath(previousPath);
      console.log('previousPath: ', window.location.pathname);
      navigate('/login');
    }
  }, []);

  return (
    <div className="grid grid-cols-3 pt-9 w-full">
      <div class="col-span-3 flex justify-center pt-8 bg-zinc-900">
        <p className="text-[#ccd6f6] text-4xl font-bold">Edit Accounts</p>
      </div>

      <div className="w-[90%] col-span-3 max-h-[60%] overscroll-auto overflow-y-auto mt-24 ml-20">
        <table className="border-collapse bg-gray-50 border-b-2 border-slate-500 w-[100%] font-sans">
          <thead class="bg-[#dcdcdc]">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((data, index) => (
              <tr class="bg-white">
                <td class="p-3 text-sm font-semibold tracking-wide text-left">{index + 1}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-left">{data}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-left">
                  <button>
                    <img src={editIcon} alt="editIcon" class="w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditAccountPage;
