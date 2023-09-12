// import config from '../config/index';
// import { saltPassword } from '../library/index.js';

// export const loginUser = async (email, password) => {
//   const saltedPassword = saltPassword(password);

//   const response = await fetch(
//     `${config.backendEndpoint}/user?email=${email}&password=${saltedPassword}`
//   );
//   const responseJSON = await response.json();

//   return responseJSON;
// };

// export const createUser = async (name, email, password, phoneNumber) => {
//   const saltedPassword = saltPassword(password);

//   const response = await fetch(`${config.backendEndpoint}/createUser`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, password: saltedPassword, phoneNumber })
//   });

//   const responseJSON = await response.json();

//   return responseJSON;
// };

// export const updateUser = async (id, password, phoneNumber) => {
//   const saltedPassword = saltPassword(password);

//   const response = await fetch(`${config.backendEndpoint}/updateUser`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id, password: saltedPassword, phoneNumber })
//   });

//   const responseJSON = await response.json();

//   return responseJSON;
// };
