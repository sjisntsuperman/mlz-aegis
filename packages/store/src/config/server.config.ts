module.exports = {
  mongodb: {
    url: 'mongodb://localhost:27017/badjs',
    adminUrl: 'mongodb://localhost:27017/admin',
    isShard: false,
    limit: 500,
  },
  tof: 'http://xxx/sendTof',
  acceptor: {
    port: 10000,
    address: '127.0.0.1',
    subscribe: 'aegis',
  },
  maxAge: 7,
  realTotal: 3,
  port: 9000,
};
