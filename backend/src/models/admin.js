import User from '../models/user.js';

class Admin extends User {
  constructor(id, name, password, email, type, isActive, isLocked, failedLoginAttempts) {
    super(id, name, password, email, type, isActive, isLocked, failedLoginAttempts);
  }
}

export default Admin;
