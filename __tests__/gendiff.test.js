import fs from 'fs';
import showDiffBetweenTwoFiles from '../src';


test('comparing two .jsons files', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const exPath = '__tests__/__fixtures__/expected.txt';

  const expected = fs.readFileSync(exPath, 'utf8');
  const current = showDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});

test('comparing two .yml files', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.yml';
  const exPath = '__tests__/__fixtures__/expected.txt';

  const expected = fs.readFileSync(exPath, 'utf8');
  const current = showDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});
