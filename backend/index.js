import express from 'express';
import cors from 'cors';
import UserController from './src/controllers/user.js';
import ClassController from './src/controllers/classes.js'

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.listen(port, function () {
  console.log('Application Started at: ' + port);
});

const router = express.Router();

router.get('/users', UserController.index);
router.get('/class', ClassController.index);
// router.post('/createUser', UserController.create);
// router.post('/updateUser', UserController.update);

app.use('/', router); //to use the routes
