import userTypeEnum from '../../constants/userTypeEnum.js';
import { convertTimeStringToDate, getObjectKey } from '../../library/index.js';

describe('Testing library functions', () => {
  test('convertTimeStringToDate() - Invalid Date String', async () => {
    expect(convertTimeStringToDate('2023qwe9', '50:00')).toMatchInlineSnapshot(`Date { NaN }`);
  });

  test('convertTimeStringToDate() - Invalid Date Separator', async () => {
    expect(convertTimeStringToDate('2023=23=11', '23-00')).toMatchInlineSnapshot(`Date { NaN }`);
  });

  test('convertTimeStringToDate() - Invalid Time String', async () => {
    expect(convertTimeStringToDate('2023-01-11', '19sasad')).toMatchInlineSnapshot(`Date { NaN }`);
  });

  test('convertTimeStringToDate() - Valid Date and Time String', async () => {
    expect(convertTimeStringToDate('2023-03-21', '08:00')).toMatchInlineSnapshot(
      `2023-03-21T08:00:00.000Z`
    );

    expect(convertTimeStringToDate('2023-01-50', '15:00')).toMatchInlineSnapshot(
      `2023-02-19T15:00:00.000Z`
    );
  });

  test('getObjectKey() - Valid', async () => {
    expect(getObjectKey(userTypeEnum, 0)).toMatchInlineSnapshot(`"STUDENT"`);

    expect(getObjectKey(userTypeEnum, 1)).toMatchInlineSnapshot(`"STAFF"`);

    expect(getObjectKey(userTypeEnum, 2)).toMatchInlineSnapshot(`"ADMIN"`);
  });

  test('getObjectKey() - Invalid', async () => {
    expect(getObjectKey(userTypeEnum, 4)).toMatchInlineSnapshot(`undefined`);
  });
});
