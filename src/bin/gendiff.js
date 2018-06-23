#!/usr/bin/env node

import program from 'commander';
import findDiffBetweenTwoFiles from '..';

program
  .version('0.2.2')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'output format: plain|json', 'tree')
  .action((b, a, cmd) => {
    console.log(findDiffBetweenTwoFiles(b, a, cmd.format));
  });

program.parse(process.argv);
