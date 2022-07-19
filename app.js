const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use((request, response, next) => {
  console.log('request.cookies', request.cookies);
  const username = request.cookies.username;
  response.locals.loggedInUserName = username || '';
  next();
});

const baseRouter = require('./routes/baseRouter');
app.use('/', baseRouter);

const clucksRouter = require('./routes/clucksRouter');
app.use('/clucks', clucksRouter);

const PORT = 3500;
const ADDRESS = 'localhost'; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});