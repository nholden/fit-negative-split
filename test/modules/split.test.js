const Split = require('../../src/modules/split').default;
const fitData = require('../fixtures/short_run_fit_data');
const startRecord = fitData.records[0];
const endRecord = fitData.records[10];
const split = new Split(startRecord, endRecord);

test('calculates duration in seconds', () => {
  expect(startRecord.elapsed_time).toBe(0);
  expect(endRecord.elapsed_time).toBe(21);
  expect(split.seconds).toBe(21);
});

test('calculates distance', () => {
  expect(startRecord.distance).toBeCloseTo(0);
  expect(endRecord.distance).toBeCloseTo(0.04);
  expect(split.distance).toBeCloseTo(0.04);
});

test('throws error when startRecord is not record data', () => {
  expect(() => { new Split({foo: 1}, endRecord) }).toThrow(TypeError);
});

test('throws error when startRecord is null', () => {
  expect(() => { new Split(null, endRecord) }).toThrow(TypeError);
});

test('throws error when endRecord is not record data', () => {
  expect(() => { new Split(startRecord, {foo: 1}) }).toThrow(TypeError);
});

test('throws error when endRecord is null', () => {
  expect(() => { new Split(startRecord, null) }).toThrow(TypeError);
});
