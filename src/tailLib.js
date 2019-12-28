"use strict";

const isValidLength = function(tailLength) {
  return Number.isInteger(tailLength);
};

const getIllegalOptionMsg = function(option) {
  const msg = `tail: illegal option -- ${option}\n`;
  const usage = `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
  return msg + usage;
};

const getIllegalOffsetMsg = function(offset) {
  return `tail: illegal offset -- ${offset}`;
};

const getIllegalFileMsg = function(filename) {
  return `tail: ${filename}: No such file or directory`;
};

const validateArgs = function(option, tailLength) {
  if (!(option === "-n")) {
    return { errorMsg: getIllegalOptionMsg(option) };
  }
  if (!isValidLength(tailLength)) {
    return { errorMsg: getIllegalOffsetMsg(tailLength) };
  }
  return {};
};

const parseOption = function(userArgs) {
  const args = userArgs;
  const filename = args.pop();
  return {
    filename,
    option: args[0] || "-n",
    tailLength: +args[1] || 10
  };
};

const performTail = function(readFile, doesFileExist, userArgs) {
  const { filename, option, tailLength } = parseOption(userArgs);
  const { errorMsg } = validateArgs(option, tailLength);
  if (errorMsg) return { result: "", error: errorMsg };
  if (!doesFileExist(filename)) {
    return { result: "", error: getIllegalFileMsg(filename) };
  }
  const content = readFile(filename, "utf8").split("\n");
  const tail = content.slice(-tailLength).join("\n");
  return { result: tail, error: "" };
};

module.exports = { performTail, validateArgs };
