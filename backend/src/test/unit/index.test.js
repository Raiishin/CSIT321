import { validatePhoneNumber } from '../../library/index.js';

test('Validate phone number', async () => {
  expect(validatePhoneNumber('12345678')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('81234567')).toMatchInlineSnapshot(`true`);

  expect(validatePhoneNumber('91234567')).toMatchInlineSnapshot(`true`);

  expect(validatePhoneNumber('01234567')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('012345678')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('912345678')).toMatchInlineSnapshot(`false`);
});
