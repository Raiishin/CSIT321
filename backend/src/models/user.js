class User {
  constructor(id, name, address, password, email, type, isActive, isLocked, failedLoginAttempts) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.password = password;
    this.email = email;
    this.type = type;
    this.isActive = isActive;
    this.isLocked = isLocked;
    this.failedLoginAttempts = failedLoginAttempts;
  }

  static get id() {
    return this.id;
  }

  static get name() {
    return this.name;
  }

  static get address() {
    return this.address;
  }

  static get password() {
    return this.password;
  }

  static get email() {
    return this.email;
  }

  static get type() {
    return this.type;
  }

  static get isActive() {
    return this.isActive;
  }

  static get isLocked() {
    return this.isLocked;
  }

  static get failedLoginAttempts() {
    return this.failedLoginAttempts;
  }
}

export default User;
