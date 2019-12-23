"use strict";

const sendErrorMsg = function(message) {
  throw new Error(message);
};
module.exports = { sendErrorMsg };
