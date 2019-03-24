import _ from 'lodash';

export default class Split {
  constructor(startRecord, endRecord) {
    if (!_.has(startRecord, 'distance') || !_.has(endRecord, 'distance')) {
      throw new TypeError('arguments must be objects record data from the start and end of split');
    }

    this.startRecord = startRecord;
    this.endRecord = endRecord;
  }

  get seconds() {
    return this.endRecord.timer_time - this.startRecord.timer_time;
  }

  get distance() {
    return this.endRecord.distance - this.startRecord.distance;
  }
}
