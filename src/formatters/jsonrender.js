

const valueRender = (value, type) => {
  if (value instanceof Object) {
    const keys = Object.keys(value);
    return keys.reduce((acc, el) => ({ ...acc, [el]: { type, value: value[el] } }), {});
  }
  return value;
};

const renderers = {
  nested: (el, func) => ({ [el.key]: { type: el.type, value: func(el.children) } }),

  modified: el => ({ [el.key]: { type: el.type, from: el.valueBefore, to: el.valueAfter } }),

  deleted: el => ({ [el.key]: { type: el.type, value: valueRender(el.value, el.type) } }),

  inserted: el => ({ [el.key]: { type: el.type, value: valueRender(el.value, el.type) } }),

  unchanged: el => ({ [el.key]: { type: el.type, value: valueRender(el.value, el.type) } }),
};

const render = (ast) => {
  const processedData = ast.reduce((acc, el) => {
    const currentRender = renderers[el.type];
    if (!currentRender) {
      return acc;
    }
    return { ...acc, ...currentRender(el, render) };
  }, {});
  return processedData;
};

export default ast => JSON.stringify(render(ast));
