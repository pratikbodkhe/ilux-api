// superagent sender

const request = require('superagent');
const logger = require('superagent-logger');

module.exports = {
  sendRequest: async (requestType, endPoint, body, token) => {
    let result = null;
    if (requestType === 'GET') {
      result = await request
        .get(endPoint).use(logger)
        .set('device-type', 'phone')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .timeout({
          deadline: 60000,
        });
    } else if (requestType === 'POST') {
      result = await request
        .post(endPoint).use(logger)
        .set('device-type', 'phone')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .send(body)
        .timeout({
          deadline: 60000,
        });
    }
    return result;
  },
};
