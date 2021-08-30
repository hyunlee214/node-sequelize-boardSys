"use strict";

const createError       = require('http-errors');
const express           = require('express');
const path              = require('path');
const cookieParser      = require('cookie-parser');
const logger            = require('morgan');
const methodOverride    = require('method-override');
const models            = require('./models/index.js');
const session           = require('express-session');

const indexRouter       = require('./routes/index');
const usersRouter       = require('./routes/users');
const fileUploadRouter  = require('./routes/upload');          // multer모듈 사용

const app = express();

models.sequelize.sync().then(() => {
  console.log('db연결성공');
}).catch(err => {
  console.log('db연결실패');
  console.log(err);
})


// view engine setup
app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge: 24000 * 60 * 60 
  }
}))
  .use(express.static(path.join(__dirname, 'public')))
  .use(methodOverride('_method'));


app
  .use('/', indexRouter)
  .use('/user', usersRouter)
// multer모듈 사용 - 파일 업로드
  .use('/upload', fileUploadRouter)             
  .use('/upload', express.static('uploads'));       // '/upload' 가상 경로 설정

// catch 404 and forward to error handler
app
  .use(function(req, res, next) {
  next(createError(404));
});

// error handler
app
  .use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
