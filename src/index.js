import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import ASTBuilder from './testAST';
import render from './testRend';


export default (path1, path2) => {
  const type = path.extname(path1);
  const parse = getParser(type);
  const objBefore = parse(fs.readFileSync(path1, 'utf8'));
  const objAfter = parse(fs.readFileSync(path2, 'utf8'));


  const ast = ASTBuilder(objBefore, objAfter);

  return render(ast);
};
