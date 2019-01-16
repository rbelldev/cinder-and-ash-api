const warcraftLogsDataAccessor = require('../data-accessors/warcraft-logs/warcraft-logs-data-accessor');

let get = async function (request, response) {
    try {
        let guildLogs = await warcraftLogsDataAccessor.getGuildLogs();
        response.send(guildLogs)
    } catch (e) {
        console.error(e);
        response.sendStatus(500)
    }
};

module.exports = {get: get};
