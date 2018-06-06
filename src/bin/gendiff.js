#!/usr/bin/env node

import program from 'commander';
import showDiffBetweenTwoFiles from '..';

program
  .version('0.1.2b')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .action((b, a) => {
    console.log(showDiffBetweenTwoFiles(b, a));
  })
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
