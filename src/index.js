const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('nodeMsg [options]')
  .option('l', {
    alias: 'location',
    describe: '指定位置的气温与天气',
    default: 'guangdong/guangzhou'
  })
  .alias('v', 'version')
  .version()
  .help()
  .argv;

const server = new Server(argv);
new Promise(async function (resolve, reject) {
  await server.getInfo();
  resolve();
}).then(() => {
  server.send();
});
