/**
* ServerConfig.js
*/

import { LOGGER } from '../utils/ServerLogger';
let ENV_CONFIG;

if (process.env.NODE_ENV === 'development') {
  ENV_CONFIG = require('../../webpack-envs/development');
}

if (process.env.NODE_ENV === 'production') {
  ENV_CONFIG = require('../../webpack-envs/production');
}

if (process.env.NODE_ENV === "qa") {
  ENV_CONFIG = require('../../webpack-envs/qa');

}

LOGGER.info("ENVIRONMENT CONFIG");
LOGGER.info(ENV_CONFIG);

const NODE_ENV = process.env.NODE_ENV || ENV_CONFIG.NODE_ENV;
const host = process.env.HOST || ENV_CONFIG.HOST || '0.0.0.0';
const apiPort = process.env.APIPORT || ENV_CONFIG.APIPORT;
const port = process.env.OVERR_PORT || process.env.PORT || ENV_CONFIG.PORT;
const apiHost = process.env.APIHOST || ENV_CONFIG.APIHOST || 'http://192.168.1.249';
const fileUploadHost = process.env.FILEUPLOAD_HOST || ENV_CONFIG.FILEUPLOAD_HOST || 'http://localhost:3030';
const context = process.env.APP_CONTEXT || ENV_CONFIG.APP_CONTEXT;
const securityLevel = process.env.SECURITY_LEVEL || ENV_CONFIG.SECURITY_LEVEL || 'HIGH';
const consulHost = process.env.CONSUL_HOST || ENV_CONFIG.CONSUL_HOST || '192.168.1.163';
const consulPort = process.env.CONSUL_PORT || ENV_CONFIG.CONSUL_PORT || '8500';
const authErrorRedirect = process.env.AUTH_ERR_REDIR || ENV_CONFIG.AUTH_ERR_REDIR || '/login/';
const redisHost = process.env.OVERR_REDIS_HOST || process.env.REDIS_HOST || ENV_CONFIG.REDIS_HOST || '192.168.1.249';
const redisPort = process.env.OVERR_REDIS_PORT || process.env.REDIST_PORT || ENV_CONFIG.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD || "12(5bo_)%"+ "\\" + "6!8BF";
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET || ENV_CONFIG.EXPRESS_SESSION_SECRET || '10qpalzm';
const expressSessionName = process.env.EXPRESS_SESSION_NAME || ENV_CONFIG.EXPRESS_SESSION_NAME || 'express.sid';
const timeout = process.env.TIMEOUT || ENV_CONFIG.TIMEOUT || 300
LOGGER.info(context);

module.exports = Object.assign({
  NODE_ENV: NODE_ENV,
  host: host,
  port: port,
  apiHost: apiHost,
  fileUploadHost: fileUploadHost,
  apiPort: apiPort,
  context: context,
  securityLevel: securityLevel,
  authErrorRedirect: authErrorRedirect,
  redis: {
    host: redisHost,
    port: redisPort,
    password: redisPassword
  },
  defaultTimeout: timeout,
  expressSession: {
    secret: expressSessionSecret,
    name: expressSessionName
  },
  defaultTimeout: timeout,
  consul: {
    enabled: true,
    host: consulHost,
    port: consulPort,
    promisify: true,
    keys: {
      globalMenu: 'config/application/global-menu',
      account: 'config/application/frontend-api-host/account',
      fundtransfer: 'config/application/frontend-api-host/fundtransfer',
      fileUploadHost: 'config/application/frontend-api-host/document-service',
      timeout: 'config/application/timeout',
      version: 'config/application/version',
    }
  },
  logs: {
    defaultAjaxUrl: "/" + context + "/client.logger"
  },
  serverApiEndpoints: {
    // plop import the server config here

  },
  socketIO: {
    path: context + '/io/socket'
  },
  amqp: {
    queueName: 'frontend.queue',
    exchangeName: 'frontend.exchange',
    options: {
      host: '192.168.1.163',
      port: 5672,
      login: 'guest',
      password: 'guest',
      connectionTimeout: 10000,
      vhost: '/',
      noDelay: true,
      ssl: {
        enabled: false
      }
    }
  }
});
