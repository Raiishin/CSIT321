import User from "../models/user.js";

class Student extends User{
    constructor(id, name, password, email, type, isActive, modules, enrollStatus){
        super(id, name, password, email, type, isActive, modules, enrollStatus);
    }
}

export default Student;