"use strict";

const { parseUserArgs, selectLastN, loadFile } = require("./src/tailLib");

const main = function() {
  const parsedArgs = parseUserArgs(process.argv.slice(2));
  const content = loadFile(parsedArgs.filePath);
  const tail = selectLastN(content, parsedArgs.tailLength);
  console.log(tail.join("\n"));
};

main();
