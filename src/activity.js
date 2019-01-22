import Records from './records';

export default class Activity {
  constructor(fitData) {
    this.fitData = fitData;
  }

  get midTimeRecord() {
    const midTimerTime = this.totalTimerTime / 2;
    return this.records.closestRecordToElapsedTime(midTimerTime);
  }

  get records() {
    return new Records(this.fitData.records);
  }

  get totalTimerTime() {
    return this.fitData.activity.total_timer_time;
  }
}
