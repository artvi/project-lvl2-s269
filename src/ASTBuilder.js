import _ from 'lodash';

const actions = [
  {
    type: 'nested',
    check: (key, objB, objA) => _.isPlainObject(objB[key]) && _.isPlainObject(objA[key]),
    process: (key, objB, objA, f) => ({ children: f(objB[key], objA[key]) }),
  },
  {
    type: 'unchanged',
    check: (key, objB, objA) => objB[key] === objA[key],
    process: (key, objB) => ({ value: objB[key] }),
  },
  {
    type: 'deleted',
    check: (key, objB, objA) => !_.has(objA, key),
    process: (key, objB) => ({ value: objB[key] }),
  },
  {
    type: 'inserted',
    check: (key, objB) => !_.has(objB, key),
    process: (key, objB, objA) => ({ value: objA[key] }),
  },
  {
    type: 'modified',
    check: (key, objB, objA) => !(_.isEqual(objB[key], objA[key])),
    process: (key, objB, objA) => ({ valueBefore: objB[key], valueAfter: objA[key] }),
  }];

const buildAST = (objBefore, objAfter) => {
  const keys = _.union(_.keys(objBefore), _.keys(objAfter));

  const result = keys.map((key) => {
    const { type, process } =
      _.find(actions, e => e.check(key, objBefore, objAfter));
    const processedData = process(key, objBefore, objAfter, buildAST);
    return { key, type, ...processedData };
  });
  return result;
};
export default buildAST;
