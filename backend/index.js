import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ModuleController from './src/controllers/module.js';
import UserController from './src/controllers/user.js';
import ClassController from './src/controllers/class.js';
import AttendanceLogController from './src/controllers/attendanceLog.js';
import http from 'http';
import rateLimit from 'express-rate-limit';
import authMiddleware from './src/middleware/auth.js';

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.set('trust proxy', 3);

const rateLimitConfig = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // Maximum number of requests per windowMs (15 per min)
  message: 'Too many requests from this IP, please try again later.'
};

http.createServer(app).listen(port, () => console.log('Application Started at: ' + port));

const router = express.Router();

router.get('/modules', rateLimit(rateLimitConfig), ModuleController.index);

router.get('/users', rateLimit(rateLimitConfig), authMiddleware, UserController.index);
router.post('/user/create', rateLimit(rateLimitConfig), authMiddleware, UserController.create);
router.post('/user/update', rateLimit(rateLimitConfig), authMiddleware, UserController.update);
router.post('/user/login', rateLimit(rateLimitConfig), UserController.login);
router.post(
  '/user/reset-password',
  rateLimit(rateLimitConfig),
  authMiddleware,
  UserController.resetPassword
);
router.post(
  '/user/reset-biometrics',
  rateLimit(rateLimitConfig),
  authMiddleware,
  UserController.resetUserBiometrics
);
router.delete('/user', rateLimit(rateLimitConfig), authMiddleware, UserController.destroy);

router.get('/classes', rateLimit(rateLimitConfig), authMiddleware, ClassController.index);
router.get('/class/latest', rateLimit(rateLimitConfig), authMiddleware, ClassController.latest);

router.post(
  '/attendance/mark',
  rateLimit(rateLimitConfig),
  authMiddleware,
  AttendanceLogController.create
);

router.get(
  '/generate/registration',
  rateLimit(rateLimitConfig),
  UserController.generateRegistration
);
router.get(
  '/generate/authentication',
  rateLimit(rateLimitConfig),
  UserController.generateAuthentication
);

router.post('/verify/registration', rateLimit(rateLimitConfig), UserController.registerUser);
router.post('/verify/authentication', rateLimit(rateLimitConfig), UserController.authenticateUser);

app.use('/', router); //to use the routes
