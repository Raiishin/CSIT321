import User from '../models/user.js';

class Student extends User {
  constructor(id, name, password, email, type, isActive, modules, enrollStatus) {
    super(id, name, password, email, type, isActive, modules, enrollStatus);

    this.enrollStatus = enrollStatus;
  }

  static get enrollStatus() {
    return this.enrollStatus;
  }
}

export default Student;
