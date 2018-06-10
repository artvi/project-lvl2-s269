import _ from 'lodash';

const tabulate = tabLevel => '    '.repeat(tabLevel);

const stringify = (data, tabLvl) => {
  const str = _.join(data, '');
  const tab = tabulate(tabLvl);
  return `{\n${str}${tab}}`;
};

const createInfoString = (sign, key, value, tabLvl) => {
  const tab = tabulate(tabLvl);
  if (!(value instanceof Object)) {
    return `${tab}  ${sign} ${key}: ${value}\n`;
  }
  const keys = Object.keys(value);
  const result = keys.map(el => createInfoString(' ', el, value[el], tabLvl + 1));

  return createInfoString(sign, key, stringify(result, tabLvl + 1), tabLvl);
};

const renderers = {
  nested: (el, tabLvl, func) =>
    createInfoString(' ', el.key, func(el.children, tabLvl + 1), tabLvl),

  unchanged: (el, tabLvl) => createInfoString(' ', el.key, el.value, tabLvl),

  modified: (el, tabLvl) => [
    createInfoString('+', el.key, el.valueAfter, tabLvl),
    createInfoString('-', el.key, el.valueBefore, tabLvl),
  ],

  deleted: (el, tab) => createInfoString('-', el.key, el.value, tab),

  inserted: (el, tab) => createInfoString('+', el.key, el.value, tab),
};

const render = (ast, tabLevel = 0) => {
  const processedData = ast.map((el) => {
    const currentRender = renderers[el.type];
    return currentRender(el, tabLevel, render);
  });
  const result = _.flatten(processedData);
  return stringify(result, tabLevel);
};

export default render;
