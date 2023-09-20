import User from "../models/user.js";

class Admin extends User{
    constructor(id, name, password, email, type, isActive, modules){
        super(id, name, password, email, type, isActive, modules);
    }
}

export default Admin;