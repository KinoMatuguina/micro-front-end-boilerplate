/**
*	server.js
*/

'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { setMatchMediaConfig } from './app/utils/matchMedia';
import { fetchData } from './app/utils/fetch';
import { LOGGER, ClientLogHandler } from './app/utils/ServerLogger';
import { JL } from 'jsnlog';
import { jsnlog_nodejs } from 'jsnlog-nodejs'

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

import ServerConfig from './app/config/ServerConfig';
import routes from './app/routes';
import session from 'express-session';

import amqp from 'amqp';

import SocketIo from 'socket.io';
import socketSharedSession from 'express-socket.io-session';

import Redis from 'ioredis';
import redisSession from 'connect-redis';
import Helmet from 'react-helmet';
import consul from 'consul';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import multer from 'multer';
import winston from 'winston';
const isDeveloping = ServerConfig.NODE_ENV === 'development';
const isQa = ServerConfig.NODE_ENV === 'qa';
const isProduction = ServerConfig.NODE_ENV === 'production';

const port =  ServerConfig.port;
const appContext = ServerConfig.context;
const appHost = ServerConfig.apiHost;
const authErrorRedirect = ServerConfig.authErrorRedirect;
const app = express();

import {
	BaseMiddlewares,
	BaseStores,
	BaseStateMethods,
	BaseContext,
} from 'frontend-react-f4-base-commons';
import UrlPatterns from './app/config/UrlPatterns';


 // plop will import middleware here


const { AuthStore, UIStore } = BaseStores;
const { initStore, dehydrate} = BaseStateMethods;
const { ContextProvider } = BaseContext;

import injectState from './app/state/injectState';

global.navigator = { userAgent: 'all' };

LOGGER.info(`APPCONTEXT ${appContext}`);
//========================================================
//	some middleware setup
//========================================================

LOGGER.info('Setup Status: Middlewares');

app.use(helmet());
const ninetyDaysInSeconds = 7776000
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}))
var sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))


app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.set('view engine', 'ejs');

// file upload middleware
const uploadStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/tmp/account-opening-uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date() + "-" + file.originalname);
	}
});

const multerUpload = multer({ storage: uploadStorage });

//========================================================
//	* Shared session
//	use session middleware with redis as store
//========================================================

LOGGER.info('Setup Status: Shared session');

//const redisClient = redis.createClient(ServerConfig.redis.port, ServerConfig.redis.host);

const redis = Redis;
const redisClient = new Redis.Cluster([{
    port: ServerConfig.redis.port,          // Redis port
    host: ServerConfig.redis.host,   // Redis host
    reconnectOnError: function (err) {
      console.log('Reconnect On Error: ' + err);
      return true;
    },
    retryStrategy: function (times) {
      var delay = Math.min(times * 50, 2000);
      return delay;
    }
  }], {
    redisOptions: {
      password: ServerConfig.redis.password
    }
  });


redisClient.on('connect', function() {
    console.log('connected');
});

redisClient.on('error', function(err) {
    console.log('ERROR ON REDIS ' + err);
});


const redisStore = redisSession(session);

const appSession = session({
  secret: ServerConfig.expressSession.secret,
	name: ServerConfig.expressSession.name,
  store: new redisStore({ host: ServerConfig.redis.host, port: ServerConfig.redis.port, client: redisClient }),
  saveUninitialized: false,
  resave: false,
  cookie: { httpOnly: true }
});

// console.log(redisClient);
// console.log(appSession);

app.use(appSession);

//check if authenticated
// app.use(function(req, res, next){
// 	console.log('kino 4');
// 	LOGGER.info('Security Level: ' + ServerConfig.securityLevel);
// 	if(ServerConfig.securityLevel === 'HIGH' && !req.session.user) {
// 		res.redirect(authErrorRedirect);
// 		return;
// 	}

// 	next();
// });

//========================================================
// initialize Consul client
//========================================================


LOGGER.info('Setup Status: Consul Client');

const consulClient = consul({
	host: ServerConfig.consul.host,
	post: ServerConfig.consul.port,
	promisify: ServerConfig.consul.promisify
});

app.consulClient = consulClient;

// console.log(app.consulClient);
//========================================================
//	initialize server endpoints
//========================================================


LOGGER.info('Setup Status: Server Endpoints');

JL.setOptions({
    "defaultAjaxUrl": ServerConfig.logs.defaultAjaxUrl
});
//Client Logs endpoint
app.post('/' + appContext + '/*.logger', function (req, res) {
		LOGGER.info(req.body);
    //jsnlog_nodejs(JL, req.body);
		ClientLogHandler(LOGGER, req.body);
		// Send empty response. This is ok, because client side jsnlog does not use response from server.
    res.send('');
});

// plop will import express middleware here


//========================================================
// webpack configuration
//========================================================


LOGGER.info('Setup Status: Webpack');

if (isDeveloping) {
	LOGGER.info("Node Environment: DEVELOPMENT");
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(__dirname + '/dist'));
	app.get('*', reactRouterMiddleware);

} if (isProduction) {
	LOGGER.info("Node Environment: PRODUCTION");
  app.use('/' + appContext, express.static(__dirname + '/dist'));
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
	app.get('*', reactRouterMiddleware);
} if (isQa) {
	LOGGER.info("Node Environment: QA");
  app.use('/' + appContext, express.static(__dirname + '/dist'));
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
	app.get('*', reactRouterMiddleware);
}

// error handler
app.use(function(err, req, res, next) {
	LOGGER.error(err.stack);

	let response = { message: err.message };

	if (isDeveloping) {
		response.error = err;
	}

	res.status(500).send(response);
});

function handleRouter(req, res, props) {
  const index = path.join(__dirname + '/app', 'index');

	let user = {
		id: "kinom",
		name: "Kino Matuguina",
		username: "KINOMATUGUINA",
		invalidLogins: 0
	};

	if (req.session && req.session.user) {
		user = req.session.user;
	}

	var currentUrl = UrlPatterns.main.indexOf(req.url);
	console.log(currentUrl)
	if (currentUrl <= -1) {
		res.status(404).send('Not Found');
	} else {
		const store = initStore({
			app: { ssrLocation: req.url },
			auth: { sessionUser: user }
		}, injectState);

		fetchData(store, props.components, props.params, props.location.query)

			.then(() => setMatchMediaConfig(req))
			.then(() => renderToString(
				<ContextProvider context={{ store }}>
					<RouterContext {...props} />
				</ContextProvider>
			))
			.then((html) => {
	      res.status(200).render(index, {
					state: dehydrate(store),
					head: helmet(),
					appContext: appContext,
					root: html,
				});
	    });
	}
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
	LOGGER.error(err);

	let response = { message: err.message };

	if (isDeveloping) {
		response.error = err;
	} else {
		response.error = 'Error Encountered'
	}

  res.status(500).send(response);
}

function reactRouterMiddleware(req, res) {

	var stringURL = req.url;
	if(!(stringURL.toLowerCase().includes('%3cscript%3e') || stringURL.toLowerCase().includes('<script>'))) {
	   match({ routes, location: req.url },
		   (err, redirect, props) => {
			 if (err) handleError(res, err);
			 else if (redirect) handleRedirect(res, redirect);
			 else if (props) handleRouter(req, res, props);
			 else handleNotFound(res);
		   });
	} else {
	   handleError(res,"Not Allowed.")
	}

}

//========================================================
// start the server
//========================================================

LOGGER.info('Starting server...');

const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    LOGGER.error(err);
  }
  LOGGER.info('\n');
  LOGGER.info('||===========================================================')
  LOGGER.info('|| 🌎 Listening on port %s.', port)
  LOGGER.info('|| Open up http://0.0.0.0:%s/%s/ in your browser.', port, appContext);
  LOGGER.info('||===========================================================')
  LOGGER.info('\n');
});

//========================================================
// Socket io setup
//========================================================


LOGGER.info('Setup Status: Socket IO');

const io = new SocketIo(server)
io.use(socketSharedSession(appSession, {
	autoSave: true
}));


// const socketEvents = require('./socketIO/events')(io);

module.exports = app;
