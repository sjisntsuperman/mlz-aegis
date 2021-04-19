import mq from 'axon';
import { Logger } from '@nestjs/common';
import { config } from '../configs/mq.config';

const dispatcher = mq.socket('pub');
const acceptor = mq.socket('pull');
const dispatcherPort = config.dispatcher.port;
const dispatcherAddress = config.dispatcher.address;
const acceptorPort = config.acceptor.port;
const acceptorAddress = config.acceptor.address;

acceptor[acceptor.bindSync ? 'bindSync' : 'bind'](
  'tcp://' + acceptorAddress + ':' + acceptorPort,
);

dispatcher[acceptor.bindSync ? 'bindSync' : 'bind'](
  'tcp://' + dispatcherAddress + ':' + dispatcherPort,
);

acceptor.on('message', function (data) {
  Logger.debug(data.toString());
  dispatcher.send(data);
});

Logger.log('start aegis-mq success. ');
