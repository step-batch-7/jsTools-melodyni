"use strict";

const { parseUserArgs, performTail, loadFile } = require("./src/tailLib");
const { getFileAction } = require("./src/fileUtil");

const main = function() {
  try {
    const parsedArgs = parseUserArgs(process.argv.slice(2));
    const fileAction = getFileAction(parsedArgs.filePath);
    const content = loadFile(fileAction);
    const tail = performTail(content, parsedArgs);
    //const tail = selectLastN(content, parsedArgs.tailLength);
    console.log(tail.join("\n"));
  } catch (error) {
    console.error(error.message);
  }
};

main();
