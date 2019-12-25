"use strict";
const fs = require("fs");
const assert = require("chai").assert;
const { getFsTool, readFromFile, doesFileExist } = require("../src/fileUtil");

describe("getFsTool", () => {
  it("should give an object of filePath,encoding,reader,existFile", () => {
    const expected = {
      path: "filePath",
      code: "utf8",
      reader: fs.readFileSync,
      existFile: fs.existsSync
    };
    const actual = getFsTool("filePath", fs.readFileSync, fs.existsSync);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("readFromFile", () => {
  it("should give content of file if present", () => {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "Got FileContent";
    };
    const fsTool = {
      path: "path",
      code: "utf8",
      reader: readFile
    };
    assert.strictEqual(readFromFile(fsTool), "Got FileContent");
  });
});

describe("doesFileExist", () => {
  it("should give true if file is present", () => {
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fsTool = {
      path: "path",
      code: "utf8",
      existFile: existFile
    };
    assert.isTrue(doesFileExist(fsTool));
  });
  it("should give false if file is not present", () => {
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fsTool = {
      path: "path",
      code: "utf8",
      existFile: existFile
    };
    assert.isFalse(doesFileExist(fsTool));
  });
});
