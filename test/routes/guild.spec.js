const td = require('testdouble');

describe('GET /guild/members', () => {
    let guildRoutes;
    let mockBattleNetDataAccessor;
    let mockGuildDataTranslator;

    beforeEach(() => {
        mockBattleNetDataAccessor = td.replace('../../src/data-accessors/battle-net/battle-net-data-accessor');
        mockGuildDataTranslator = td.replace('../../src/data-translators/battle-net/guild-data-translator');
        guildRoutes = require('../../src/routes/guild');
    });

    it('should return the translated guild member list', (done) => {
        let expectedRawGuildJson = JSON.stringify({'some': 'json'});
        td.when(mockBattleNetDataAccessor.getGuildMembers()).thenResolve(expectedRawGuildJson);

        let expectedTranslatedMemberList = {members: []};
        td.when(mockGuildDataTranslator.translate(expectedRawGuildJson)).thenResolve(expectedTranslatedMemberList);

        let mockResponse = td.object({send: td.function()});
        guildRoutes.getMembers(null, mockResponse);

        setTimeout(() => {
            td.verify(mockResponse.send(expectedTranslatedMemberList));
            done();
        }, 100);
    })
});
