const Activity = require('../../src/modules/activity').default;
const fitData = require('../fixtures/short_run_fit_data');
const activity = new Activity(fitData);

test('fetches records', () => {
  expect(activity.records.firstRecord.elapsed_time).toBe(0);
  expect(activity.records.halfDistanceRecord.elapsed_time).toBe(686);
  expect(activity.records.lastRecord.elapsed_time).toBe(1279);
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

test('returns 2 splits', () => {
  const splits = activity.splits({ quantity: 2 });
  expect(splits.length).toBe(2);
  expect(splits[0].seconds).toBe(686);
  expect(splits[0].distance).toBeCloseTo(1.16);
  expect(splits[1].seconds).toBe(593);
  expect(splits[1].distance).toBeCloseTo(1.16);
});

test('returns 3 splits', () => {
  const splits = activity.splits({ quantity: 3 });
  expect(splits.length).toBe(3)
  expect(splits[0].seconds).toBe(489);
  expect(splits[0].distance).toBeCloseTo(0.77);
  expect(splits[1].seconds).toBe(399);
  expect(splits[1].distance).toBeCloseTo(0.78);
  expect(splits[2].seconds).toBe(391);
  expect(splits[2].distance).toBeCloseTo(0.77);
});
