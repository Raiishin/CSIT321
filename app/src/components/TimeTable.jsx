import React, { useEffect, useState } from 'react';
import { getClasses } from '../api/class';
import useGlobalStore from '../store/globalStore';

const Timetable = () => {
  const [classes, setClasses] = useState([]);

  const userId = useGlobalStore(state => state.userId);

  useEffect(() => {
    const initializePageData = async () => {
      const { data } = await getClasses(userId);

      console.log('data', data);
      setClasses(data);
    };

    initializePageData();
  }, []);

  const tableRowFormat = child => {
    return <td class="p-3 text-sm font-semibold tracking-wide text-left">{child}</td>;
  };

  return (
    <div>
      <div class="flex text-center justify-center pt-8 bg-light-brown">
        <p className="text-cyan text-4xl font-bold underline">Timetable</p>
      </div>

      {classes.length !== 0 && <div />}

      <div className="w-full col-span-3 flex pb-20 pt-4 items-center justify-center min-w-[70%]">
        <table className="m-10 border-collapse bg-gray-50 border-b-2 border-slate-500 w-full font-sans">
          <thead class="bg-[#dcdcdc]">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Module Code</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Venue</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Date & Time</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Type</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Lecturer</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((classData, index) => (
              <>
                {classData.map((classItem, index) => (
                  <tr class={index % 2 ? 'bg-white' : 'bg-[#f5f5f5]'}>
                    {tableRowFormat(`${classItem.moduleId} - ${classItem.moduleName}`)}
                    {classItem.venue ? tableRowFormat(classItem?.venue) : <td />}
                    {tableRowFormat(
                      `${classItem?.date} ${classItem?.startTime} - ${classItem?.endTime}`
                    )}
                    {classItem.venue ? tableRowFormat(classItem?.venue) : <td />}

                    {tableRowFormat(`${classItem?.lecturerName}`)}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
