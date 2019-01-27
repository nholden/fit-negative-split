const Seconds = require('../src/seconds').default;

test('displays zero', () => {
  expect(new Seconds(0).formattedTime).toBe('0:00');
});

test('displays times less than a minute', () => {
  expect(new Seconds(59).formattedTime).toBe('0:59');
});

test('displays a minute', () => {
  expect(new Seconds(60).formattedTime).toBe('1:00');
});

test('displays times between a minute and ten minutes', () => {
  expect(new Seconds(599).formattedTime).toBe('9:59');
});

test('displays ten minutes', () => {
  expect(new Seconds(600).formattedTime).toBe('10:00');
});

test('displays times between ten minutes and an hour', () => {
  expect(new Seconds(3599).formattedTime).toBe('59:59');
});

test('displays an hour', () => {
  expect(new Seconds(3600).formattedTime).toBe('1:00:00');
});

test('displays times between an hour and ten hours', () => {
  expect(new Seconds(35999).formattedTime).toBe('9:59:59');
});

test('displays ten hours', () => {
  expect(new Seconds(36000).formattedTime).toBe('10:00:00');
});

test('displays one hundred hours', () => {
  expect(new Seconds(360000).formattedTime).toBe('100:00:00');
});

test('throws an error when input is negative', () => {
  expect(() => { new Seconds(-1) }).toThrow(TypeError);
});

test('throws an error when input is not an integer', () => {
  expect(() => { new Seconds(1.1) }).toThrow(TypeError);
});

test('throws an error when input is not a number', () => {
  expect(() => { new Seconds('a') }).toThrow(TypeError);
});

test('throws an error when input is null', () => {
  expect(() => { new Seconds(null) }).toThrow(TypeError);
});
