'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const _ = require('lodash')
const favicon = require('serve-favicon');
const path = require('path')
const startSockets = require('./sockLogic.js');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = http.createServer(app).listen(8000);

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

var port = process.env.PORT || 1337;

app.use('/', express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));


var httpsServer = https.createServer(options, app).listen(port);

startSockets(server);
