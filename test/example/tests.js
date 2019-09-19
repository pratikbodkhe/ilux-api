
module.exports = {
  id: 'api-test-example',
  description: 'This contains a list of endpoints to be hit',
  endpoints: [
    {
      id: 'single-user',
      method: 'GET',
      path: '/users/2',
      parameters: {},
      body: {},
    },
    {
      id: 'create-user',
      method: 'POST',
      path: '/users',
      parameters: {},
      body: {
        name: 'morpheus',
        job: 'leader',
      },
    },
  ],
};
