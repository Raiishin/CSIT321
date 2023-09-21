import React from 'react';

const AttendancePage = () => {
  return (
    <div className="fixed grid grid-cols-3 pt-9 w-full">
      <div class="col-span-3 flex justify-center pt-8 bg-zinc-900">
        <p className="text-[#ccd6f6] text-4xl font-bold">Attendance Rates</p>
      </div>

      <div className="w-full col-span-3 flex pb-20 pt-4 items-center justify-center min-w-[70%]">
        <table className="m-10 border-collapse  bg-gray-50 border-b-2 border-slate-500 w-full font-sans">
          <thead class="bg-[#dcdcdc]">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Course Module</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Number of Students</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Number of Attendees</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Percentage of Attendees
              </th>
            </tr>
          </thead>

          <tbody>
            <tr class="bg-white">
              <td class="p-3 text-sm font-semibold tracking-wide text-left">1</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">CSIT321 - Project</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">324</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">298</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">91.98%</td>
            </tr>
            <tr class="bg-[#f5f5f5]">
              <td class="p-3 text-sm font-semibold tracking-wide text-left">2</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                CSCI317 - Database Performance Tuning
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">254</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">182</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">71.65%</td>
            </tr>
            <tr class="bg-white">
              <td class="p-3 text-sm font-semibold tracking-wide text-left">3</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                CSCI316 Big Data Mining Techniques and Implementation
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">365</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">283</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">77.53%</td>
            </tr>
            <tr class="bg-[#f5f5f5]">
              <td class="p-3 text-sm font-semibold tracking-wide text-left">4</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                INFO411 - Data Mining and Knowledge Discovery
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">324</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">321</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">99.07%</td>
            </tr>
            <tr class="bg-white">
              <td class="p-3 text-sm font-semibold tracking-wide text-left">5</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">
                CSIT314 - Software Development Methodologies
              </td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">267</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">196</td>
              <td class="p-3 text-sm font-semibold tracking-wide text-left">73.41%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
