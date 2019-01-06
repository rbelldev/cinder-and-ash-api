const express = require('express');
const logger = require('morgan');

const corsSettings = require('./configuration/cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.listen(process.env.PORT || 4201);

app.use(corsSettings);

module.exports = app;
