var env = require('dotenv');
env.load();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app/routes/index');
var labsRouter = require('./app/routes/labs');
var gradesRouter = require('./app/routes/grades');
var studentsRouter = require('./app/routes/student');
var assessmentsRouter = require('./app/routes/assessments');
var submissionsRouter = require('./app/routes/submissions');
var commentsRouter = require('./app/routes/comments');
var UserIsAuthenticated = require('./app/middleware/UserIsAuthenticated');
var StudentIsRequired = require('./app/middleware/StudentIsRequired');
var StaffIsRequired = require('./app/middleware/StaffIsRequired');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if ('OPTIONS' === req.method) {
      res.send(200);
  } else {
    next();
  }
});

app.use('/', indexRouter);

app.use(UserIsAuthenticated, StudentIsRequired, StaffIsRequired)

app.use('/labs', labsRouter);
app.use('/grades', gradesRouter);
app.use('/students', studentsRouter);
app.use('/assessments', assessmentsRouter);
app.use('/submissions', submissionsRouter);
app.use('/', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json(err.message);
});

module.exports = app;
