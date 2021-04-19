import * as axon from 'axon';
import { config } from '../../configs/config.development';
import map from 'map-stream';

const client = axon.socket('sub');
const address = config.acceptor.address;
const port = config.acceptor.port;

/**
 * acceptor
 * 客户端
 */
export const acceptor = () => {
  const stream = map(function (data, fn) {
    fn(null, data);
  });
  client.connect('tcp://' + address + port);
  // client.subscribe(service+'*')
  client.on('data', function (data) {
    stream.write(data);
  });
  return stream;
};
