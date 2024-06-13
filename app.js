var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var app = express();
const session = require("express-session");
const sessionStore = require("./db/session");
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(methodOverride("_method"));

// 미들웨어를 추가하여 모든 요청에서 세션 값을 콘솔에 출력
app.use((req, res, next) => {
  next();
});

// 프록시 미들웨어 설정
app.use('/api', createProxyMiddleware({
  target: 'https://api.kr.omnicommerce.ai',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // URL에서 /api 부분을 제거
  },
}));

// 홈페이지
var homeRouter = require('./routes/home');
// 옷 추천 페이지
var recommendWearRouter = require('./routes/recommendWear')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret : "sessionkey",
  resave : false,
  saveUninitialized:true,
  store: sessionStore
}));

// 미들웨어를 추가하여 모든 요청에서 세션 값을 콘솔에 출력
app.use((req, res, next) => {
  res.locals.user_id = "";
  if (req.session.uid) {
    res.locals.user_id = req.session.uid;
    console.log('현재 세션 값:', req.session.uid);
    console.log('현재 로컬 세션', res.locals.user_id);
  }
  next();
});

app.use('/', homeRouter);
app.use('/recommendWear', recommendWearRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
