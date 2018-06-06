import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const before = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const after = JSON.parse(fs.readFileSync(path2, 'utf8'));
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
