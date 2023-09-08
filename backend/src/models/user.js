class User {
  constructor(id, name, email, phoneNumber, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.type = type;
  }

  static get id() {
    return this.id;
  }

  static get name() {
    return this.name;
  }

  static get email() {
    return this.email;
  }

  static get type() {
    return this.type;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }
}

export default User;
