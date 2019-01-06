const express = require('express');
const logger = require('morgan');

const corsSettings = require('./configuration/cors');

const warcraftLogsRouter = require('./routes/warcraft-logs');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(corsSettings);

app.use('/', indexRouter);
app.use('/warcraft-logs', warcraftLogsRouter.get);

app.listen(process.env.PORT);

module.exports = app;
