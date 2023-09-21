class Class {
  constructor(date, startTime, endTime, lecturerName, period, type, venue) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lecturerName = lecturerName;
    this.period = period;
    this.type = type;
    this.venue = venue;
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

  static get period() {
    return this.period;
  }

  static get type() {
    return this.type;
  }

  static get venue() {
    return this.venue;
  }
}

export default Class;
