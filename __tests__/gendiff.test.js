import fs from 'fs';
import findDiffBetweenTwoFiles from '../src';


test('comparing two .json files', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const exPath = '__tests__/__fixtures__/expected.txt';

  const str = fs.readFileSync(exPath, 'utf8');
  const expected = str.substring(0, str.length - 1);
  const current = findDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});

test('comparing two .yml files', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.yml';
  const exPath = '__tests__/__fixtures__/expected.txt';

  const str = fs.readFileSync(exPath, 'utf8');
  const expected = str.substring(0, str.length - 1);
  const current = findDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});

test('comparing two .ini files', () => {
  const path1 = '__tests__/__fixtures__/before.ini';
  const path2 = '__tests__/__fixtures__/after.ini';
  const exPath = '__tests__/__fixtures__/expected.txt';

  const str = fs.readFileSync(exPath, 'utf8');
  const expected = str.substring(0, str.length - 1);
  const current = findDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});

test('comparing two nested .json files', () => {
  const path1 = '__tests__/__fixtures__/extended/before.json';
  const path2 = '__tests__/__fixtures__/extended/after.json';
  const exPath = '__tests__/__fixtures__/extended/expected.txt';

  const str = fs.readFileSync(exPath, 'utf8');
  const expected = str.substring(0, str.length - 1);
  const current = findDiffBetweenTwoFiles(path1, path2);
  expect(current).toBe(expected);
});
