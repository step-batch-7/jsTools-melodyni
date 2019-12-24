"use strict";
const assert = require("chai").assert;
const {
  parseUserArgs,
  selectLastN,
  performTail,
  loadFile,
  reverseIt
} = require("../src/tailLib");

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
  it("should parse user arguments and take values that are specified", () => {
    const userArgs = ["-n", "5", "filename"];
    const parsedArgs = {
      filePath: "filename",
      option: "-n",
      tailLength: 5
    };
    assert.deepStrictEqual(parseUserArgs(userArgs), parsedArgs);
  });
});

describe("loadFile", () => {
  it("should load the contents of file in array if file exist", () => {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "one\ntwo\nthree\nfour\nfive";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileAction = {
      path: "path",
      code: "utf8",
      reader: readFile,
      filePresent: existFile
    };
    assert.strictEqual(loadFile(fileAction), "one\ntwo\nthree\nfour\nfive");
  });

  it("should throw an error if file doesn't exist", () => {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "one\ntwo\nthree\nfour\nfive";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fileAction = {
      path: "path",
      code: "utf8",
      reader: readFile,
      filePresent: existFile
    };
    assert.throws(() => loadFile(fileAction), Error);
  });
});

describe("performTail", () => {
  it("should give tail of given content (for default options)", () => {
    const content =
      "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven\ntwelve";
    const parsedArgs = {
      filePath: "filename",
      option: "-n",
      tailLength: 10
    };
    const expected = [
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve"
    ];
    assert.deepStrictEqual(performTail(content, parsedArgs), expected);
  });
  it("should give whole content if tail length is equal to the content lines", () => {
    const content = "one\ntwo\nthree\nfour\nfive\nsix\nseven";
    const parsedArgs = {
      filePath: "filename",
      option: "-n",
      tailLength: 7
    };
    const expected = ["one", "two", "three", "four", "five", "six", "seven"];
    assert.deepStrictEqual(performTail(content, parsedArgs), expected);
  });
  it("should give whole content if tail length is greater than content lines", () => {
    const content = "one\ntwo\nthree\nfour\nfive\nsix\nseven";
    const parsedArgs = {
      filePath: "filename",
      option: "-n",
      tailLength: 50
    };
    const expected = ["one", "two", "three", "four", "five", "six", "seven"];
    assert.deepStrictEqual(performTail(content, parsedArgs), expected);
  });
  it("should give reverse content for option -r", () => {
    const content = "one\ntwo\nthree\nfour\nfive";
    const parsedArgs = {
      filePath: "filename",
      option: "-r",
      tailLength: NaN
    };
    const expected = ["five", "four", "three", "two", "one"];
    assert.deepStrictEqual(performTail(content, parsedArgs), expected);
  });
});
describe("reverseIt", () => {
  it("should reverse the elements of array", () => {
    const content = ["one", "two", "three", "four", "five"];
    const reversedContent = ["five", "four", "three", "two", "one"];
    assert.deepStrictEqual(reverseIt(content), reversedContent);
  });
});

describe("selectLastN", () => {
  it("should select last n elements of given array", () => {
    const content = [
      "one",
      "two",
      "three",
      "four",
      "five",
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
