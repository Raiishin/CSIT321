import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserController from './src/controllers/user.js';
import ClassController from './src/controllers/class.js';
import AuthController from './src/controllers/auth.js';
import ClassController from './src/controllers/classes.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());

app.use(express.json());

const { ENABLE_HTTPS, rpID } = process.env;

// if (ENABLE_HTTPS) {
//   const host = '0.0.0.0';
//   /**
//    * See the README on how to generate this SSL cert and key pair using mkcert
//    */
//   https
//     .createServer(
//       { key: fs.readFileSync(`./${rpID}.key`), cert: fs.readFileSync(`./${rpID}.crt`) },
//       app
//     )
//     .listen(port, host, () => console.log('Application Started at: ' + port));
// } else {
//   http.createServer(app).listen(port, () => console.log('Application Started at: ' + port));
// }

http.createServer(app).listen(port, () => console.log('Application Started at: ' + port));

const router = express.Router();

router.get('/users', UserController.index);
router.get('/user', UserController.view);

router.get('/class', ClassController.index);
// router.post('/createUser', UserController.create);
// router.post('/updateUser', UserController.update);

router.get('/generate/registration', AuthController.generateRegistration);
router.get('/generate/authentication', AuthController.generateAuthentication);

router.post('/verify/registration', AuthController.registerUser);
router.post('/verify/authentication', AuthController.authenticateUser);

app.use('/', router); //to use the routes
