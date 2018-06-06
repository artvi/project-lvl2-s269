import fs from 'fs';
import _ from 'lodash';
import getParserByFilePath from './parsers';


export default (path1, path2) => {
  const parser = getParserByFilePath(path1);
  const before = parser(fs.readFileSync(path1, 'utf8'));
  const after = parser(fs.readFileSync(path2, 'utf8'));

  const keys = Object.keys({ ...before, ...after });

  const result = keys.reduce((acc, el) => {
    if (before[el] === after[el]) {
      return [...acc, `  ${el}: ${before[el]}`];
    } else if (_.has(before, el)) {
      return _.has(after, el) ?
        [...acc, `  + ${el}: ${after[el]}`, `  - ${el}: ${before[el]}`] :
        [...acc, `  - ${el}: ${before[el]}`];
    } return [...acc, `  + ${el}: ${after[el]}`];
  }, []);

  const str = _.join(result, '\n');
  return `{\n  ${str}\n}\n`;
};
