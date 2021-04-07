/* global process, global, GLOBAL */
const path = require('path');
const cluster = require('cluster');
const logger = require('utils/logger');
// 必须在 master 中执行 clusterhub 模块，才能使用 clusterhub 在 worker 间通信
require('clusterhub');

declare global {}
export interface Global1 {
  pjconfig: any;
  debug: any;
}
declare var global: Global1;

// const argv = process.argv.slice(2);

// if (argv.indexOf('--debug') >= 0) {
logger.level = 'DEBUG';
global.debug = true;
// } else {
//   logger.level = 'INFO';
// }

// if (argv.indexOf('--project') >= 0) {
global.pjconfig = require('./config/server.config');
// } else {
//   global.pjconfig = require(path.join(__dirname, 'project.json'));
// }

if (cluster.isMaster) {
  const clusters = [];
  // Fork workers.
  for (let i = 0; i < 4; i++) {
    const forkCluster = cluster.fork();
    clusters.push(forkCluster);
  }

  require('./service/syncService')(clusters);
} else {
  require('./service/worker');
}
