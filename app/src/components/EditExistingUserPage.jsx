import React from 'react';

import editIcon from '../assets/editing.png';

const EditExistingUserPage = () => {
  return (
    <div className="grid grid-cols-3 w-full">
      <div class="col-span-3 flex justify-center ">
        <p className="text-[#ccd6f6] text-4xl font-bold">Edit Existing Account</p>
      </div>

      <div className="w-[50%] col-span-3 max-h-[60%] mt-32 ml-96">
        <table className="border-collapse bg-[#b5b5b6] border-b-2 border-slate-500 w-[100%] font-sans">
          <tbody>
            <tr class="bg-white">
              <td class="bg-[#cbcbcb] p-3 text-sm font-semibold tracking-wide text-left">Name:</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">John Doe</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                <button>
                  <img src={editIcon} alt="editIcon" class="w-6" />
                </button>
              </td>
            </tr>
            <tr class="bg-white">
              <td class="bg-[#cbcbcb] p-3 text-sm font-semibold tracking-wide text-left">
                Address:
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                Block 123 Maven Road 4 Singapore 654321
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                <button>
                  <img src={editIcon} alt="editIcon" class="w-6" />
                </button>
              </td>
            </tr>
            <tr class="bg-white">
              <td class="bg-[#cbcbcb] p-3 text-sm font-semibold tracking-wide text-left">Email:</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                john_doe123@mymail.sim.edu.sg
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                <button>
                  <img src={editIcon} alt="editIcon" class="w-6" />
                </button>
              </td>
            </tr>
            <tr class="bg-white">
              <td class="bg-[#cbcbcb] p-3 text-sm font-semibold tracking-wide text-left">Type:</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">Student</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                <button>
                  <img src={editIcon} alt="editIcon" class="w-6" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditExistingUserPage;
