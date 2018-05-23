/**
* {{ properCase name }}Middleware.js
*/

'use strict';

import ServerConfig from '../config/ServerConfig';
import rp from 'request-promise';
var { LOGGER } = require('../utils/ServerLogger.js');

const {{ properCase name }}Middleware = function(req, res, next) {
  //Callback function go here
  let {{serverObjName}} = ServerConfig.serverApiEndpoints.{{serverObjName}}

  let options = {
      method: req.method,
      uri: {{serverObjName}},
      body: req.body,
      resolveWithFullResponse: true,
      json: true
    };

  console.log(options.uri)
  console.log(options.body)

  rp(options)
    .then(function (response) {
      res.send(response.body);
    })
    .catch(function (err) {
      LOGGER.error("Error requiring server: \n " + err);
      res.send(err);
    });
}


export default {{ properCase name }}Middleware;
