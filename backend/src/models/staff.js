import User from './user.js';

class Staff extends User {
  constructor(id, name, password, email, type, isActive, modules) {
    super(id, name, password, email, type, isActive, modules);
  }
}

export default Staff;
