import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAST from './ASTBuilder';
import getRender from './formatters/renders';

export default (path1, path2, format) => {
  const type = path.extname(path1);
  const parse = getParser(type);
  const currentRender = getRender(format);

  const objBefore = parse(fs.readFileSync(path1, 'utf8'));
  const objAfter = parse(fs.readFileSync(path2, 'utf8'));


  const ast = buildAST(objBefore, objAfter);

  return currentRender(ast);
};
