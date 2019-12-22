"use strict";
const assert = require("chai").assert;
const { parseUserArgs, selectLastN, loadFile } = require("../src/tailLib");

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
      "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven\ntwelve\nthirteen\nfourteen\nfifteen";
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
