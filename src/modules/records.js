export default class Records {
  constructor(recordsData) {
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
