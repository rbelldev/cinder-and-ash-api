const httpCommunicator = require('../../communicators/http/http-communicator');

const apiUrl = `https://www.warcraftlogs.com:443/v1/reports/guild/cinder%20and%20ash/malganis/us?api_key=${process.env.WARCRAFT_LOGS_API_KEY}`;

let warcraftLogsDataAccessor = {
    getGuildLogs() {
        return new Promise((resolve) => {
            httpCommunicator.get(apiUrl).then((response) => {
                resolve(response.data);
            })
        });
    }
};

module.exports = warcraftLogsDataAccessor;
