'use strict';
const assert = require('chai').assert;
const sinon = require('sinon');
const {
  performTail,
  parser,
  validateParsedArgs,
  selectBottomN
} = require('../src/tailLib');

describe('selectBottomN', () => {
  it('should select bottom N lines of given file if file is present', () => {
    const readFile = function (path, code) {
      assert.strictEqual(path, 'one.txt');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn';
    };
    const doesFileExists = function (path) {
      assert.strictEqual(path, 'one.txt');
      return true;
    };
    const parsedArgs = {option: '-n', lineLength: 6, files: ['one.txt']};
    const actual = selectBottomN(readFile, doesFileExists, parsedArgs);
    const expected = {result: 'ii\njj\nkk\nll\nmm\nnn', error: ''};
    assert.deepStrictEqual(actual, expected);
  });
  it('should five error if given file is not present', () => {
    const readFile = function (path, code) {
      assert.strictEqual(path, 'one.txt');
      assert.strictEqual(code, 'utf8');
      return '';
    };
    const doesFileExists = function (path) {
      assert.strictEqual(path, 'one.txt');
      return false;
    };
    const parsedArgs = {option: '-n', lineLength: 6, files: ['one.txt']};
    const actual = selectBottomN(readFile, doesFileExists, parsedArgs);
    const expected = {result: '', error: 'tail: one.txt: No such file or directory'};
    assert.deepStrictEqual(actual, expected);
  });

});

describe('parser', () => {
  it('should parse args as option, lineLength and files if present ', () => {
    const args = ['-n', '3', 'one.txt'];
    const context = {option: '-n', lineLength: 10, files: []};
    const actual = args.reduce(parser, context);
    const expected = {
      option: '-n',
      lineLength: 3,
      files: ['one.txt'],
      previousArg: undefined
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse args as default values if option are not present', () => {
    const args = ['a.txt', 'b.txt'];
    const context = {option: '-n', lineLength: 10, files: []};
    const actual = args.reduce(parser, context);
    const expected = {option: '-n', lineLength: 10, files: ['a.txt', 'b.txt']};
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse args if nothing is given as arguments', () => {
    const args = [];
    const context = {option: '-n', lineLength: 10, files: []};
    const actual = args.reduce(parser, context);
    const expected = {option: '-n', lineLength: 10, files: []};
    assert.deepStrictEqual(actual, expected);
  });

});

describe('validateParsedArgs', () => {
  it('should not give error if option and lineLength are valid', () => {
    const parsedArgs = {option: '-n', lineLength: 10, files: ['a.txt']};
    const actual = validateParsedArgs(parsedArgs);
    assert.deepStrictEqual(actual, {error: undefined});
  });
  it('should give illegalOptionError if option is not valid', () => {
    const parsedArgs = {option: '-g', lineLength: 10, files: ['a.txt']};
    const actual = validateParsedArgs(parsedArgs);
    const msg = 'tail: illegal option -- -g\n';
    const usage =
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const expected = {error: msg + usage};
    assert.deepStrictEqual(actual, expected);
  });
  it('should give illegalOffsetError if offset is not valid', () => {
    const parsedArgs = {option: '-n', lineLength: 7.7, files: ['a.txt']};
    const actual = validateParsedArgs(parsedArgs);
    const expected = {error: 'tail: illegal offset -- 7.7'};
    assert.deepStrictEqual(actual, expected);
  });
});

describe('performTail', () => {
  it('should give tail of given content (for default options)', () => {
    const userArgs = ['filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn\n';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: 'ff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn\n',
      error: ''
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give object having error for file that doesn\'t exist', () => {
    const userArgs = ['filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return false;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: '',
      error: 'tail: filename: No such file or directory'
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give tail of given length', () => {
    const userArgs = ['-n', '3', 'filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: 'dd\nee\nff',
      error: ''
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give object having error for invalid offset', () => {
    const userArgs = ['-n', '4.67', 'filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: '',
      error: 'tail: illegal offset -- 4.67'
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give whole content if tailLength & content are equal', () => {
    const userArgs = ['-n', '6', 'filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: 'aa\nbb\ncc\ndd\nee\nff',
      error: ''
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give whole content if tailLength is more than content', () => {
    const userArgs = ['-n', '20', 'filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const expected = {
      result: 'aa\nbb\ncc\ndd\nee\nff',
      error: ''
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give object having error for invalid option', () => {
    const userArgs = ['-g', '4', 'filename'];
    const readFile = function (path, code) {
      assert.strictEqual(path, 'filename');
      assert.strictEqual(code, 'utf8');
      return 'aa\nbb\ncc\ndd\nee\nff\ngg\nhh\nii\njj\nkk\nll\nmm\nnn';
    };
    const existFile = function (path) {
      assert.strictEqual(path, 'filename');
      return true;
    };
    const actual = performTail(readFile, existFile, userArgs);
    const msg = 'tail: illegal option -- -g\n';
    const usage =
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const expected = {
      result: '',
      error: msg + usage
    };
    assert.deepStrictEqual(actual, expected);
  });
});
