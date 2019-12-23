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

const selectLastN = function(content, tailLength) {
  const chunks = content.split("\n");
  return chunks.slice(-tailLength);
};

module.exports = { parseUserArgs, selectLastN, loadFile };
