import { getAttendanceByClassId } from '../../library/attendanceLogs.js';

describe('Testing Attendance Log library functions', () => {
  test('getAttendanceByClassId() - Valid', async () => {
    expect(await getAttendanceByClassId('8dQKNsnvq6jn8Hzm7Tnw')).toMatchInlineSnapshot(`
[
  {
    "classId": "8dQKNsnvq6jn8Hzm7Tnw",
    "createdAt": {
      "nanoseconds": 625000000,
      "seconds": 1697245689,
    },
    "id": "dcGOlpuUCnmW42W7lwYU",
    "status": 0,
    "userId": "8mdphTDNBkGGhvCd7Jkr",
  },
]
`);
  });

  test('getAttendanceByClassId() - Invalid', async () => {
    expect(await getAttendanceByClassId('Invalid_Class_Id')).toMatchInlineSnapshot(`[]`);
  });
});
