const arg = require('arg');
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

let options;
const mocha = new Mocha({
  ui: 'bdd',
  colors: true,
  timeout: 60000,
});


module.exports = {
  getOptions() {
    return options;
  },
  cli(args) {
    options = parseArgumentsIntoOptions(args);
    runTests(options);
  },
};


function parseArgumentsIntoOptions(rawArgs) {
  const defaultTestDir = 'bin/tests/';
  const defaultTests = 'test/example/tests';
  const defaultConfiguration = 'test/example/config.js';
  const args = arg(
    {
      '--config': String,
      '--env': String,
      '--testDir': String,
      '--tests': String,
      '-c': '--config',
      '-e': '--env',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    environment: args['--env'] || 'dev',
    configuration: args['--config'] || defaultConfiguration,
    testDir: args['--testDir'] || defaultTestDir,
    endpoints: args['--tests'] || defaultTests,
  };
}

function runTests() {
  const { testDir } = options;

  fs.readdirSync(testDir)
    .filter(file =>
      file.substr(-3) === '.js')
    .forEach((file) => {
      mocha.addFile(path.join(testDir, file));
    });

  // Run the tests.
  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });
}
