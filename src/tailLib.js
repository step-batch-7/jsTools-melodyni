"use strict";

process.on("uncaughtException", err => {
  process.stderr.write(err.message);
  process.exit(1);
});

const { getFileAction, isFilePresent, readFromFile } = require("./fileUtil");

const parseUserArgs = function(userArgs) {
  const parsedArgs = {
    filePath: userArgs.slice(-1)[0],
    option: "-n",
    tailLength: 10
  };
  return parsedArgs;
};

const loadFile = function(path) {
  const fileAction = getFileAction(path);
  if (isFilePresent(fileAction)) {
    return readFromFile(fileAction);
  }
  throw new Error(`tail: ${path}: No such file or directory`);
};

const selectLastN = function(content, tailLength) {
  const chunks = content.split("\n");
  return chunks.slice(-tailLength);
};

module.exports = { parseUserArgs, selectLastN, loadFile };
