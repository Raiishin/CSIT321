class User {
  constructor(id, name, password, email, type, isActive, modules, enrollStatus) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.type = type
    this.isActive = isActive
    this.modules = modules;
    this.enrollStatus = enrollStatus;
  }

  static get id() {
    return this.id;
  }

  static get name() {
    return this.name;
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

  static get is_active() {
    return this.isActive;
  }

  static get modules() {
    return this.type;
  }

  static get enrollStatus() {
    return this.enrollStatus;
  }

}

export default User;
