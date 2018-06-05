import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const bef = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const aft = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const befKeys = Object.keys(bef);
  const aftKeys = Object.keys(aft);
  const allKeys = Array.from(new Set(befKeys.concat(aftKeys)));
  const result = allKeys.reduce((acc, el) => {
    if (bef[el] === aft[el]) {
      return [...acc, `${el}: ${bef[el]}`];
    } else if (_.has(bef, el)) {
      return _.has(aft, el) ?
        [...acc, `+ ${el}: ${aft[el]}`, `- ${el}: ${bef[el]}`] :
        [...acc, `- ${el}: ${bef[el]}`];
    } return [...acc, `+ ${el}: ${aft[el]}`];
  }, []);
  const str = _.join(result, '\n');
  return `{\n${str}\n}`;
};
