/* eslint-disable global-require */
const cli = require('../cli');

let testsDirectory = '';

function setTestPath(testFilePath) {
  // eslint-disable-next-line import/no-dynamic-require
  testsDirectory = testFilePath;
}

function getTestPath() {
  return testsDirectory;
}

// from config
function getEnv(config) {
  const env = cli.getOptions().environment;
  let result = null;
  let environments;
  if (env !== '') {
    environments = config.envDetails;
    environments.forEach((element) => {
      if (element.name === env) {
        result = element.baseUrl;
      }
    });
  } else {
    throw Error('No Environment specified');
  }
  return result;
}
// from config
function getToken(config) {
  const env = cli.getOptions().environment;
  let result = null;
  let environments;
  if (env !== '') {
    environments = config.envDetails;
    environments.forEach((element) => {
      if (element.name === env) {
        result = element.token;
      }
    });
  } else {
    throw Error('No Token Specified');
  }
  return result;
}

// from the common tests file
function getParameters(obj) {
  return obj.endpoint.parameters;
}

// from the common tests file
function getRequestType(obj) {
  return obj.endpoint.method;
}

function getBody(obj) {
  return obj.endpoint.body;
}

function getAssertions(obj) {
  return obj.assertions;
}

module.exports = {
  getEnv,
  getToken,
  getParameters,
  getRequestType,
  getAssertions,
  setTestPath,
  getTestPath,
  getBody,
};
