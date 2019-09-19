/* eslint-disable import/no-dynamic-require */

const {
  describe, it, before, after,
} = require('mocha');
const { expect } = require('chai');
const sender = require('../sender/RequestSender');
const create = require('../builder/BuildRequest');
const reader = require('../reader/ReadTestContent');
const verify = require('../utils/TestHelper');
const Config = require('../reader/ConfigReader');
const cli = require('../Cli');

const config = new Config();
const configValues = require(`${process.cwd()}/${
  cli.getOptions().configuration
}`);

config.set(configValues);
reader.setTestPath(`${process.cwd()}/${cli.getOptions().endpoints}`);

const tests = reader.getTestPath().endpoints;

tests.forEach(async (test) => {
  let response = {};
  let endpoint = '';
  let assertions = {};
  endpoint = create.createRequestEndpoint(test);
  assertions = reader.getAssertions(config.get(), test.id);
  function getResponse() {
    return async () => {
      response = await sender.sendRequest(
        reader.getRequestType(test),
        endpoint,
        reader.getBody(test.id),
        reader.getToken(config.get()),
      );
    };
  }

  await describe(`${test.id} - Response validation`, async () => {
    before(getResponse());
    if (assertions.statusCode) {
      it(`${test.id} : response code should be ${assertions.statusCode}`, () => {
        expect(response.statusCode).to.eql(assertions.statusCode);
      });
    }

    Object.entries(assertions.equals).forEach(([key, value]) => {
      it(`${test.id} : ${key} equals ${value}`, () => {
        verify.equals(response.body, key, value);
      });
    });

    if (Object.entries(assertions.deepEquals).length > 0) {
      Object.entries(assertions.deepEquals).forEach(([key, value]) => {
        it(`${test.id} : ${key} deep equals expected`, () => {
          verify.deepEquals(response.body, key, value);
        });
      });
    }
    after(() => {
      // eslint-disable-next-line no-console
      console.log(`Tests complete for ${test.id}`);
    });
  });
});
