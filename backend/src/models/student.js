import User from "../models/user.js";

class Student extends User{
    constructor(id, name, password, email, type, isActive, modules){
        super(id, name, password, email, type, isActive, modules);
    }
}

export default Student;