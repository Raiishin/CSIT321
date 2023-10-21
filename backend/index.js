import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ModuleController from './src/controllers/module.js';
import UserController from './src/controllers/user.js';
import ClassController from './src/controllers/class.js';
import AttendanceLogController from './src/controllers/attendanceLog.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.set('trust proxy', 3);

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

const rateLimitConfig = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Maximum number of requests per windowMs (5 per min)
  message: 'Too many requests from this IP, please try again later.'
};

const sessionConf = {
  secret: 'fyp-23-s3-28',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true, // Set to true as we are using https
    maxAge: 60 * 60 * 1000 // Expire in an hour
  }
};

http.createServer(app).listen(port, () => console.log('Application Started at: ' + port));

const router = express.Router();

router.get('/modules', rateLimit(rateLimitConfig), ModuleController.index);

router.get('/users', rateLimit(rateLimitConfig), UserController.index);
router.post('/user/create', rateLimit(rateLimitConfig), UserController.create);
router.post('/user/update', rateLimit(rateLimitConfig), UserController.update);
router.post('/user/login', rateLimit(rateLimitConfig), UserController.login);
router.post('/user/reset-password', rateLimit(rateLimitConfig), UserController.resetPassword);
router.delete('/user', rateLimit(rateLimitConfig), UserController.destroy);
router.delete('/user/session', session(sessionConf), UserController.destroySession);

router.get('/classes', rateLimit(rateLimitConfig), ClassController.index);

router.post('/attendance/mark', rateLimit(rateLimitConfig), AttendanceLogController.create);

router.get(
  '/generate/registration',
  rateLimit(rateLimitConfig),
  UserController.generateRegistration
);
router.get(
  '/generate/authentication',
  rateLimit(rateLimitConfig),
  session(sessionConf),
  UserController.generateAuthentication
);

router.post('/verify/registration', rateLimit(rateLimitConfig), UserController.registerUser);
router.post('/verify/authentication', rateLimit(rateLimitConfig), UserController.authenticateUser);

app.use('/', router); //to use the routes
