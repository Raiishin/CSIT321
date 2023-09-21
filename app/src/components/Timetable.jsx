import React, { useEffect, useState } from 'react';
import { getClasses } from '../api/class';
import useGlobalStore from '../store/globalStore';
import { ColorRing } from 'react-loader-spinner';

const Timetable = () => {
  const [classes, setClasses] = useState([]);

  const userId = useGlobalStore(state => state.userId);
  const tableHeaders = ['Module Code', 'Venue', 'Date & Time', 'Type', 'Lecturer'];

  const formattedTableRow = child => {
    return <td class="p-3 text-sm font-semibold tracking-wide text-left">{child}</td>;
  };

  useEffect(() => {
    const initializePageData = async () => {
      const { data } = await getClasses(userId);
      setClasses(data);
    };

    initializePageData();
  }, []);

  return (
    <div>
      <div class="flex text-center justify-center pt-8 bg-light-brown">
        <p className="text-cyan text-4xl font-bold underline">Timetable</p>
      </div>

      {classes.length > 0 ? (
        <div className="w-full col-span-3 flex pb-20 items-center justify-center min-w-[70%]">
          <table className="m-10 border-collapse bg-gray-50 border-b-2 border-slate-500 w-3/4 font-sans">
            <thead class="bg-light-gray">
              <tr>{tableHeaders.map(tableHeader => formattedTableRow(tableHeader))}</tr>
            </thead>

            <tbody>
              {classes.map((classData, index) => (
                <>
                  {classData.map(classItem => (
                    <tr class="bg-white border-2">
                      {formattedTableRow(`${classItem.moduleId} - ${classItem.moduleName}`)}
                      {classItem.venue ? formattedTableRow(classItem?.venue) : <td />}
                      {formattedTableRow(
                        `${classItem?.date} ${classItem?.startTime} - ${classItem?.endTime}`
                      )}
                      {classItem.type ? formattedTableRow(classItem?.type) : <td />}
                      {formattedTableRow(`${classItem?.lecturerName}`)}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex place-content-center m-16">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </div>
  );
};

export default Timetable;
