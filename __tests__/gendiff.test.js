import diffFinder from '../src';

test('comparing two files', () => {
  const path1 = '../__tests__/before.json';
  const path2 = '../__tests__/after.json';
  const expected = 'src/__tests__/expected.json';
  const current = diffFinder(path1, path2);
  expect(current).toBe(expected);
});
