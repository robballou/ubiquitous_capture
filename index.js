var fs = require('fs');
var path = require('path');
var debug = require('debug')('app:' + process.pid);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var httpsPort = 3443;

var settings = require('./settings');
app.locals.settings = settings;

var collector = require('./lib/collector');
collector.app = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  return res.status(200).json({message: 'boosh'});
});

app.post('/', function(req, res) {
  var message = collector.createMessage(req);
  collector.message(message);
  return res.status(200).json({message: 'roger that'});
});

require('https').createServer({
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.crt')),

  // at some point, I will unblock my brain from processing client certificates
  // and get this to work...
  // requestCert: true,
  // rejectUnauthorized: true,
}, app).listen(httpsPort, function() {
  debug('HTTPS Server listening on port: %s, in %s mode', httpsPort, app.get('env'));
});
