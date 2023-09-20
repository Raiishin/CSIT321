import User from "../models/user.js";

class Student extends User{
    constructor(id, name, password, email, type, is_active, modules){
        super(id, name, password, email, type, is_active, modules);
    }
}

export default Student;