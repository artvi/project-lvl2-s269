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

const render = (ast, ancestry = '') =>
  ast.reduce((acc, el) => {
    const process = renderers[el.type];
    if (!_.has(renderers, el.type)) {
      return acc;
    }
    return [...acc, process(el, ancestry, render)];
  }, []);

export default (ast) => {
  const processedData = render(ast);
  const result = _.flatten(processedData);
  return _.join(result, '\n');
};
