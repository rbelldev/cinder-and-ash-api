const td = require('testdouble');

describe('GET /warcraft-logs', () => {
    let warcraftLogsRoutes;
    let mockWarcraftLogsDataAccessor;

    beforeEach(() => {
        mockWarcraftLogsDataAccessor = td.replace('../../data-accessors/warcraft-logs/warcraft-logs-data-accessor');
        warcraftLogsRoutes = require('../../routes/warcraft-logs');
    });

    it('should respond the value from the warcraft log data accessor', async () => {
        let expectedJson = JSON.stringify({'some': 'json'});
        td.when(mockWarcraftLogsDataAccessor.getGuildLogs()).thenResolve(expectedJson);

        let mockResponse = td.object({send: td.function()});
        await warcraftLogsRoutes.get(null, mockResponse);

        td.verify(mockResponse.send(expectedJson));
    })
});
