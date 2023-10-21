import { getUserById, getUserByEmail, getTotalStudentsByModuleId } from '../../library/user.js'

test('Retrieve User by User Id', async () => {

    //Valid User ID
    expect(await getUserById('zJuAaIbJN7uFX9MG7w2V')).toMatchInlineSnapshot(`
{
  "email": "andy@gmail.com",
  "enrollment_status": "1",
  "failedLoginAttempts": 3,
  "failed_login_attempts": NaN,
  "id": "zJuAaIbJN7uFX9MG7w2V",
  "is_active": true,
  "is_locked": false,
  "modules": [
    "CSCI376",
    "CSCI361",
    "CSIT314",
  ],
  "name": "&D!",
  "password": "$2b$10$sUVyJ7BPvv8HiPHlBPsHc.ou9i1HK5sVIYrVsvcGxBQf5IZ7mgaY6",
  "type": 0,
}
`);

    //Invalid Class Id
    try {
        const result = await getUserById('Invalid_User_ID');
        expect(result).toMatchInlineSnapshot();
    } catch (error) {
        expect(error).toMatchInlineSnapshot(`[Error: User does not exist]`);
      }
});

test('Retrieve User by Email', async () => {
    
    //Valid Email
    expect(await getUserByEmail('gavin@gmail.com')).toMatchInlineSnapshot(`
{
  "email": "gavin@gmail.com",
  "enrollment_status": 0,
  "failed_login_attempts": 0,
  "id": "8mdphTDNBkGGhvCd7Jkr",
  "is_active": true,
  "is_locked": false,
  "modules": [
    "CSCI376",
    "CSCI361",
  ],
  "name": "testing",
  "password": "$2b$10$rj7KY4Yl52svZHd4.YnLAut6OEHf8uRnMb1pmIuYITMsyzTqgdefS",
  "type": 0,
}
`);

    //Invalid Class Id
    try {
        const result = await getUserByEmail('Invalid_Email');
        expect(result).toMatchInlineSnapshot();
    } catch (error) {
        expect(error).toMatchInlineSnapshot(`[Error: User does not exist]`);
      }
});

test('Retrieve Total Students by Module Id', async () => {

    //Valid Module ID
    expect(await getTotalStudentsByModuleId('CSCI376')).toMatchInlineSnapshot(`7`);

    //Invalid Module ID
    expect(await getTotalStudentsByModuleId('Invalid_Module_Id')).toMatchInlineSnapshot(`0`);
});