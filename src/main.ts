import process from 'child_process';
import path from 'path';

const args = ['--debug', '--project'];
// var args = []

console.log('========  aegis-acceptor ===========');
process.fork(path.join(__dirname, 'acceptor', 'app.js'), args);

setTimeout(function () {
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('========== mq =========');
  process.fork(path.join(__dirname, 'mq', 'app.js'), args);
}, 2000);

setTimeout(function () {
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('========= storage ==========');
  process.fork(path.join(__dirname, 'storage', 'app.js'), args);
}, 4000);

setTimeout(function () {
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('========== web =========');
  process.fork(path.join(__dirname, 'web', 'app.js'), args);
}, 6000);
