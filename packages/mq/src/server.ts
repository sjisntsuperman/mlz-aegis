'use strict';

var log4js = require('log4js'),
  logger = log4js.getLogger();

export interface Global {
  pjconfig: any;
}

declare var global: Global;

// var path = require('path');

// var argv = process.argv.slice(2);

// if (argv.indexOf('--debug') >= 0) {
logger.level = 'DEBUG';
// } else {
//   logger.lever = 'INFO';
// }

global.pjconfig = require('./config/server.config');

// if (argv.indexOf('--project') >= 0) {
//   global.pjconfig = require(path.join(__dirname, 'project.debug.json'));
// } else {
//   global.pjconfig = require(path.join(__dirname, 'project.json'));
// }

var mq = require('axon');
var dispatcher = mq.socket('pub');
var acceptor = mq.socket('pull');
var dispatcherPort = global.pjconfig.dispatcher.port;
var dispatcherAddress = global.pjconfig.dispatcher.address;
var acceptorPort = global.pjconfig.acceptor.port;
var acceptorAddress = global.pjconfig.acceptor.address;

acceptor[acceptor.bindSync ? 'bindSync' : 'bind']('tcp://' + acceptorAddress + ':' + acceptorPort);

dispatcher[acceptor.bindSync ? 'bindSync' : 'bind'](
  'tcp://' + dispatcherAddress + ':' + dispatcherPort
);

acceptor.on('message', function (data: any) {
  logger.debug(data.toString());
  dispatcher.send(data);
});

logger.info('start aegis-mq success. ');
