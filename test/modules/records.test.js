const Records = require('../../src/modules/records').default;
const fitData = require('../fixtures/short_run_fit_data');
const records = new Records(fitData.records)

test('fetches first record', () => {
  expect(records.firstRecord.elapsed_time).toBe(0);
  expect(records.firstRecord.distance).toBe(0.0006337986160820806);
});

test('fetches half distance record', () => {
  expect(records.halfDistanceRecord.elapsed_time).toBe(686);
  expect(records.halfDistanceRecord.distance).toBe(1.1620759762984172);
});

test('fetches last record', () => {
  expect(records.lastRecord.elapsed_time).toBe(1279);
  expect(records.lastRecord.distance).toBe(2.3182302851348124);
});

test('throws error when input is a single record', () => {
  expect(() => new Records(fitData.records[0])).toThrow(TypeError);
});

test('throws error when input is an empty array', () => {
  expect(() => new Records([])).toThrow(TypeError);
});

test('throws error when input is an array of non-records', () => {
  expect(() => new Records([{foo: 1}, {bar: 2}])).toThrow(TypeError);
});
