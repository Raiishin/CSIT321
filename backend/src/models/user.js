class User {
  constructor(id, name, password, email, type, is_active, modules) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.type = type
    this.is_active = is_active
    this.modules = modules;
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
    return this.is_active;
  }

  static get modules() {
    return this.modules;
  }

}

export default User;
