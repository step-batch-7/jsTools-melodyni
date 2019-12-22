"use strict";

const parseUserArgs = function(userArgs) {
  const parsedArgs = {
    filePath: userArgs.slice(-1)[0],
    option: "-n",
    tailLength: 10
  };
  return parsedArgs;
};

module.exports = { parseUserArgs };
