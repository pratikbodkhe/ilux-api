
const reader = require('../reader/ReadTestContent');
const ConfigLoader = require('../reader/ConfigReader');


function createRequestEndpoint(obj) {
  const config = new ConfigLoader().get();
  let endpoint = '';
  const parameters = reader.getParameters(obj);
  let queryParams = '';
  // read and append the parameters to the end
  if (parameters !== {}) {
    queryParams += ('?');
    Object.keys(parameters).forEach((key) => {
      queryParams += `${key}=`;
      parameters[key].forEach((query) => {
        queryParams += query;
        queryParams += ',';
      });
    });
  }
  queryParams = queryParams.substring(0, queryParams.length - 1);

  endpoint = `${reader.getEnv(config)}${config.basePath}${obj.endpoint.path}${queryParams}`;
  return endpoint;
}

module.exports = { createRequestEndpoint };
