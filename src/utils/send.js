const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const sender = async function (config, mail = {}) {
  let transporter = nodemailer.createTransport({
    service: config.service,
    port: 465,
    secureConnection: true,
    auth: {
      user: config.auth.user,
      pass: config.auth.pass,
    }
  });

  const template = await ejs.compile(fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'), 'utf8'));
  const html = template({
    title: config.mail.subject,
    ...mail.info,
  });

  let mailOptions = {
    ...config.mail,
    text: mail.text || '',
    html,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.error(err);
    }
    console.log('Message sent: %s', info.messageId);
  })
}

module.exports = sender;
