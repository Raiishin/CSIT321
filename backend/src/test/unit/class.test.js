import enrollmentStatusEnum from '../../constants/enrollmentStatusEnum.js';
import {
  getClassById,
  getClassesIdByModuleId,
  sortClasses,
  latestClass
} from '../../library/class.js';

describe('Testing Class library functions', () => {
  test('getClassById() - Valid', async () => {
    expect(await getClassById('1SIjOdz3nOSFSZvexRiy')).toMatchInlineSnapshot(`
  {
    "date": "2023-11-02",
    "end_time": "23:59",
    "lecturer_id": "uWZcHDVJxxdz8pqal2TL",
    "module_id": "CSCI376",
    "period": 1,
    "start_time": "09:00",
    "type": "Lecture",
    "venue": "A.2.17a",
  }
  `);
  });

  test('getClassById() - Invalid', async () => {
    try {
      await getClassById('Invalid_Class_ID');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: Class ID is not found]`);
    }
  });

  test('getClassesIdByModuleId() - Valid', async () => {
    expect(await getClassesIdByModuleId('CSCI376')).toMatchInlineSnapshot(`
[
  "1SIjOdz3nOSFSZvexRiy",
  "8dQKNsnvq6jn8Hzm7Tnw",
  "J3HBZHW12OxfVXc3aEtM",
]
`);
  });

  test('getClassesIdByModuleId() - Invalid', async () => {
    expect(await getClassesIdByModuleId('Invalid_Module')).toMatchInlineSnapshot(`[]`);
  });

  test('sortClasses() - Valid', async () => {
    const testClassesData = [
      {
        id: 'tP7LbWIJfL5fLlkbsTmF',
        date: '2023-01-20',
        startTime: '08:30',
        endTime: '11:30',
        lecturerName: 'Sionggo Japit',
        period: 0,
        type: 'Tutorial',
        venue: 'A.2.17b',
        totalStudents: 0,
        attendees: 0,
        moduleId: 'CSCI368',
        moduleName: 'Network Security'
      },
      {
        id: 'VYKby5Y8r2cIyOsdAnNM',
        date: '2023-01-02',
        startTime: '12:00',
        endTime: '15:00',
        lecturerName: 'Sionggo Japit',
        period: 0,
        type: 'Lecture',
        venue: 'A.1.15',
        totalStudents: 0,
        attendees: 0,
        moduleId: 'CSCI368',
        moduleName: 'Network Security'
      },
      {
        id: 'aJRzm54ODMqDOr5c57jd',
        date: '2023-01-30',
        startTime: '08:30',
        endTime: '11:30',
        lecturerName: 'Sionggo Japit',
        period: 0,
        type: 'Lecture',
        venue: 'A.2.17',
        totalStudents: 0,
        attendees: 0,
        moduleId: 'CSCI368',
        moduleName: 'Network Security'
      }
    ];

    expect(sortClasses(testClassesData)).toMatchInlineSnapshot(`
[
  {
    "attendees": 0,
    "date": "2023-01-02",
    "endTime": "15:00",
    "id": "VYKby5Y8r2cIyOsdAnNM",
    "lecturerName": "Sionggo Japit",
    "moduleId": "CSCI368",
    "moduleName": "Network Security",
    "period": 0,
    "startTime": "12:00",
    "totalStudents": 0,
    "type": "Lecture",
    "venue": "A.1.15",
  },
  {
    "attendees": 0,
    "date": "2023-01-20",
    "endTime": "11:30",
    "id": "tP7LbWIJfL5fLlkbsTmF",
    "lecturerName": "Sionggo Japit",
    "moduleId": "CSCI368",
    "moduleName": "Network Security",
    "period": 0,
    "startTime": "08:30",
    "totalStudents": 0,
    "type": "Tutorial",
    "venue": "A.2.17b",
  },
  {
    "attendees": 0,
    "date": "2023-01-30",
    "endTime": "11:30",
    "id": "aJRzm54ODMqDOr5c57jd",
    "lecturerName": "Sionggo Japit",
    "moduleId": "CSCI368",
    "moduleName": "Network Security",
    "period": 0,
    "startTime": "08:30",
    "totalStudents": 0,
    "type": "Lecture",
    "venue": "A.2.17",
  },
]
`);
  });

  test('sortClasses() - Invalid', async () => {
    try {
      sortClasses('Invalid_Sort_Classes');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[TypeError: Cannot read properties of undefined (reading 'substring')]`
      );
    }
  });

  test('latestClass() - Valid', async () => {
    expect(await latestClass(['CSIT321'], enrollmentStatusEnum.PARTTIME)).toMatchInlineSnapshot(`
    {
      "date": "2024-05-02",
      "endTime": "22:00",
      "id": "Y6TIrgYrfsZH9Fnrt4F1",
      "lecturerName": "Sionggo Japit",
      "moduleId": "CSIT321",
      "moduleName": "Project",
      "period": 1,
      "startTime": "19:00",
      "type": "Lecture",
      "venue": "A.1.09",
    }
    `);

    expect(await latestClass(['CSIT314'], enrollmentStatusEnum.FULLTIME)).toMatchInlineSnapshot(`
    {
      "date": "2024-01-08",
      "endTime": "11:30",
      "id": "D0YzcjwCcQnlYNlyy03I",
      "lecturerName": "Loo PK",
      "moduleId": "CSIT314",
      "moduleName": "Software Development Methodologies",
      "period": 0,
      "startTime": "08:30",
      "type": "Lecture",
      "venue": "A.2.17a",
    }
    `);
  }, 20000);

  test('latestClass() - Invalid', async () => {
    try {
      await latestClass('Invalid_Module_Id');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[TypeError: Cannot read properties of undefined (reading 'name')]`
      );
    }
  });
});
