import User from "../models/user.js";

class Admin extends User{
    constructor(id, name, password, email, type, is_active, modules){
        super(id, name, password, email, type, is_active, modules);
    }
}

export default Admin;