const Activity = require('../../src/modules/activity').default;
const fitData = require('../fixtures/short_run_fit_data');
const activity = new Activity(fitData);

test('fetches records', () => {
  expect(activity.records.firstRecord.elapsed_time).toBe(0);
  expect(activity.records.halfDistanceRecord.elapsed_time).toBe(686);
  expect(activity.records.lastRecord.elapsed_time).toBe(1279);
});

test('calculates whether negative split', () => {
  expect(activity.isNegativeSplit).toBe(true);
});

test('calculates whether even split', () => {
  expect(activity.isEvenSplit).toBe(false);
});

test('calculates first half split', () => {
  expect(activity.firstHalfSplit.seconds).toBe(686);
  expect(activity.firstHalfSplit.distance).toBeCloseTo(1.16);
});

test('calculates second half split', () => {
  expect(activity.secondHalfSplit.seconds).toBe(593);
  expect(activity.secondHalfSplit.distance).toBeCloseTo(1.16);
});

test('formats split difference time', () => {
  expect(activity.halfSplitDifferenceFormattedTime).toBe('1:33');
});

test('formats first half split time', () => {
  expect(activity.firstHalfSplitFormattedTime).toBe('11:26');
});

test('formats second half split time', () => {
  expect(activity.secondHalfSplitFormattedTime).toBe('9:53');
});

test('formats first half split distance', () => {
  expect(activity.firstHalfSplitFormattedDistance).toBe('1.16 mi');
});

test('formats second half split distance', () => {
  expect(activity.secondHalfSplitFormattedDistance).toBe('1.16 mi');
});
