// Module Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

const modules = collection(db, 'modules');

const index = async (req, res) => {
  const modulesSnapshot = await getDocs(modules);
  const modulesData = modulesSnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  return res.json({ modulesData });
};

export default {
  index
};
