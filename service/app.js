
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nextConf = require('./next');
var home = require('./routes/index.js');

var { log4js } = require('./log4');

require('dotenv').config()

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// nextjs 添加 assetPrefix 后，需要代理文件
app.use('/beauty/_next/static', express.static('.next/static'));

// 日志输出
app.use(log4js.connectLogger(log4js.getLogger('access'), { 'level': log4js.levels.INFO }));

app.use('/', home);

app.use(function(req, res, next) {
  nextConf.handle(req, res)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
