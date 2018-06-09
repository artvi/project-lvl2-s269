import _ from 'lodash';

const stringify = (state, tab) => {
  if (!(state instanceof Object)) {
    return state;
  }
  const objKeys = Object.keys(state);
  const result = objKeys.map(e => `      ${e}: ${state[e]}`);
  const str = _.join(result, '\n');
  return `{\n${tab}${str}\n${tab}  }`;
};

const tabulate = (numberOfTabs) => {
  const tab = '  ';
  let result = '';
  for (let i = 0; i < numberOfTabs; i += 1) {
    result += tab;
  }
  return result;
};


const renderers = {
  unchanged: (el, tab) => `${tab}  ${el.key}: ${stringify(el.state)}`,
  modified: (el, tab) => `${tab}+ ${el.key}: ${stringify(el.state.after, tab)}\n${tab}- ${el.key}: ${stringify(el.state.before, tab)}`,
  deleted: (el, tab) => `${tab}- ${el.key}: ${stringify(el.state, tab)}`,
  inserted: (el, tab) => `${tab}+ ${el.key}: ${stringify(el.state, tab)}`,
};

const render = (arr, numberOfTabs = 1) => {
  const tab = tabulate(numberOfTabs);
  const currentRender = type => renderers[type];

  const result = arr.map((el) => {
    if (el.type === 'hasChildren') {
      return `${tab}  ${el.key}: ${render(el.children, numberOfTabs + 2)}`;
    }
    return currentRender(el.type)(el, tab);
  });
  const str = _.join(result, '\n');
  const resTab = tabulate(numberOfTabs - 1);
  return `{\n${str}\n${resTab}}`;
};

export default render;
