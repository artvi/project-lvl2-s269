import tree from './tree';
import plain from './plain';
import json from './json';

const formats = {
  tree,
  plain,
  json,
};

const getRender = (format) => {
  const currentRender = formats[format];

  if (!currentRender) {
    throw new Error(`Sorry, we don't support ${format} output yet.\nPlease, choose another format.`);
  }
  return currentRender;
};

export default getRender;
