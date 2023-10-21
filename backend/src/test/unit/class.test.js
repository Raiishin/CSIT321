import { getClassById, getClassesIdByModuleId, sortClasses, latestClass } from '../../library/class.js';

test ('Retrieve Classes by Class Id', async () => {
    //Valid Class ID
    expect(await getClassById('1SIjOdz3nOSFSZvexRiy')).toMatchInlineSnapshot(`
{
  "date": "2023-10-08",
  "end_time": "23:45",
  "lecturer_id": "uWZcHDVJxxdz8pqal2TL",
  "module_id": "CSCI376",
  "period": "PT",
  "start_time": "19:00",
  "type": "Lecture",
  "venue": "A.2.17a",
}
`);

//Invalid Class Id
try {
    const result = await getClassById('Invalid_Class_ID');
    expect(result).toMatchInlineSnapshot();
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`[Error: Class ID is not found]`);
  }

});

test ('Retrieve ClassID by Module Id', async () => {
    
    //Valid Class ID
    expect(await getClassesIdByModuleId('CSCI376')).toMatchInlineSnapshot(`
[
  "1SIjOdz3nOSFSZvexRiy",
  "8dQKNsnvq6jn8Hzm7Tnw",
  "J3HBZHW12OxfVXc3aEtM",
]
`);

    //Invalid Class ID
    expect(await getClassesIdByModuleId('Invalid_Module')).toMatchInlineSnapshot(`[]`);

});

test ('Validate sort classes', async () => {
    expect(sortClasses([
{
  id: 'tP7LbWIJfL5fLlkbsTmF',
  date: '2023-01-20',
  startTime: '08:30',
  endTime: '11:30',
  lecturerName: 'Sionggo Japit',
  period: 'FT',
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
  period: 'FT',
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
  period: 'FT',
  type: 'Lecture',
  venue: 'A.2.17',
  totalStudents: 0,
  attendees: 0,
  moduleId: 'CSCI368',
  moduleName: 'Network Security'
}]

)).toMatchInlineSnapshot(`
[
  {
    "attendees": 0,
    "date": "2023-01-02",
    "endTime": "15:00",
    "id": "VYKby5Y8r2cIyOsdAnNM",
    "lecturerName": "Sionggo Japit",
    "moduleId": "CSCI368",
    "moduleName": "Network Security",
    "period": "FT",
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
    "period": "FT",
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
    "period": "FT",
    "startTime": "08:30",
    "totalStudents": 0,
    "type": "Lecture",
    "venue": "A.2.17",
  },
]
`);
});

test ('Retrieve latest classes', async () => {

    //Valid Class ID
    expect(await latestClass(["CSIT314", "CSCI376"])).toMatchInlineSnapshot(`undefined`);

});