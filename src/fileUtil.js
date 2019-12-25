"use strict";

const getFsTool = function(path, readFile, fileExist) {
  return {
    path,
    code: "utf8",
    reader: readFile,
    existFile: fileExist
  };
};

const readFromFile = function(fsTool) {
  return fsTool.reader(fsTool.path, fsTool.code);
};

const doesFileExist = function(fsTool) {
  return fsTool.existFile(fsTool.path);
};

module.exports = { getFsTool, readFromFile, doesFileExist };
