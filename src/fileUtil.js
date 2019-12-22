"use strict";

const fs = require("fs");

const getFileAction = function(path) {
  return {
    path,
    code: "utf8",
    reader: fs.readFileSync,
    filePresent: fs.existsSync
  };
};

const readFromFile = function(fileAction) {
  return fileAction.reader(fileAction.path, fileAction.code);
};

const isFilePresent = function(fileAction) {
  return fileAction.filePresent(fileAction.path);
};

module.exports = { getFileAction, readFromFile, isFilePresent };
