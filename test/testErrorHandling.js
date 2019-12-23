"use strict";

const assert = require("chai").assert;
const { sendErrorMsg } = require("../src/errorHandling");

describe("sendErrorMsg", () => {
  it("should send error msg on stderr stream", () => {
    assert.throw(() => sendErrorMsg("Got An Error"), Error);
  });
});
