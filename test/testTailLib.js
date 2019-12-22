"use strict";
const fs = require("fs");
const assert = require("chai").assert;
const {
  parseUserArgs,
  selectLastN,
  loadFile,
  getFileAction,
  readFromFile,
  isFilePresent
} = require("../src/tailLib");

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

describe("parseUserArgs", () => {
  it("should parse user arguments and take default values if fields are not specified", () => {
    const userArgs = ["filename"];
    const parsedArgs = {
      filePath: "filename",
      option: "-n",
      tailLength: 10
    };
    assert.deepStrictEqual(parseUserArgs(userArgs), parsedArgs);
  });
});

describe("loadFile", () => {
  it("should load the contents of file in array if file exist", () => {
    const content =
      "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven\ntwelve\nthirteen\nfourteen\nfifteen\n";
    assert.strictEqual(loadFile("sampleTextForTail.txt"), content);
  });
  it("should throw an error if file doesn't exist", () => {
    assert.throws(() => loadFile("badFile.txt"), Error);
  });
});

describe("selectLastN", () => {
  it("should select last n elements of given array", () => {
    const content = `one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven\ntwelve\nthirteen\nfourteen\nfifteen`;
    const tail = [
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen"
    ];
    assert.deepStrictEqual(selectLastN(content, 10), tail);
  });
});
