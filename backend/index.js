import express from 'express';
import session from 'express-session';
import cors from 'cors';
import memoryStore from 'memorystore';
import dotenv from 'dotenv';
import UserController from './src/controllers/user.js';
import AuthController from './src/controllers/auth.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 5001;
const MemoryStore = memoryStore(session);

app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true // Ensure to not expose session cookies to clientside scripts
    },
    store: new MemoryStore({
      checkPeriod: 86_400_000 // prune expired entries every 24h
    })
  })
);

const { ENABLE_HTTPS } = process.env;

if (ENABLE_HTTPS) {
  const host = '0.0.0.0';
  /**
   * See the README on how to generate this SSL cert and key pair using mkcert
   */
  https
    .createServer(
      { key: fs.readFileSync(`./${rpID}.key`), cert: fs.readFileSync(`./${rpID}.crt`) },
      app
    )
    .listen(port, host, () => console.log('Application Started at: ' + port));
} else {
  http.createServer(app).listen(port, () => console.log('Application Started at: ' + port));
}

const router = express.Router();

router.get('/users', UserController.index);
// router.get('/user', UserController.view);
// router.post('/createUser', UserController.create);
// router.post('/updateUser', UserController.update);

router.get('/generate/registration', AuthController.generateRegistration);
router.get('/generate/authentication', AuthController.generateAuthentication);

router.post('/verify/registration', AuthController.registerUser);
// router.get('/verify/authentication', AuthController.generateAuthentication);

app.use('/', router); //to use the routes
