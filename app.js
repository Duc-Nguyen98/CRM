const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const moment = require('moment');
const cron = require('node-cron');
const shell = require('shelljs');
const fileUpload = require('express-fileupload')



const indexRouter = require('./routes/index');
const app = express();


// !setup connect to MongoDB
mongoose.connect(`mongodb+srv://admin:admin@cluster0.ilkgc.mongodb.net/crm_demo?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// !setup fileUpload
app.use(fileUpload())


// !setup body-parser 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

// !setup layouts ejs 
app.use(expressLayouts);
app.set('layout','layout');

// console.log(moment(Date.now()).format('DD-MM-YYYY'))
// !setup moment format date
app.locals.moment = moment; // this makes moment available as a variable in every EJS page

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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


// !Debug send Mail
// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
//   if(shell.exec("node cronSchedule/hello.js").code !== 0){
//     console.log('something went wrong !');
//   }
// });

module.exports = app;
