const superagent = require('superagent');
const cheerio = require('cheerio');

const defaultConfig = require('./config/defaultConfig');
const send = require('./utils/send');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, defaultConfig, config);
    if (config.to) {
      this.conf.mail.to = config.to;
    }
  }

  getForecast() {
    let {conf} = this;
    return new Promise(function (resolve, reject) {
      superagent
        .get(`https://tianqi.moji.com/weather/china/${conf.location}`)
        .end((err, res) => {
          if (err) {
            reject(err);
            return null;
          }
          let $ = cheerio.load(res.text);
          let target = $('.forecast .days')[0];
          let obj = {
            weather: $(target).find('li')[1].children[2].data.replace(/(^\s*)|(\s*$)/g, ""),
            temp: $(target).find('li')[2].children[0].data,
            tips: $('.wea_tips em').text(),
            location: conf.location,
          }
          console.log('Forecast:\n', obj);
          resolve(obj);
        });
    });
  }

  getAphorism()  {
    return new Promise(function (resolve, reject) {
      superagent
        .get('http://wufazhuce.com/')
        .end((err, res) => {
          if (err) {
            reject(err);
            return null;
          }
          let $ = cheerio.load(res.text);
          let target = $('#carousel-one .carousel-inner .item')[0];
          let obj = {
            imgUrl: $(target).find('.fp-one-imagen').attr('src'),
            type: $(target).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
            text: $(target).find('.fp-one-cita a').text().replace(/(^\s*)|(\s*$)/g, ""),
          }
          console.log('Aphorism:\n', obj);
          resolve(obj);
        });
    });
  }

  async getInfo() {
    let that = this;
    await Promise.all([this.getForecast(), this.getAphorism()]).then((values) => {
      that.forecast = values[0];
      that.aphorism = values[1];
    }).catch((err) => {
      console.log(err);
    });
  }

  send() {
    send(this.conf, {
      info: {
        ...this.forecast,
        ...this.aphorism,
      }
    });
  }

  start() {
    console.log(this.forecast, this.aphorism);
  }
}

module.exports = Server;
