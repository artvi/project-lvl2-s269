#!/usr/bin/env node

import program from 'commander';
import diffFinder from '..';

program
  .version('0.0.1d')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .action((b, a) => {
    console.log(diffFinder(b, a));
  })
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
