import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getType = pathToFile => path.extname(pathToFile);

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathToFile) => {
  const type = getType(pathToFile);
  if (!parsers[type]) {
    throw new Error(`sorry, we don't support ${type} files yet`);
  }
  return parsers[type];
};
