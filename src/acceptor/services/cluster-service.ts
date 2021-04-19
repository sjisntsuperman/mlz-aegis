import * as cluster from 'cluster';
import { Injectable } from '@nestjs/common';
import * as os from 'os';

const cpus = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: () => void): void {
    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < cpus; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
