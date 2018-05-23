/**
* production.js
*/
module.exports = {
  PORT: 3331,
  NODE_ENV: 'production',
  APP_CONTEXT: 'dashboard',
  CONSUL_HOST: '172.17.0.1',
  APIHOST: 'http://172.17.0.1',
  FILEUPLOAD_HOST: 'http://172.17.0.1:8086/',
  LOGOUT_REDIR: '/login/',
  AUTH_ERR_REDIR: '/login/',
  BABEL_DISABLE_CACHE: 1,
  SECURITY_LEVEL: 'LOW',
  REDIS_HOST: '172.17.0.1',
  REDIS_PORT: 6379,
  EXPRESS_SESSION_SECRET: '10qpalzm',
  EXPRESS_SESSION_NAME: 'express.sid',
  TIMEOUT: 300
};
