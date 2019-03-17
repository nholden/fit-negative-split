import _ from 'lodash';
import Split from './split';

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

  get sortedRecords() {
    return this.recordsData.sort((a, b) => a.distance - b.distance);
  }

  evenDistances(quantity) {
    const newRecordsData = _.range(quantity + 1).map((recordIndex) => {
      const targetDistance = this.lastRecord.distance * (recordIndex / quantity);

      return this.recordsData.sort((a, b) => (
        Math.abs(targetDistance - a.distance) - Math.abs(targetDistance - b.distance)
      ))[0];
    });

    return new Records(newRecordsData);
  }

  get splits() {
    const splits = [];

    this.recordsData.forEach((record, index) => {
      if (index === this.recordsData.length - 1) {
        return null;
      }

      return splits.push(new Split(record, this.recordsData[index + 1]));
    });

    return splits;
  }
}
