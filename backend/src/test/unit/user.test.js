import { getUserById, getUserByEmail, getTotalStudentsByModuleId } from '../../library/user.js';

describe('Testing Class library functions', () => {
  const testId = 'XeEdrrEeytTRC6xJwZWm';
  const testEmail = 'testing@gmail.com';

  test('getUserById() - Valid', async () => {
    expect(await getUserById(testId)).toMatchInlineSnapshot(`
{
  "address": "Blk123 Orchard",
  "email": "testing@gmail.com",
  "failed_login_attempts": 0,
  "id": "XeEdrrEeytTRC6xJwZWm",
  "is_active": true,
  "is_locked": false,
  "modules": [
    "CSIT314",
    "CSCI376",
    "CSCI251",
  ],
  "name": "testing",
  "password": "$2b$10$YMkOh0/vPdFCCErMDTbBMOdeuSR9Npg2/7mfeprxAtEW2UP0YZKvG",
  "type": 1,
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
  "address": "Blk123 Orchard",
  "email": "testing@gmail.com",
  "failed_login_attempts": 0,
  "id": "XeEdrrEeytTRC6xJwZWm",
  "is_active": true,
  "is_locked": false,
  "modules": [
    "CSIT314",
    "CSCI376",
    "CSCI251",
  ],
  "name": "testing",
  "password": "$2b$10$YMkOh0/vPdFCCErMDTbBMOdeuSR9Npg2/7mfeprxAtEW2UP0YZKvG",
  "type": 1,
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
    expect(await getTotalStudentsByModuleId('CSCI251')).toMatchInlineSnapshot(`8`);
  });

  test('getTotalStudentsByModuleId() - Invalid (Default returns 0)', async () => {
    expect(await getTotalStudentsByModuleId('Invalid_Module_Id')).toMatchInlineSnapshot(`0`);
  });
});
