const td = require('testdouble');
const expect = require('chai').expect;

describe('Warcraft Logs Data Accessor', () => {
    let warcraftLogsDataAccessor;
    let mockHttpCommunicator;

    beforeEach(() => {
        process.env.WARCRAFT_LOGS_API_KEY = 'expectedApiKey';
        mockHttpCommunicator = td.replace('../../../src/communicators/http/http-communicator');
        warcraftLogsDataAccessor = require('../../../src/data-accessors/warcraft-logs/warcraft-logs-data-accessor');
    });

    afterEach(() => {
        process.env.WARCRAFT_LOGS_API_KEY = undefined;
    });

    describe('getGuildLogs()', () => {
        it('should return the result from the HttpCommunicator', async () => {
            let expectedUrl = `${'https://www.warcraftlogs.com:443/v1/reports/guild'}/${'cinder%20and%20ash'}/${`malganis`}/${'us'}?api_key=${process.env.WARCRAFT_LOGS_API_KEY}`;
            let expectedResponse = 'expected response';

            td.when(mockHttpCommunicator.get(expectedUrl)).thenResolve(expectedResponse);

            let response = await warcraftLogsDataAccessor.getGuildLogs();

            expect(response).to.equal(expectedResponse);
        })
    });
});
