"use strict";
const fs = require("fs");
const assert = require("chai").assert;
const {
  getFileAction,
  readFromFile,
  isFilePresent
} = require("../src/fileUtil");

describe("getFileAction", () => {
  it("should give an object of filePath,encoding,reader,filePresent", () => {
    const expected = {
      path: "filePath",
      code: "utf8",
      reader: fs.readFileSync,
      filePresent: fs.existsSync
    };
    assert.deepStrictEqual(getFileAction("filePath"), expected);
  });
});

describe("readFromFile", () => {
  it("should give content of file if present", () => {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "Got FileContent";
    };
    const fileAction = {
      path: "path",
      code: "utf8",
      reader: readFile
    };
    assert.strictEqual(readFromFile(fileAction), "Got FileContent");
  });
});

describe("isFilePresent", () => {
  it("should give true if file is present", () => {
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileAction = {
      path: "path",
      code: "utf8",
      filePresent: existFile
    };
    assert.isTrue(isFilePresent(fileAction));
  });
  it("should give false if file is not present", () => {
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fileAction = {
      path: "path",
      code: "utf8",
      filePresent: existFile
    };
    assert.isFalse(isFilePresent(fileAction));
  });
});
