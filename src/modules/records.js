import _ from 'lodash';

export default class Records {
  constructor(recordsData) {
    if (!Array.isArray(recordsData) || !_.has(recordsData[0], 'distance')) {
      throw new TypeError('recordsData must be an array of objects containing record data');
    }

    this.recordsData = recordsData;
  }

  get firstRecord() {
    return this.recordsData.sort((a, b) => a.distance - b.distance)[0];
  }

  get halfDistanceRecord() {
    const halfDistance = this.lastRecord.distance / 2;

    return this.recordsData.sort((a, b) => (
      Math.abs(halfDistance - a.distance) - Math.abs(halfDistance - b.distance)
    ))[0];
  }

  get lastRecord() {
    return this.recordsData.sort((a, b) => a.distance - b.distance)[this.recordsData.length - 1];
  }
}
