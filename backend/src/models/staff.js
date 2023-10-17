import User from './user.js';

class Staff extends User {
  constructor(
    id,
    name,
    address,
    password,
    email,
    type,
    isActive,
    isLocked,
    failedLoginAttempts,
    modules
  ) {
    super(id, name, address, password, email, type, isActive, isLocked, failedLoginAttempts);

    this.modules = modules;
  }

  static get modules() {
    return this.modules;
  }
}

export default Staff;
