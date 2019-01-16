const td = require('testdouble');
describe('PUT /raider-applications', () => {
    let mockRaiderApplicationDatabaseTableCommunicator;
    let raiderApplicationRoutes;

    beforeEach(() => {
        mockRaiderApplicationDatabaseTableCommunicator = td.replace('../../src/communicators/database-table-communicators/raider-application-database-table-communicator');
        raiderApplicationRoutes = require('../../src/routes/raider-applications');
    });

    it('should pass the raider application json to the raider application database table communicator', async () => {
        let expectedRaiderApplicationJson = {name: 'knute', class: 'monk'};
        let mockResponse = td.object({sendStatus: td.function()});
        await raiderApplicationRoutes.post({body: expectedRaiderApplicationJson}, mockResponse);

        td.verify(mockRaiderApplicationDatabaseTableCommunicator.insert(expectedRaiderApplicationJson));
    });

    it('should send status 201 if insert is successful', async () => {
        let mockResponse = td.object({sendStatus: td.function()});
        await raiderApplicationRoutes.post({body: {}}, mockResponse);

        td.verify(mockResponse.sendStatus(201));
    });

    it('should send status 500 if insert is unsuccessful', async () => {
        td.when(mockRaiderApplicationDatabaseTableCommunicator.insert(td.matchers.anything())).thenReject(null);
        let mockResponse = td.object({sendStatus: td.function()});
        await raiderApplicationRoutes.post({body: {}}, mockResponse);

        td.verify(mockResponse.sendStatus(500));
    })
});
