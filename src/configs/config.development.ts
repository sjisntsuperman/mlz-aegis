export const config = {
  dispatcher: {
    port: 3333,
    address: 'adfadf',
  },
  acceptor: {
    port: 10000,
    address: '127.0.0.1',
    subscribe: 'aegis',
  },
  mysql: {
    url: 'mysql://root:root@localhost:3306/badjs',
  },
  mongodb: {
    url: 'mongodb://localhost:27017/badjs',
    adminUrl: 'mongodb://localhost:27017/admin',
    // limit: 500,
  },
  web: {
    port: 3000,
  },
};
