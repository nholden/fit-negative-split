import _ from 'lodash';
import Records from './records';
import Seconds from './seconds';
import Split from './split';

export default class Activity {
  constructor(fitData) {
    this.fitData = fitData;
  }

  get records() {
    return new Records(this.fitData.records);
  }

  get firstHalfSplit() {
    return new Split(this.records.firstRecord, this.records.halfDistanceRecord);
  }

  get secondHalfSplit() {
    return new Split(this.records.halfDistanceRecord, this.records.lastRecord);
  }

  get halfSplitDifferenceFormattedTime() {
    const halfSplitDifferenceSeconds = Math.abs(
      this.secondHalfSplit.seconds - this.firstHalfSplit.seconds,
    );

    return new Seconds(halfSplitDifferenceSeconds).formattedTime;
  }

  get firstHalfSplitFormattedTime() {
    return new Seconds(this.firstHalfSplit.seconds).formattedTime;
  }

  get secondHalfSplitFormattedTime() {
    return new Seconds(this.secondHalfSplit.seconds).formattedTime;
  }

  get firstHalfSplitFormattedDistance() {
    return `${_.round(this.firstHalfSplit.distance, 2)} mi`;
  }

  get secondHalfSplitFormattedDistance() {
    return `${_.round(this.secondHalfSplit.distance, 2)} mi`;
  }

  splits({ quantity }) {
    const splits = [];

    if (quantity) {
      const records = this.records.evenDistances(quantity);
      records.forEach((record, index) => {
        if (index === records.length - 1) {
          return null;
        }

        return splits.push(new Split(record, records[index + 1]));
      });
    }

    return splits;
  }
}
