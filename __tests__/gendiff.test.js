import fs from 'fs';
import compareJsons from '../src';


test('comparing two files', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const exPath = '__tests__/__fixtures__/expected.json';

  const expected = fs.readFileSync(exPath, 'utf8');
  const current = compareJsons(path1, path2);
  expect(current).toBe(expected);
});
