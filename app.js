const express = require('express');
const logger = require('morgan');

const corsSettings = require('./src/configuration/cors');

const warcraftLogsRouter = require('./src/routes/warcraft-logs');
const guildRouter = require('./src/routes/guild');
const raiderApplicationRouter = require('./src/routes/raider-applications');
const battleNetRouter = require('./src/routes/battle-net');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(corsSettings);

app.use('/warcraft-logs', warcraftLogsRouter.get);
app.use('/guild/members', guildRouter.getMembers);
app.use('/raider-applications', raiderApplicationRouter.post);
app.use('/battle-net/character/:realm/:characterName', battleNetRouter.character.get);

app.listen(process.env.PORT);

module.exports = app;
