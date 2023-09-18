// User Controller
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

const view = async (req, res) => {
  const { name } = req.query;

  const searchQuery = query(users, where('name', '==', name));
  const usersData = await getDocs(searchQuery);

  let user;

  usersData.forEach(item => (user = item.data()));

  return res.json({ user });
};

const createUser = async (req, res) => {
  await addDoc(users, {
    name: 'Andy',
    password: '123456',
    email: 'andy@gmail.com',
    type: '0',
    is_active: true,
    modules: ['CSCI376', 'CSCI361']
  });

  await addDoc(users, {
    name: 'Sionggo Japit',
    password: '123456',
    email: 'sionggojapit@gmail.com',
    type: '1',
    is_active: true,
    modules: ['CSCI368,CSCI376']
  });
};

const createModules = async (req, res) => {
  const modules = collection(db, 'modules');

  await addDoc(modules, {
    module_id: 'CSCI368',
    name: 'Network Security'
  });
};

const createClasses = async (req, res) => {
  const classes = collection(db, 'classes');

  await addDoc(classes, {
    module_id: 'CSCI368',
    date: '2023-01-04',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });
};

// const create = async (req, res) => {
//   const { name, password, email, phoneNumber } = req.body;

//   if (!validatePhoneNumber(phoneNumber))
//     return res.json({ message: 'This phone number is invalid' });

//   // Validate if user already exists using email
//   const searchQuery = query(users, where('email', '==', email));
//   const usersData = await getDocs(searchQuery);

//   // Error handling if email already exists
//   if (usersData.docs.length !== 0) return res.json({ message: 'This email already exists' });

//   // Create new user, default to being a customer
//   const resp = await addDoc(users, {
//     name,
//     password,
//     email,
//     phoneNumber,
//     type: userTypeEnum.CUSTOMER,
//     walletBalance: 0,
//     loyaltyPoints: 0
//   });

//   const userRef = doc(db, 'users', resp.id);
//   const user = await getDoc(userRef);

//   const data = user.data();

//   const customer = new Customer(
//     resp.id,
//     data.name,
//     data.email,
//     data.phoneNumber,
//     data.walletBalance,
//     data.loyaltyPoints
//   );

//   return res.json(customer);
// };

// const update = async (req, res) => {
//   const { id, phoneNumber, password } = req.body;

//   if (!validatePhoneNumber(phoneNumber))
//     return res.json({ message: 'This phone number is invalid' });

//   // Get current user information
//   const userRef = doc(db, 'users', id);
//   const user = await getDoc(userRef);

//   // Update user information
//   const updatedUser = { ...user.data() };
//   updatedUser.phoneNumber = phoneNumber;

//   if (password !== '') {
//     updatedUser.password = password;
//   }

//   // Update in firebase
//   await setDoc(userRef, updatedUser);

//   // Retrieve the updated user
//   const userData = await getDoc(userRef);

//   let returnObject;

//   if (userData.type === userTypeEnum.CUSTOMER) {
//     const customer = new Customer(
//       id,
//       userData.name,
//       userData.email,
//       userData.phoneNumber,
//       userData.walletBalance,
//       userData.loyaltyPoints
//     );

//     returnObject = customer;
//   } else if (userData.type === userTypeEnum.STAFF) {
//     const staff = new Staff(id, userData.name, userData.email, userData.phoneNumber);
//     returnObject = staff;
//   } else if (userData.type === userTypeEnum.MANAGEMENT) {
//     const management = new Management(id, userData.name, userData.email, userData.phoneNumber);
//     returnObject = management;
//   } else if (userData.type === userTypeEnum.ADMIN) {
//     const admin = new Admin(id, userData.name, userData.email, userData.phoneNumber);
//     returnObject = admin;
//   } else {
//     const user = new User(id, userData.name, userData.email, userData.phoneNumber);
//     returnObject = user;
//   }

//   return res.json(returnObject);
// };

export default {
  index,
  view,
  createUser,
  createModules,
  createClasses
  //   create,
  //   update
};
