var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var app = express();

// view engine setup
// 기본 path를 SPA/views로 지정함
// view의 engine은 ejs로 설정함
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser('first project SPA')); // 암호화 키 추가
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false, // session의 내용 변경이 없더라도 저장을 할것인가?
  secret: 'first project SPA', // 필수적으로 넣어야하며, 위의 cookieParser의 인자와 같은 값을 넣어야함
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

// localhost:3000/'첫번째인자'가 url로 들어온다면
// require안의 인자로 routing을 시켜줌 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/search', require('./routes/search'));

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
