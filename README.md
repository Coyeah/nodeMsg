# nodeMsg

给喜欢的人每天送上一份甜蜜蜜的一封信。

## 使用

### 命令行：

* **-l / --locaiton** - 配置天气预报的位置，使用拼音与‘/’分割省市。如：`guangdong/guangzhou`
* **-t / --to** - 配置对方的收件邮箱。
* **-k / --keep** - 配置定时器时间，使用Cron风格定时器，即`* * * * * *`。分别代表秒、分、时、日、月、周。

### 配置：

`src\config\defaultConfig.js`
+ **location** - 配置天气预报的位置，使用拼音与‘/’分割省市。如：`guangdong/guangzhou`
+ **service** - 配置发件邮箱的服务厂商，例如：`qq`、`gmail`、`163`等。具体查看[https://nodemailer.com/smtp/well-known/](https://nodemailer.com/smtp/well-known/)
+ **auth** - 配置邮箱账号（user）和 smtp 授权码（pass）
+ **mail** - 从你的发件邮箱（from）到对方的收件邮箱（to），配置邮件标题（subject）


## 所用类库

+ cheerio - 在服务器端生成 HTML
+ superagent - 抓取 HTML 的爬虫类库
+ yargs - 命令行工具集
+ ejs - HTML 的模板引擎
+ nodemailer - 送邮件的 Node 插件
+ node-schedule - 计时器
