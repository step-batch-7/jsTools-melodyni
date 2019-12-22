"use strict";
const assert = require("chai").assert;

const { parseUserArgs, selectLastN } = require("../src/tailLib");

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

describe("selectLastN", () => {
  it("should select last n elements of given array", () => {
    const allLines = [
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
    assert.deepStrictEqual(selectLastN(allLines, 10), tail);
  });
});
