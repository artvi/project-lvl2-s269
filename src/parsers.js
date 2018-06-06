import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

const getType = file => path.extname(file);

const parsers = [
  {
    func: file => JSON.parse(file),
    check: file => getType(file) === '.json',
  },
  {
    func: file => yaml.safeLoad(file),
    check: file => getType(file) === '.yml',
  }];

export default filePath => _.find(parsers, e => e.check(filePath)).func;
