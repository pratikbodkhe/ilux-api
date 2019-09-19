#!/usr/bin/env node
const requestSender = require('./app/sender/requestSender');

require('./app/cli').cli(process.argv);

module.exports = { requestSender };

