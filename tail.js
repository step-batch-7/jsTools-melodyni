"use strict";
process.on("uncaughtException", err => {
  console.error(err.message);
  process.exit(0);
});

const { parseUserArgs, selectLastN, loadFile } = require("./src/tailLib");
const { getFileAction } = require("./src/fileUtil");

const main = function() {
  const parsedArgs = parseUserArgs(process.argv.slice(2));
  const fileAction = getFileAction(parsedArgs.filePath);
  const content = loadFile(fileAction);
  const tail = selectLastN(content, parsedArgs.tailLength);
  console.log(tail.join("\n"));
};

main();
