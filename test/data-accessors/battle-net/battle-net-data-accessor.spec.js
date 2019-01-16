const td = require('testdouble');
const expect = require('chai').expect;

describe('Battle Net Data Accessor', () => {
    let battleNetDataAccessor;
    let mockHttpCommunicator;

    beforeEach(() => {
        process.env.BATTLE_NET_API_CLIENT_ID = 'expectedApiClientId';
        process.env.BATTLE_NET_API_CLIENT_SECRET = 'expectedApiClientSecret';
        mockHttpCommunicator = td.replace('../../../src/communicators/http/http-communicator');
        battleNetDataAccessor = require('../../../src/data-accessors/battle-net/battle-net-data-accessor');
    });

    afterEach(() => {
        process.env.BATTLE_NET_API_CLIENT_ID = undefined;
        process.env.BATTLE_NET_API_CLIENT_SECRET = undefined;
    });

    describe('getGuildMembers()', () => {

        beforeEach(() => {
            battleNetDataAccessor._getAccessToken = td.function();
            td.when(battleNetDataAccessor._getAccessToken()).thenResolve('');
        });

        it('should return the result from the get request', async () => {
            let expectedResult = {'key': 'data'};
            td.when(mockHttpCommunicator.get(td.matchers.anything(), td.matchers.anything())).thenResolve(expectedResult);

            let result = await battleNetDataAccessor.getGuildMembers();

            expect(result).to.equal(expectedResult);
        });

        it('should use the correct url', async () => {
            let expectedUrl = `https://us.api.blizzard.com/wow/guild/malganis/cinder%20and%20ash?fields=members`;
            let urlCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.get(urlCaptor.capture(), td.matchers.anything())).thenResolve({});

            await battleNetDataAccessor.getGuildMembers();

            expect(urlCaptor.value).to.equal(expectedUrl);
        });

        it('should pass the correct headers', async () => {
            let expectedAccessToken = 'my access token';
            td.when(battleNetDataAccessor._getAccessToken()).thenResolve(expectedAccessToken);

            let expectedHeaders = {'Authorization': `Bearer ${expectedAccessToken}`};
            let headersCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.get(td.matchers.anything(), headersCaptor.capture())).thenResolve({});

            await battleNetDataAccessor.getGuildMembers();

            expect(headersCaptor.value).to.deep.equal(expectedHeaders);
        });
    });

    describe('getCharacter(:realm, :characterName)', () => {

        beforeEach(() => {
            battleNetDataAccessor._getAccessToken = td.function();
            td.when(battleNetDataAccessor._getAccessToken()).thenResolve('');
        });

        it('should return the result from the get request', async () => {
            let expectedResult = {'key': 'data'};
            td.when(mockHttpCommunicator.get(td.matchers.anything(), td.matchers.anything())).thenResolve(expectedResult);

            let result = await battleNetDataAccessor.getCharacter('', '');

            expect(result).to.equal(expectedResult);
        });

        it('should use the correct url', async () => {
            let expectedRealm = 'malganis';
            let expectedCharacterName = 'Knute';
            let expectedUrl = `https://us.api.blizzard.com/wow/character/${expectedRealm}/${expectedCharacterName}`;
            let urlCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.get(urlCaptor.capture(), td.matchers.anything())).thenResolve({});

            await battleNetDataAccessor.getCharacter(expectedRealm, expectedCharacterName);

            expect(urlCaptor.value).to.equal(expectedUrl);
        });

        it('should pass the correct headers', async () => {
            let expectedAccessToken = 'my access token';
            td.when(battleNetDataAccessor._getAccessToken()).thenResolve(expectedAccessToken);

            let expectedHeaders = {'Authorization': `Bearer ${expectedAccessToken}`};
            let headersCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.get(td.matchers.anything(), headersCaptor.capture())).thenResolve({});

            await battleNetDataAccessor.getCharacter('', '');

            expect(headersCaptor.value).to.deep.equal(expectedHeaders);
        });
    });

    describe('_getAccessToken()', () => {
        it('should return the token from the post result', async () => {
            let expectedToken = 'expected token';
            let postResponse = {'access_token': expectedToken};
            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve(postResponse);

            let actualToken = await battleNetDataAccessor._getAccessToken();

            expect(actualToken).to.equal(expectedToken);
        });

        it('should use the correct url', async () => {
            let expectedUrl = `https://us.battle.net/oauth/token`;
            let urlCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(urlCaptor.capture(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve({});

            await battleNetDataAccessor._getAccessToken();

            expect(urlCaptor.value).to.equal(expectedUrl);
        });

        it('should pass the correct data object', async () => {
            let expectedData = {'grant_type': 'client_credentials'};
            let dataCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), dataCaptor.capture(), td.matchers.anything(), td.matchers.anything())).thenResolve({});

            await battleNetDataAccessor._getAccessToken();

            expect(dataCaptor.value).to.deep.equal(expectedData);
        });

        it('should pass the correct headers', async () => {
            let expectedHeaders = null;
            let headerCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), headerCaptor.capture(), td.matchers.anything())).thenResolve({});

            await battleNetDataAccessor._getAccessToken();

            expect(headerCaptor.value).to.deep.equal(expectedHeaders);
        });

        it('should pass the correct auth object', async () => {
            let expectedAuth = {
                username: process.env.BATTLE_NET_API_CLIENT_ID,
                password: process.env.BATTLE_NET_API_CLIENT_SECRET
            };
            let authCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), authCaptor.capture())).thenResolve({});

            await battleNetDataAccessor._getAccessToken();

            expect(authCaptor.value).to.deep.equal(expectedAuth);
        });
    });
});
