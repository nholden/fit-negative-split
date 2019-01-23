export default class Records {
  constructor(recordsData) {
    this.recordsData = recordsData;
  }

  get midDistanceRecord() {
    const midDistance = this.longestDistanceRecord.distance / 2;

    return this.recordsData.sort((a, b) => (
      Math.abs(midDistance - a.distance) - Math.abs(midDistance - b.distance)
    ))[0];
  }

  get longestDistanceRecord() {
    return this.recordsData.sort((a, b) => a.distance - b.distance)[this.recordsData.length - 1];
  }
}
