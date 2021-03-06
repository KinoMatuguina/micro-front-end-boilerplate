/**
* development.js
*/

module.exports = {
  PORT: 4000,
  NODE_ENV: 'development',
  APP_CONTEXT: 'dashboard',
  CONSUL_HOST: '10.6.82.142',
  APIHOST: 'http://10.6.82.142',
  FILEUPLOAD_HOST: 'http://10.6.82.142:8086',
  LOGOUT_REDIR: '/login/',
  AUTH_ERR_REDIR: '/login/',
  BABEL_DISABLE_CACHE: 1,
  SECURITY_LEVEL: 'LOW',
  REDIS_HOST: '192.168.1.248',
  REDIS_PORT: 6379,
  EXPRESS_SESSION_SECRET: '10qpalzm',
  EXPRESS_SESSION_NAME: 'express.sid',
  TIMEOUT: 300
};
