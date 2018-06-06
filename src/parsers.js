import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getType = pathToFile => path.extname(pathToFile);

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default pathToFile => parsers[getType(pathToFile)];
