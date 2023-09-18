// User Controller
import { initializeApp } from 'firebase/app';
import { getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc } from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');
const modules = collection(db, 'modules');
const classes = collection(db, 'classes');
const attendance_logs = collection(db, 'attendance_logs');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

const view = async (req, res) => {
  const { name } = req.query;

  const searchQuery = query(users, where('name', '==', name));
  const usersData = await getDocs(searchQuery);

  let myname;

  usersData.forEach(item => {
    const data = item.data();

    myname = data.name;
  });

  return res.json({myname}); 
};

const createuser = async (req, res) => {
  const user1 = await addDoc(users, {
    name: 'Wei Feng',
    password: '123456',
    email: 'weifeng@gmail.com',
    type: '0',
    is_active: '1',
    modules: ['CSCI368']
  });

  const user2 = await addDoc(users, {
    name: 'Andy',
    password: '123456',
    email: 'andy@gmail.com',
    type: '0',
    is_active: '1',
    modules: ['CSCI376','CSCI361']
  });

  const user3 = await addDoc(users, {
    name: 'Gavin',
    password: '123456',
    email: 'gavin@gmail.com',
    type: '0',
    is_active: '1',
    modules: ['CSCI376','CSIT314']
  });

  const user4 = await addDoc(users, {
    name: 'Kee Yang',
    password: '123456',
    email: 'keeyang@gmail.com',
    type: '0',
    is_active: '1',
    modules: ['CSCI368','CSCI251']
  });

  const user5 = await addDoc(users, {
    name: 'Joe',
    password: '123456',
    email: 'joe@gmail.com',
    type: '0',
    is_active: '1',
    modules: ['CSCI361,CSCI251']
  });
};

const createlecturer = async (req, res) => {
  const lec1 = await addDoc(users, {
    name: 'Sionggo Japit',
    password: '123456',
    email: 'sionggojapit@gmail.com',
    type: '1',
    is_active: '1',
    modules: ['CSCI368,CSCI376']
  });

  const lec2 = await addDoc(users, {
    name: 'Tian Sion Hui',
    password: '123456',
    email: 'tiansionhui@gmail.com',
    type: '1',
    is_active: '1',
    modules: ['CSCI361','CSCI251']
  });

  const lec3 = await addDoc(users, {
    name: 'Loo PK',
    password: '123456',
    email: 'loopk@gmail.com',
    type: '1',
    is_active: '1',
    modules: ['CSIT314']
  });
};

const createmodules = async (req, res) => {
  const module1 = await addDoc(modules, {
    module_id: 'CSCI368',
    name: 'Network Security'
  });

  const module2 = await addDoc(modules, {
    module_id: 'CSCI376',
    name: 'Multicore and GPU Programming'
  });

  const module3 = await addDoc(modules, {
    module_id: 'CSCI361',
    name: 'Cryptography and Secure Applications'
  });

  const module4 = await addDoc(modules, {
    module_id: 'CSCI251',
    name: 'Advanced Programming'
  });

  const module5 = await addDoc(modules, {
    module_id: 'CSIT314',
    name: 'Software Development Methodologies'
  });
};

const createclasses = async (req, res) => {
  const class1 = await addDoc(classes, {
    module_id: 'CSCI368',
    date: '2023-01-04',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });
  const class2 = await addDoc(classes, {
    module_id: 'CSCI368',
    date: '2023-01-11',
    start_time: '12:00',
    end_time: '15:00',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });
  const class3 = await addDoc(classes, {
    module_id: 'CSCI368',
    date: '2023-01-18',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });

  const class4 = await addDoc(classes, {
    module_id: 'CSCI376',
    date: '2023-01-05',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });
  const class5 = await addDoc(classes, {
    module_id: 'CSCI376',
    date: '2023-01-12',
    start_time: '19:00',
    end_time: '22:00',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });
  const class6 = await addDoc(classes, {
    module_id: 'CSCI376',
    date: '2023-01-19',
    start_time: '15:30',
    end_time: '18:30',
    user_id: 'EnFVTWL9U1gfzyoPCmaE'
  });

  const class7 = await addDoc(classes, {
    module_id: 'CSCI361',
    date: '2023-01-06',
    start_time: '15:30',
    end_time: '18:30',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });
  const class8 = await addDoc(classes, {
    module_id: 'CSCI361',
    date: '2023-01-13',
    start_time: '08:30',
    end_time: '11:30',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });
  const class9 = await addDoc(classes, {
    module_id: 'CSCI361',
    date: '2023-01-20',
    start_time: '15:30',
    end_time: '18:30',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });

  const class10 = await addDoc(classes, {
    module_id: 'CSCI251',
    date: '2023-01-07',
    start_time: '15:30',
    end_time: '18:30',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });
  const class11 = await addDoc(classes, {
    module_id: 'CSCI251',
    date: '2023-01-14',
    start_time: '19:00',
    end_time: '22:00',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });
  const class12 = await addDoc(classes, {
    module_id: 'CSCI251',
    date: '2023-01-21',
    start_time: '08:30',
    end_time: '11:30',
    user_id: '4XqXJUWTT4Tslle8buT9'
  });

  const class13 = await addDoc(classes, {
    module_id: 'CSIT314',
    date: '2023-01-08',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'LMWVlZV2kCC9PQ9W0FrH'
  });
  const class14 = await addDoc(classes, {
    module_id: 'CSIT314',
    date: '2023-01-15',
    start_time: '19:00',
    end_time: '22:00',
    user_id: 'LMWVlZV2kCC9PQ9W0FrH'
  });
  const class15 = await addDoc(classes, {
    module_id: 'CSIT314',
    date: '2023-01-22',
    start_time: '08:30',
    end_time: '11:30',
    user_id: 'LMWVlZV2kCC9PQ9W0FrH'
  });
};

// const view = async (req, res) => {
//   const { password, email } = req.query;

//   const searchQuery = query(users, where('password', '==', password), where('email', '==', email));
//   const usersData = await getDocs(searchQuery);

//   let returnObject;

//   // Error handling if there are no results
//   if (usersData.docs.length == 0) {
//     return res.json({ message: 'Incorrect password or no such user exists' });
//   }

//   usersData.forEach(item => {
//     const data = item.data();

//     if (data.type === userTypeEnum.CUSTOMER) {
//       const customer = new Customer(
//         item.id,
//         data.name,
//         data.email,
//         data.phoneNumber,
//         data.walletBalance,
//         data.loyaltyPoints
//       );

//       returnObject = customer;
//     } else if (data.type === userTypeEnum.STAFF) {
//       const staff = new Staff(item.id, data.name, data.email, data.phoneNumber);
//       returnObject = staff;
//     } else if (data.type === userTypeEnum.MANAGEMENT) {
//       const management = new Management(item.id, data.name, data.email, data.phoneNumber);
//       returnObject = management;
//     } else if (data.type === userTypeEnum.ADMIN) {
//       const admin = new Admin(item.id, data.name, data.email, data.phoneNumber);
//       returnObject = admin;
//     } else {
//       const user = new User(item.id, data.name, data.email, data.phoneNumber);
//       returnObject = user;
//     }
//   });

//   return res.json(returnObject);
// };

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
  createuser,
  createlecturer,
  createclasses,
  createmodules
  //   create,
  //   update
};
