"use strict";

const { getFsTool, doesFileExist, readFromFile } = require("./fileUtil");
const { parseOption } = require("./parsingUtil");

const selectLastN = function(content, tailLength) {
  return content.slice(-tailLength);
};

const reverseIt = function(content) {
  return content.reverse();
};

const performTail = function(readFile, fileExist, userArgs) {
  const filename = userArgs.slice(-1)[0];
  const fsTool = getFsTool(filename, readFile, fileExist);
  const action = { "-n": selectLastN, "-r": reverseIt };
  const parsedArgs = parseOption(userArgs);
  if (parsedArgs.hasOwnProperty("errorMsg")) {
    return { result: "", error: parsedArgs.errorMsg };
  }
  if (doesFileExist(fsTool)) {
    const { option, tailLength } = parsedArgs;
    const content = readFromFile(fsTool).split("\n");
    const tail = action[option](content, tailLength).join("\n");
    return { result: tail, error: "" };
  }
  return { result: "", error: `tail: ${filename}: No such file or directory` };
};

module.exports = {
  performTail,
  selectLastN,
  reverseIt
};
