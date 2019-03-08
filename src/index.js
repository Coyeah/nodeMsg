const yargs = require('yargs');
const Server = require('./app');
const timer = require('./utils/timer');

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
  .option('k', {
    alias: 'keep',
    describe: '定时发送（Cron风格定时器）',
    default: ''
  })
  .alias('v', 'version')
  .version()
  .help()
  .argv;

const server = new Server(argv);
timer(argv.keep, () => {
  new Promise(async function (resolve, reject) {
    await server.getInfo();
    setTimeout(() => {
      resolve();
    }, 5000);
  }).then(() => {
    server.send();
  });
})
