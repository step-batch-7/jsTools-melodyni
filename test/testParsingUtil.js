"use strict";
const assert = require("chai").assert;
const { parseOption } = require("../src/parsingUtil");

describe("parseOption", () => {
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
  it("should give option -r userOption is -r", () => {
    assert.deepStrictEqual(parseOption(["-r", "filename"]), {
      option: "-r",
      tailLength: NaN
    });
  });

  it("should give errorMsg for illegal option", () => {
    const msg = `tail: illegal option -- -g\n`;
    const usage = `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
    const expected = { errorMsg: msg + usage };
    assert.deepStrictEqual(parseOption(["-g", "4", "filename"]), expected);
  });

  it("should give errorMsg for non integral tailLength", () => {
    const expected = { errorMsg: `tail: illegal offset -- 4.4` };
    assert.deepStrictEqual(parseOption(["-n", "4.4", "filename"]), expected);
  });
});
