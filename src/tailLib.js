"use strict";

const { isFilePresent, readFromFile } = require("./fileUtil");
const { parseOption } = require("./parsingUtil");
const { sendErrorMsg } = require("./errorHandling");

const parseUserArgs = function(userArgs) {
  const optionField = parseOption(userArgs);
  const parsedArgs = {
    filePath: userArgs.slice(-1)[0],
    option: optionField.option,
    tailLength: optionField.tailLength
  };
  return parsedArgs;
};

const loadFile = function(fileAction) {
  if (isFilePresent(fileAction)) {
    return readFromFile(fileAction);
  }
  sendErrorMsg(`tail: ${fileAction.path}: No such file or directory`);
};

const selectLastN = function(chunks, tailLength) {
  return chunks.slice(-tailLength);
};

const reverseIt = function(content) {
  return content.reverse();
};

const performTail = function(content, parsedArgs) {
  const tasks = { "-n": selectLastN, "-r": reverseIt };
  const chunks = content.split("\n");
  const option = parsedArgs.option;
  return tasks[option](chunks, parsedArgs.tailLength);
};

module.exports = {
  parseUserArgs,
  performTail,
  selectLastN,
  reverseIt,
  loadFile
};
