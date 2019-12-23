"use strict";
const assert = require("chai").assert;
const { parseOption } = require("../src/parsingUtil");

describe("isOptionValid", () => {
  it("should give option back if it is valid", () => {
    assert.deepStrictEqual(parseOption(["-n", "4", "filename"]), {
      option: "-n",
      tailLength: 4
    });
  });
  it("should give default option back if option is not specified", () => {
    assert.deepStrictEqual(parseOption(["filename"]), {
      option: "-n",
      tailLength: 10
    });
  });
  it("should throw error if option is wrong", () => {
    assert.throws(() => parseOption(["-g", "6", "filename"]), Error);
  });
});
