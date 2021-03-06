/**
* qa.js
*/
module.exports = {
  PORT: 3231,
  NODE_ENV: 'qa',
  APP_CONTEXT: 'dashboard',
  CONSUL_HOST: '172.17.0.1',
  CONSUL_PORT: '9500',
  APIHOST: 'http://172.17.0.1',
  FILEUPLOAD_HOST: 'http://192.168.1.97:8386/',
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
