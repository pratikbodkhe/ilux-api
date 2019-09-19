module.exports = {
  basePath: '/api',
  testsFile: `${process.cwd()}/test/example/tests.json`,
  assertionsPath: '/test/example/assertions/',
  envDetails: [
    {
      name: 'dev',
      baseUrl: 'https://reqres.in',
      token: null,
    },
    {
      name: 'integration',
      baseUrl: 'http://localhost:3000',
      token: null,
    },
  ],
};

