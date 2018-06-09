import yaml from 'js-yaml';
import ini from 'ini';


const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (type) => {
  if (!parsers[type]) {
    throw new Error(`sorry, we don't support ${type} files yet`);
  }
  return parsers[type];
};
