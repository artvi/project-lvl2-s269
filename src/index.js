import fs from 'fs';
import _ from 'lodash';
import getParserByFilePath from './parsers';


export default (path1, path2) => {
  const parse = getParserByFilePath(path1);
  const objBefore = parse(fs.readFileSync(path1, 'utf8'));
  const objAfter = parse(fs.readFileSync(path2, 'utf8'));

  const keys = Object.keys({ ...objBefore, ...objAfter });

  const result = keys.reduce((acc, el) => {
    if (objBefore[el] === objAfter[el]) {
      return [...acc, `  ${el}: ${objBefore[el]}`];
    } else if (_.has(objBefore, el)) {
      return _.has(objAfter, el) ?
        [...acc, `  + ${el}: ${objAfter[el]}`, `  - ${el}: ${objBefore[el]}`] :
        [...acc, `  - ${el}: ${objBefore[el]}`];
    } return [...acc, `  + ${el}: ${objAfter[el]}`];
  }, []);

  const str = _.join(result, '\n');
  return `{\n  ${str}\n}\n`;
};
