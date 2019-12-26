"use strict";

const isAnOption = function(symbol) {
  return symbol === "-";
};

const isValidOption = function(userOption) {
  const validOptions = ["-n", "-r"];
  return validOptions.includes(userOption);
};

const isValidLength = function(userTailLength) {
  return Number.isInteger(userTailLength);
};

const getIllegalOptionMsg = function(option) {
  const msg = `tail: illegal option -- ${option}\n`;
  const usage = `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
  return msg + usage;
};

const getIllegalOffsetMsg = function(offset) {
  return `tail: illegal offset -- ${offset}`;
};

const parseOption = function(userArgs) {
  const userOption = userArgs[0];
  const userTailLength = +userArgs[1];
  if (!isAnOption(userOption[0])) {
    return { option: "-n", tailLength: 10 };
  }
  if (!isValidOption(userOption)) {
    return { errorMsg: getIllegalOptionMsg(userOption) };
  }
  if (!(userOption === "-r") && !isValidLength(userTailLength)) {
    return { errorMsg: getIllegalOffsetMsg(userTailLength) };
  }
  return { option: userOption, tailLength: userTailLength };
};

module.exports = { parseOption };
