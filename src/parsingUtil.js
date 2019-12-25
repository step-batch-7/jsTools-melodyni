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

const parseOption = function(userArgs) {
  const userOption = userArgs[0];
  const userTailLength = +userArgs[1];
  if (isAnOption(userOption[0])) {
    if (!isValidOption(userOption)) {
      const msg = `tail: illegal option -- ${userOption}\n`;
      const usage = `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
      return {
        errorMsg: msg + usage
      };
    }
    if (!(userOption === "-r") && !isValidLength(userTailLength)) {
      return { errorMsg: `tail: illegal offset -- ${userTailLength}` };
    }
    return { option: userOption, tailLength: userTailLength };
  }
  return { option: "-n", tailLength: 10 };
};
module.exports = { parseOption };
