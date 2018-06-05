#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1a')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
