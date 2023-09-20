import User from "../models/user.js";

class Lecturer extends User{
    constructor(id, name, password, email, type, isActive, modules){
        super(id, name, password, email, type, isActive, modules);
    }
}

export default Lecturer;