#!/usr/bin/env node

import program from 'commander';
import findDiffBetweenTwoFiles from '..';

program
  .version('0.1.4a')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .action((b, a) => {
    console.log(findDiffBetweenTwoFiles(b, a));
  })
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
