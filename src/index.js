const yargs = require('yargs');
const Server = require('./app');
var schedule = require('node-schedule');

const argv = yargs
  .usage('nodeMsg [options]')
  .option('l', {
    alias: 'location',
    describe: '指定位置的气温与天气',
    default: 'guangdong/guangzhou'
  })
  .option('t', {
    alias: 'to',
    describe: '发送至指定邮箱',
  })
  .option('n', {
    alias: 'now',
    describe: '立即发送',
    type: 'boolean',
    default: false,
    demand: true,
  })
  .alias('v', 'version')
  .version()
  .help()
  .argv;

const server = new Server(argv);
if (argv.now) {
  new Promise(async function (resolve, reject) {
    await server.getInfo();
    setTimeout(() => {
      resolve();
    }, 5000);
  }).then(() => {
    server.send();
  });
} else {
  let timer = schedule.scheduleJob('* 30 6 * * *', function () {
    new Promise(async function (resolve, reject) {
      await server.getInfo();
      setTimeout(() => {
        resolve();
      }, 5000);
    }).then(() => {
      server.send();
    });
  });
}
