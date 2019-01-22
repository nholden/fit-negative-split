export default class Records {
  constructor(recordsData) {
    this.recordsData = recordsData;
  }

  closestRecordToElapsedTime(targetTime) {
    const sortedRecords = this.recordsData.sort((a, b) => (
      Math.abs(targetTime - a.elapsed_time) - Math.abs(targetTime - b.elapsed_time)
    ));
    return sortedRecords[0];
  }
}
