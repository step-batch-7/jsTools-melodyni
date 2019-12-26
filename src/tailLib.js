"use strict";

const { parseOption } = require("./parsingUtil");

const selectLastN = function(content, tailLength) {
  return content.slice(-tailLength);
};

const getIllegalFileMsg = function(filename) {
  return `tail: ${filename}: No such file or directory`;
};

const reverse = content => content.reverse();

const performTail = function(readFile, doesFileExist, userArgs) {
  const filename = userArgs.slice(-1)[0];
  const actions = {
    "-n": selectLastN,
    "-r": reverse
  };
  const { option, tailLength, errorMsg } = parseOption(userArgs);
  const action = actions[option];
  if (!action) return { result: "", error: errorMsg };
  if (doesFileExist(filename)) {
    const content = readFile(filename, "utf8").split("\n");
    const tail = action(content, tailLength).join("\n");
    return { result: tail, error: "" };
  }
  return { result: "", error: getIllegalFileMsg(filename) };
};

module.exports = {
  performTail,
  selectLastN,
  reverseIt: reverse
};
