import Records from './records';

export default class Activity {
  constructor(fitData) {
    this.fitData = fitData;
  }

  get records() {
    return new Records(this.fitData.records);
  }

  get distance() {
    return this.records.longestDistanceRecord.distance;
  }
}
