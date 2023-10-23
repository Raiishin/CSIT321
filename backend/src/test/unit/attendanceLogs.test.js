import { getAttendanceByClassId } from '../../library/attendanceLogs.js';

describe('Testing Attendance Log library functions', () => {
  test('getAttendanceByClassId() - Valid', async () => {
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
  });

  test('getAttendanceByClassId() - Invalid', async () => {
    expect(await getAttendanceByClassId('Invalid_Class_Id')).toMatchInlineSnapshot(`[]`);
  });
});
