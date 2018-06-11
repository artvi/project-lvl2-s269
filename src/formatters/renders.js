import defaultRender from './defaultrender';
import plainRender from './plainrender';
import jsonRender from './jsonrender';

const formats = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

const getRender = (format) => {
  const currentRender = formats[format];

  if (!currentRender) {
    throw new Error(`Sorry, we don't support ${format} output yet.\nPlease, choose another format.`);
  }
  return currentRender;
};

export default getRender;
