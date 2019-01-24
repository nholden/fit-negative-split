export default class Split {
  constructor(startRecord, endRecord) {
    this.startRecord = startRecord;
    this.endRecord = endRecord;
  }

  get seconds() {
    return this.endRecord.elapsed_time - this.startRecord.elapsed_time;
  }

  get distance() {
    return this.endRecord.distance - this.startRecord.distance;
  }
}
