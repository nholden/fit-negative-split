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

  get isNegativeSplit() {
    return this.firstHalfSplit.seconds > this.secondHalfSplit.seconds;
  }

  get isEvenSplit() {
    return this.firstHalfSplit.seconds === this.secondHalfSplit.seconds;
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
}
