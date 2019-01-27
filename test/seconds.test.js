const Seconds = require('../src/seconds').default;

test('correctly displays times less than a minute', () => {
  expect(new Seconds(59).formattedTime).toBe('0:59');
});
