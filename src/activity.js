export default class Activity {
  constructor(fitData) {
    this.fitData = fitData;
  }

  get totalTimerTime() {
    return this.fitData.activity.total_timer_time;
  }
}
