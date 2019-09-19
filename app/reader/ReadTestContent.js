/* eslint-disable global-require */
const cli = require('../Cli');

let testFile = '';

function setTestPath(testFilePath) {
  // eslint-disable-next-line import/no-dynamic-require
  testFile = require(testFilePath);
}
function getTestPath() {
  return testFile;
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
function getParameters(componentId) {

  return componentId.parameters;
}

// from the common tests file
function getRequestType(component) {
  let requestType = '';
  requestType = component.method;
  return requestType;
}

function getBody(componentId) {
  let body = '';
  testFile.endpoints.forEach((element) => {
    if (element.id === componentId) {
      // eslint-disable-next-line prefer-destructuring
      body = element.body;
    }
  });
  return body;
}

function getAssertions(config, componentId) {
  const filePath = `${process.cwd()}${config.assertionsPath}${componentId}.js`;
  // eslint-disable-next-line import/no-dynamic-require
  const assertions = require(filePath);
  return assertions;
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
