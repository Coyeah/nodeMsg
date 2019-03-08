const schedule = require('node-schedule');

function timer (cron, job) {
  if (cron === '') {
    job();
  }
  let time = cron.replace(/\-/g, ' ');
  if (!verify(time)) return console.error('Please use cron style');
  let work = schedule.scheduleJob(time, () => {
    job();
  });
}

function verify (cron) {
  let array = cron.split(' ');
  if (array.length !== 6) return false;
  return true;
}

module.exports = timer;
