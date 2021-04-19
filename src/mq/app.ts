import mq from 'axon';

const log4js = require('log4js'),
  logger = log4js.getLogger();

import path from 'path';

const argv = process.argv.slice(2);

if (argv.indexOf('--debug') >= 0) {
  logger.level = 'DEBUG';
} else {
  logger.lever = 'INFO';
}

if (argv.indexOf('--project') >= 0) {
  global.pjconfig = require(path.join(__dirname, 'project.debug.json'));
} else {
  global.pjconfig = require(path.join(__dirname, 'project.json'));
}

const dispatcher = mq.socket('pub');
const acceptor = mq.socket('pull');
const dispatcherPort = global.pjconfig.dispatcher.port;
const dispatcherAddress = global.pjconfig.dispatcher.address;
const acceptorPort = global.pjconfig.acceptor.port;
const acceptorAddress = global.pjconfig.acceptor.address;

acceptor[acceptor.bindSync ? 'bindSync' : 'bind'](
  'tcp://' + acceptorAddress + ':' + acceptorPort,
);

dispatcher[acceptor.bindSync ? 'bindSync' : 'bind'](
  'tcp://' + dispatcherAddress + ':' + dispatcherPort,
);

acceptor.on('message', function (data) {
  logger.debug(data.toString());
  dispatcher.send(data);
});

logger.info('start aegis-mq success. ');
