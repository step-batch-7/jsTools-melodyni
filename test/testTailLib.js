"use strict";
const assert = require("chai").assert;

const { parseUserArgs, loadFile, selectLastN } = require("../src/tailLib");

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
