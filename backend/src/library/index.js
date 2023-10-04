export const validatePhoneNumber = phoneNumber => {
  const pattern = /^[89]\d{7}$/;
  return pattern.test(phoneNumber);
};

export const getObjectKey = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

export const convertTimeStringToDate = (date, timeString = '00:00') => {
  const dateStr = date.split('-');

  return new Date(
    +dateStr[0],
    +dateStr[1] - 1,
    +dateStr[2],
    +timeString.substring(0, 2),
    +timeString.substring(3, 5)
  );
};
