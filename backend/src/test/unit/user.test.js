import { getUserById, getUserByEmail, getTotalStudentsByModuleId } from '../../library/user.js';

describe('Testing Class library functions', () => {
  const testId = 'zJuAaIbJN7uFX9MG7w2V';
  const testEmail = 'andy@gmail.com';

  test('getUserById() - Valid', async () => {
    expect(await getUserById(testId)).toMatchInlineSnapshot(`
{
  "address": "123 road",
  "email": "${testEmail}",
  "enrollment_status": "1",
  "failedLoginAttempts": 3,
  "failed_login_attempts": NaN,
  "id": "${testId}",
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
  });

  test('getUserById() - Invalid', async () => {
    try {
      await getUserById('Invalid_User_ID');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: User does not exist]`);
    }
  });

  test('getUserByEmail() - Valid', async () => {
    expect(await getUserByEmail(testEmail)).toMatchInlineSnapshot(`
    {
      "address": "123 road",
      "email": "${testEmail}",
      "enrollment_status": "1",
      "failedLoginAttempts": 3,
      "failed_login_attempts": NaN,
      "id": "${testId}",
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
  });

  test('getUserByEmail() - Invalid', async () => {
    try {
      await getUserByEmail('Invalid_Email');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: User does not exist]`);
    }
  });

  test('getTotalStudentsByModuleId() - Valid', async () => {
    expect(await getTotalStudentsByModuleId('CSCI376')).toMatchInlineSnapshot(`7`);
  });

  test('getTotalStudentsByModuleId() - Invalid (Default returns 0)', async () => {
    expect(await getTotalStudentsByModuleId('Invalid_Module_Id')).toMatchInlineSnapshot(`0`);
  });
});
