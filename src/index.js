import fs from 'fs';
import _ from 'lodash';
import getParserByFilePath from './parsers';


export default (path1, path2) => {
  const parse = getParserByFilePath(path1);
  const contentBefore = parse(fs.readFileSync(path1, 'utf8'));
  const contentAfter = parse(fs.readFileSync(path2, 'utf8'));

  const keys = Object.keys({ ...contentBefore, ...contentAfter });

  const result = keys.reduce((acc, el) => {
    if (contentBefore[el] === contentAfter[el]) {
      return [...acc, `  ${el}: ${contentBefore[el]}`];
    } else if (_.has(contentBefore, el)) {
      return _.has(contentAfter, el) ?
        [...acc, `  + ${el}: ${contentAfter[el]}`, `  - ${el}: ${contentBefore[el]}`] :
        [...acc, `  - ${el}: ${contentBefore[el]}`];
    } return [...acc, `  + ${el}: ${contentAfter[el]}`];
  }, []);

  const str = _.join(result, '\n');
  return `{\n  ${str}\n}\n`;
};
