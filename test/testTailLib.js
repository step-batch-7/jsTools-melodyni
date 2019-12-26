"use strict";
const assert = require("chai").assert;
const { selectLastN, performTail, reverseIt } = require("../src/tailLib");

describe("performTail", () => {
  it("should give tail of given content (for default options)", () => {
    const userArgs = ["filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn\n";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "ff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn\n",
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give object having error for file that doesn't exist", () => {
    const userArgs = ["filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return false;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "",
      error: `tail: filename: No such file or directory`
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give tail of given length", () => {
    const userArgs = ["-n", "3", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "dd\nee\nff",
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give object having error for invalid offset", () => {
    const userArgs = ["-n", "4.67", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "",
      error: `tail: illegal offset -- 4.67`
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give whole content if tail length is equal to the content lines", () => {
    const userArgs = ["-n", "6", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "aa\nbb\ncc\ndd\nee\nff",
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give whole content if tail length is greater than content lines", () => {
    const userArgs = ["-n", "20", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "aa\nbb\ncc\ndd\nee\nff",
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give reverse content for option -r", () => {
    const userArgs = ["-r", "20", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "one\ntwo\nthree\nfour\nfive";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: "five\nfour\nthree\ntwo\none",
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give object having error for invalid option", () => {
    const userArgs = ["-g", "4", "filename"];
    const readFile = function(path, code) {
      assert.strictEqual(path, "filename");
      assert.strictEqual(code, "utf8");
      return "aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn";
    };
    const existFile = function(path) {
      assert.strictEqual(path, "filename");
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const msg = `tail: illegal option -- -g\n`;
    const usage = `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
    const expected = {
      result: "",
      error: msg + usage
    };
    assert.deepStrictEqual(actual, expected);
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
