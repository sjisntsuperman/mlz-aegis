import path from 'path';
import cluster from 'cluster';
import {logger} from 'utils/logger';
// 必须在 master 中执行 clusterhub 模块，才能使用 clusterhub 在 worker 间通信
import clusterhub from 'clusterhub';
import { global } from 'types/typings';
import * as envConfig from "./configs/env";
import { syncService } from "./services/sync";
import { app as worker } from "./services/worker";

// const argv = process.argv.slice(2);

// if (argv.indexOf('--debug') >= 0) {
logger.level = 'DEBUG';
global.debug = true;
// } else {
//   logger.level = 'INFO';
// }

// if (argv.indexOf('--project') >= 0) {
global.pjconfig = envConfig;
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

  syncService(clusters);
} else {
  // worker;
}
