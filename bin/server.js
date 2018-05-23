#!/usr/bin/env node
var path = require('path');
var fs = require('fs');

var babelrc;

var winston = require('winston');
var { LOGGER } = require('../app/utils/ServerLogger.js');

try {
  babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
} catch (err) {
  LOGGER.error('==>     ERROR: Error parsing your .babelrc. \n' + err);
}

try {
  require('babel-register')(babelrc);
} catch (err) {
  LOGGER.error('Error requiring babel-register: + \n' + err);
}

global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV === "development") {
  LOGGER.info('==> Running in development mode...');
} if (process.env.NODE_ENV === "qa") {
  LOGGER.info('==> Running in qa mode...');
} if (process.env.NODE_ENV === "production") {
  LOGGER.info('==> Running in production mode...');
}

try {
  require('../server.js');
} catch (err) {
  console.log(err);
  LOGGER.error("Error requiring server: \n " + err);
}
