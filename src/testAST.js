import _ from 'lodash';

const actions = [
  {
    type: 'hasChildren',
    check: (key, objB, objA) => _.isPlainObject(objB[key]) && _.isPlainObject(objA[key]),
    process: (key, objB, objA, ASTBuilder) => ({
      state: {
        stateBefore: objB[key],
        stateAfter: objA[key],
      },
      children: ASTBuilder(objB[key], objA[key]),
    }),
  },
  {
    type: 'unchanged',
    check: (key, objB, objA) => objB[key] === objA[key],
    process: (key, objB) => ({
      state: objB[key],
    }),
  },
  {
    type: 'deleted',
    check: (key, objB, objA) => !_.has(objA, key),
    process: (key, objB) => ({
      state: objB[key],
    }),
  },
  {
    type: 'inserted',
    check: (key, objB) => !_.has(objB, key),
    process: (key, objB, objA) => ({
      state: objA[key],
    }),
  },
  {
    type: 'modified',
    check: (key, objB, objA) => !(_.isEqual(objB[key], objA[key])),
    process: (key, objB, objA) => ({
      state: {
        before: objB[key],
        after: objA[key],
      },
    }),
  }];

const ASTBuilder = (objBefore, objAfter) => {
  const keys = _.union(_.keys(objBefore), _.keys(objAfter));

  const result = keys.map((key) => {
    const { type, process } =
      _.find(actions, e => e.check(key, objBefore, objAfter));
    const { state, children = [] } = process(key, objBefore, objAfter, ASTBuilder);
    return {
      key, type, state, children,
    };
  });
  return result;
};
export default ASTBuilder;
