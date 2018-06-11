import _ from 'lodash';


const valueRender = (value) => {
  if (value instanceof Object) {
    return 'complex value';
  }
  return typeof value === 'boolean' ? `${value}` : `'${value}'`;
};

const renderers = {
  nested: (el, ancestry, func) => func(el.children, `${ancestry}${el.key}.`, func),

  modified: (el, ancestry) =>
    `Property '${ancestry}${el.key}' was updated. From ${valueRender(el.valueBefore)} to ${valueRender(el.valueAfter)}`,

  deleted: (el, ancestry) => `Property '${ancestry}${el.key}' was removed`,

  inserted: (el, ancestry) => {
    const val = valueRender(el.value) === 'complex value' ? 'complex value' : `value: ${valueRender(el.value)}`;
    return `Property '${ancestry}${el.key}' was added with ${val}`;
  },
};

const render = (ast, ancestry = '') => {
  const processedData = ast.reduce((acc, el) => {
    const currentRender = renderers[el.type];
    if (!currentRender) {
      return acc;
    }
    return [...acc, currentRender(el, ancestry, render)];
  }, []);
  const result = _.flatten(processedData);
  return _.join(result, '\n');
};
export default render;
