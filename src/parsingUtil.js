"use strict";

const isAnOption = function(symbol) {
  return symbol === "-";
};

const parseOption = function(userArgs) {
  const validOptions = ["-n"];
  const userOption = userArgs[0];
  if (isAnOption(userOption[0])) {
    if (validOptions.includes(userOption)) {
      return { option: userOption, tailLength: +userArgs[1] };
    }
    throw new Error(`tail: illegal option -- ${userOption}`);
  }
  return { option: "-n", tailLength: 10 };
};
module.exports = { parseOption };
