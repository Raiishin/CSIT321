import { getAttendanceByClassId } from '../../library/attendanceLogs.js';

test('Retrieve Attendance Logs by Class Id', async () => {

//Valid Class ID
  expect(await getAttendanceByClassId('1SIjOdz3nOSFSZvexRiy')).toMatchInlineSnapshot(`
[
  {
    "classId": "1SIjOdz3nOSFSZvexRiy",
    "createdAt": {
      "nanoseconds": 451000000,
      "seconds": 1696776264,
    },
    "id": "FNOTprfxtUYJLRwJV8Wl",
    "status": 1,
    "userId": "8mdphTDNBkGGhvCd7Jkr",
  },
]
`);

//Invalid Class ID
expect(await getAttendanceByClassId('Invalid_Class_Id')).toMatchInlineSnapshot(`[]`);


});