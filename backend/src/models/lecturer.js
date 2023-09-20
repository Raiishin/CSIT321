import User from "../models/user.js";

class Lecturer extends User{
    constructor(id, name, password, email, type, is_active, modules){
        super(id, name, password, email, type, is_active, modules);
    }
}

export default Lecturer;