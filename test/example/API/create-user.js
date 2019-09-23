module.exports = {
  id: 'create-user',
  endpoint: {
    method: 'POST',
    path: '/users',
    parameters: {},
    body: {
      name: 'morpheus',
      job: 'leader',
    },
  },
  assertions: {
    statusCode: 201,
    equals: {
      name: 'morpheus',
      job: 'leader',
    },
    deepEquals: {},
  },
};
