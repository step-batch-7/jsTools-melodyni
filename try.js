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

const main = function () {
  const context = {option: '-n', lineLength: 10, files: []};
  console.log(process.argv.slice(2).reduce(parser, context));
};
main();
