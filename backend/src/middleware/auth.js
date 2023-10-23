import jwt from 'jsonwebtoken';
import errorMessages from '../constants/errorMessages.js';
import { isAfter } from 'date-fns';

const { tokenKey } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send(errorMessages.AUTHENTICATIONTOKENISREQUIRED);
  }

  try {
    const decoded = jwt.verify(token, tokenKey);
    const { userId, exp } = decoded;

    const now = new Date();
    const expiryDate = new Date(exp * 1000); // in ms

    if (isAfter(now, expiryDate)) {
      return res.status(403).send(errorMessages.EXPIREDTOKEN);
    }

    req.userId = userId;
  } catch (err) {
    console.log('err', err);
    return res.status(401).send(errorMessages.INVALIDTOKEN);
  }

  return next();
};

export default verifyToken;
