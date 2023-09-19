class Class {
  constructor(date, startTime, endTime, lecturerName) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lecturerName = lecturerName;
  }

  static get date() {
    return this.date;
  }

  static get startTime() {
    return this.startTime;
  }

  static get endTime() {
    return this.endTime;
  }

  static get lecturerName() {
    return this.lecturerName;
  }
}

export default Class;
