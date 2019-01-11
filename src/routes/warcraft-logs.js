const warcraftLogsDataAccessor = require('../data-accessors/warcraft-logs/warcraft-logs-data-accessor');

let get = function (request, response) {
    warcraftLogsDataAccessor.getGuildLogs().then((result) => {
        response.send(result)
    }).catch(() => {
        response.sendStatus(500);
    });
};

module.exports = {get: get};
