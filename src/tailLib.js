const selectBottomN = function (readFile, doesFileExist, parsedOptions) {
  const {lineLength, files} = parsedOptions;
  if (!doesFileExist(files[0])) {
    return {
      result: '',
      error: `tail: ${files[0]}: No such file or directory`
    };
  }
  const content = readFile(files[0], 'utf8').split('\n');
  return {result: content.slice(-lineLength).join('\n'), error: ''};
};

const updateLineLength = function (parsedArg, arg) {
  parsedArg[parsedArg.previousArg] = +arg;
  parsedArg.previousArg = undefined;
  return parsedArg;
};

const updateOption = function (parsedArg, arg) {
  const optionNames = {'-n': 'lineLength'};
  parsedArg.option = arg;
  parsedArg.previousArg = optionNames[arg];
  return parsedArg;
};

const parser = function (parsedArg, arg) {
  if (parsedArg.previousArg) {
    return updateLineLength(parsedArg, arg);
  }
  if (arg.startsWith('-')) {
    return updateOption(parsedArg, arg);
  }
  parsedArg.files.push(arg);
  return parsedArg;
};

const isOptionValid = function (userOption) {
  const validOptions = ['-n'];
  return validOptions.some((option) => option === userOption);
};

const isOffsetValid = function (offset) {
  return Number.isInteger(offset);
};

const validateParsedArgs = function (parsedArgs) {
  const {option, lineLength} = parsedArgs;
  let errorMsg;
  if (!isOffsetValid(lineLength)) {
    errorMsg = `tail: illegal offset -- ${lineLength}`;
  }
  if (!isOptionValid(option)) {
    const msg = `tail: illegal option -- ${option}\n`;
    const usage =
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    errorMsg = msg + usage;
  }
  return {error: errorMsg};
};

const performTail = function (readFile, doesFileExist, userArgs) {
  const parsedFields = {option: '-n', lineLength: 10, files: []};
  const parsedOptions = userArgs.reduce(parser, parsedFields);
  const validatedArgs = validateParsedArgs(parsedOptions);
  if (validatedArgs.error) {
    return {result: '', error: validatedArgs.error};
  }
  return selectBottomN(readFile, doesFileExist, parsedOptions);
};

module.exports = {performTail, parser, validateParsedArgs, selectBottomN};
