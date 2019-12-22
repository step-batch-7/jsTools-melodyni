"use strict";
const fs = require("fs");

const getFileAction = function(path) {
  return {
    path,
    code: "utf8",
    reader: fs.readFileSync,
    filePresent: fs.existsSync
  };
};

const readFromFile = function(fileAction) {
  return fileAction.reader(fileAction.path, fileAction.code);
};

const isFilePresent = function(fileAction) {
  return fileAction.filePresent(fileAction.path);
};

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

module.exports = {
  parseUserArgs,
  selectLastN,
  loadFile,
  getFileAction,
  readFromFile,
  isFilePresent
};
