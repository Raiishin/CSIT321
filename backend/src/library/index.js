export const validatePhoneNumber = phoneNumber => {
  const pattern = /^[89]\d{7}$/;
  return pattern.test(phoneNumber);
};
