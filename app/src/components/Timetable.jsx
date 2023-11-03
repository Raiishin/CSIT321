import React, { useEffect, useState } from 'react';
import { getClasses } from '../api/class';
import useGlobalStore from '../store/globalStore';
import { ColorRing } from 'react-loader-spinner';
import { isUndefined } from 'lodash';
import userTypeEnum from '../constants/userTypeEnum';
import attendanceStatusEnum from '../constants/attendanceStatusEnum.js';

const Timetable = () => {
  const [classes, setClasses] = useState([]);
  const [modules, setModules] = useState([]);

  const { userType, token } = useGlobalStore();

  const tableHeaders = [
    'Module Code',
    'Venue',
    'Date & Time',
    'Type',
    'Lecturer',
    ...(userType === userTypeEnum.STAFF
      ? ['# of Students', '# of Attendees', 'Attendance Rate']
      : []),
    ...(userType === userTypeEnum.STUDENT ? ['Attendance Status'] : [])
  ];

  const formattedTableRow = child => {
    return <td class="p-3 text-sm font-semibold tracking-wide text-left">{child}</td>;
  };

  const checkAttendanceStatus = attendanceStatus => {
    if (attendanceStatus === attendanceStatusEnum.PRESENT) {
      return 'Present';
    }
    if (attendanceStatus === attendanceStatusEnum.LATE) {
      return 'Late';
    }

    return 'Unmarked';
  };

  useEffect(() => {
    const initializePageData = async () => {
      const { data } = await getClasses(token);
      setClasses(data);
      setModules(Object.keys(data));
    };

    initializePageData();
  }, []);

  return (
    <div>
      <div class="flex text-center justify-center pt-8 bg-light-brown">
        <p className="text-cyan text-4xl font-bold underline mb-6">Timetable</p>
      </div>

      {!isUndefined(classes) && modules.length > 0 ? (
        <div className="w-full col-span-3 flex pb-20 items-center justify-center min-w-[70%] flex flex-col bg-light-brown">
          {modules.map(module => (
            <div className="w-full p-4">
              <h1 className="text-white text-2xl">Module Code: {module}</h1>

              <table className="m-10 border-collapse bg-gray-50 border-b-2 border-slate-500 w-3/4 font-sans rounded">
                <thead class="bg-light-gray">
                  <tr>{tableHeaders.map(tableHeader => formattedTableRow(tableHeader))}</tr>
                </thead>
                <tbody>
                  {classes[module].map((classItem, index) => (
                    <>
                      <tr class="bg-white border-2">
                        {formattedTableRow(`${classItem.moduleId} - ${classItem.moduleName}`)}
                        {classItem.venue ? formattedTableRow(classItem?.venue) : <td />}
                        {formattedTableRow(
                          `${classItem?.date} ${classItem?.startTime} - ${classItem?.endTime}`
                        )}
                        {classItem.type ? formattedTableRow(classItem?.type) : <td />}
                        {formattedTableRow(`${classItem?.lecturerName}`)}
                        {userType === userTypeEnum.STAFF &&
                          formattedTableRow(`${classItem?.totalStudents}`)}
                        {userType === userTypeEnum.STAFF &&
                          formattedTableRow(`${classItem?.attendees}`)}
                        {userType === userTypeEnum.STAFF &&
                          formattedTableRow(
                            `${(classItem?.attendees / classItem?.totalStudents) * 100}%`
                          )}
                        {userType === userTypeEnum.STUDENT &&
                          formattedTableRow(checkAttendanceStatus(classItem?.attendanceStatus))}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
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
