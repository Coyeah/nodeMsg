const superagent = require('superagent');
const cheerio = require('cheerio');

const conf = require('./config/defaultConfig');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  getForecast() {
    let {conf} = this;
    return new Promise(function (resolve, reject) {
      superagent
        .get(`https://tianqi.moji.com/weather/china/${conf.location}`)
        .end((err, res) => {
          if (err) return null;
          let $ = cheerio.load(res.text);
          let target = $('.forecast .days')[0];
          let obj = {
            weather: $(target).find('li')[1].children[2].data.replace(/(^\s*)|(\s*$)/g, ""),
            temp: $(target).find('li')[2].children[0].data,
          }
          resolve(obj);
        });
    });
  }

  getAphorism()  {
    return new Promise(function (resolve, reject) {
      superagent
        .get('http://wufazhuce.com/')
        .end((err, res) => {
          if (err) return null;
          let $ = cheerio.load(res.text);
          let target = $('#carousel-one .carousel-inner .item')[0];
          let obj = {
            imgUrl: $(target).find('.fp-one-imagen').attr('src'),
            type: $(target).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
            text: $(target).find('.fp-one-cita a').text().replace(/(^\s*)|(\s*$)/g, ""),
          }
          resolve(obj);
        });
    });
  }

  start() {
    Promise.all([this.getForecast(), this.getAphorism()]).then((values) => {
      console.log(values);
    })
  }
}

module.exports = Server;
