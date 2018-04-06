import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  const actualResult = sum(1, 2);
  const expectedResult = 3;

  expect(actualResult).toBe(expectedResult);
});
