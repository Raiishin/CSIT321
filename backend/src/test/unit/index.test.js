import userTypeEnum from '../../constants/userTypeEnum.js';
import { convertTimeStringToDate, getObjectKey } from '../../library/index.js';

test('Convert Time String to Date', async () => {
  
  //Invalid Date String
  expect(convertTimeStringToDate('2023qwe9', '50:00')).toMatchInlineSnapshot(`Date { NaN }`);

  //Invalid Date separator
  expect(convertTimeStringToDate('2023=23=11', '23-00')).toMatchInlineSnapshot(`Date { NaN }`);

  //Invalid Time String
  expect(convertTimeStringToDate('2023-01-11', '19sasad')).toMatchInlineSnapshot(`Date { NaN }`);

  //Valid Date and Time String
  expect(convertTimeStringToDate('2023-03-21', '08:00')).toMatchInlineSnapshot(`2023-03-21T00:00:00.000Z`);

  //Valid Date and Time String
  expect(convertTimeStringToDate('2023-01-50', '15:00')).toMatchInlineSnapshot(`2023-02-19T07:00:00.000Z`);
  
  //Valid Date and Time String
  expect(convertTimeStringToDate('2023-12-30', '11:00')).toMatchInlineSnapshot(`2023-12-30T03:00:00.000Z`);

});

test('Validate Get User Type Enum object', async () => {

  //Valid User type enum for STUDENT
  expect(getObjectKey(userTypeEnum, 0)).toMatchInlineSnapshot(`"STUDENT"`);

  //Valid User type enum for STAFF
  expect(getObjectKey(userTypeEnum, 1)).toMatchInlineSnapshot(`"STAFF"`);

  //Valid User type enum for ADMIN
  expect(getObjectKey(userTypeEnum, 2)).toMatchInlineSnapshot(`"ADMIN"`);

  //Invalid User type enum 4
  expect(getObjectKey(userTypeEnum, 4)).toMatchInlineSnapshot(`undefined`);

});