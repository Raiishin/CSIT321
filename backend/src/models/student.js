import User from '../models/user.js';

class Student extends User {
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
    modules,
    enrollmentStatus
  ) {
    super(id, name, address, password, email, type, isActive, isLocked, failedLoginAttempts);

    this.modules = modules;
    this.enrollmentStatus = enrollmentStatus;
  }

  static get modules() {
    return this.modules;
  }

  static get enrollmentStatus() {
    return this.enrollmentStatus;
  }
}

export default Student;
