'use strict';
const {stdout, stderr} = process;
const {readFileSync, existsSync} = require('fs');
const {performTail} = require('./src/tailLib');

const main = function () {
  const [, , ...userArgs] = process.argv;
  const tail = performTail(readFileSync, existsSync, userArgs);
  stdout.write(tail.result);
  stderr.write(tail.error);
};

main();

