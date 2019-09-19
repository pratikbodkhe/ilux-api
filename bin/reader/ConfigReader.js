const Config = function () {};
let config = {};

Config.prototype.set = function (configuration) {
  config = configuration;
};

Config.prototype.get = function () {
  return config;
};

module.exports = Config;
