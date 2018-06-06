#!/usr/bin/env node

import program from 'commander';
import compareJsons from '..';

program
  .version('0.0.1e')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .action((b, a) => {
    console.log(compareJsons(b, a));
  })
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
