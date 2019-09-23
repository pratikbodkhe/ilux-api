module.exports = {
  id: 'get-user',
  endpoint: {
    method: 'GET',
    path: '/users/2',
    parameters: {},
    body: {},
  },
  assertions: {
    equals: {
      'data.id': 2,
      'data.email': 'janet.weaver@reqres.in',
      'data.first_name': 'Janet',
      'data.last_name': 'Weaver',
      'data.avatar':
        'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
    },
    deepEquals: {},
  },

};

