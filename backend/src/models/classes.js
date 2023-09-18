class Classes {
    constructor(date, start_time, end_time, lecturer_name) {
      this.date = date;
      this.start_time = start_time;
      this.end_time = end_time;
      this.lecturer_name = lecturer_name;
    }
  
    static get date() {
      return this.date;
    }
  
    static get start_time() {
      return this.start_time;
    }
  
    static get end_time() {
      return this.end_time;
    }
  
    static get lecturer_name() {
      return this.lecturer_name;
    }
  }
  
  export default Classes;
  