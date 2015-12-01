//mongo
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var teams = require('./routes/teams');

var app = express();

app.locals.siteTile = "Halo Scrims";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/teams', teams);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Halo API

var API_KEY = require('./keys/halo5');
var HaloAPI = require('haloapi');
var h5 = new HaloAPI(API_KEY);

// h5.metadata.weapons().then(function (weapons) {
//     weapons.forEach(function (weapon) {
//         console.log(weapon.name, '\n\t', weapon.description);
//     });
// });

/*
h5.stats.playerMatches({
    player: "Norwegian Sven",
    mode: "arena",
    start: 0 ,
    count: 5
  }).then(function (data) {
      // success, iterate through your matches
      console.log(data);
      fs.writeFile('./sven-matches.json', JSON.stringify(data));
  })
  .catch(function (error) {
      // uh oh, handle error here.
  });


  h5.stats.arenaMatchById("1ad1cdec-a86a-4e2c-94d5-cab180b55eea")
    .then(function (match) {
        console.log(match.TeamStats);
        fs.writeFile('./team-stats.json', JSON.stringify(match));
    });

*/
// h5.profile.emblemImage("Norwegian Sven").then(function (url) {
//     console.log(url);
// });

module.exports = app;
