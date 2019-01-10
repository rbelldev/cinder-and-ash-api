const td = require('testdouble');
const expect = require('chai').expect;

describe('Battle Net Data Accessor', () => {
    let battleNetDataAccessor;
    let mockHttpCommunicator;

    beforeEach(() => {
        process.env.BATTLE_NET_API_CLIENT_ID = 'expectedApiClientId';
        process.env.BATTLE_NET_API_CLIENT_SECRET = 'expectedApiClientSecret';
        mockHttpCommunicator = td.replace('../../../communicators/http/http-communicator');
        battleNetDataAccessor = require('../../../data-accessors/battle-net/battle-net-data-accessor');
    });

    afterEach(() => {
        process.env.BATTLE_NET_API_CLIENT_ID = undefined;
        process.env.BATTLE_NET_API_CLIENT_SECRET = undefined;
    });

    describe('_getAccessToken()', () => {
        it('should return the token from the post result', () => {
            let expectedToken = 'expected token';

            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve(expectedToken);

            return battleNetDataAccessor._getAccessToken().then(acutalToken => {
                expect(acutalToken).to.equal(expectedToken);
            });
        });

        it('should use the correct url', () => {
            let expectedUrl = `https://us.battle.net/oauth/token`;
            let urlCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(urlCaptor.capture(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve({});

            return battleNetDataAccessor._getAccessToken().then(() => {
                expect(urlCaptor.value).to.equal(expectedUrl);
            });
        });

        it('should pass the correct data object', () => {
            let expectedData = {'grant_type': 'client_credentials'};
            let dataCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), dataCaptor.capture(), td.matchers.anything(), td.matchers.anything())).thenResolve({});

            return battleNetDataAccessor._getAccessToken().then(() => {
                expect(dataCaptor.value).to.deep.equal(expectedData);
            });
        });

        it('should pass the correct headers', () => {
            let expectedHeaders = null;
            let headerCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), headerCaptor.capture(), td.matchers.anything())).thenResolve({});

            return battleNetDataAccessor._getAccessToken().then(() => {
                expect(headerCaptor.value).to.deep.equal(expectedHeaders);
            });
        });

        it('should pass the correct auth object', () => {
            let expectedAuth = {
                username: process.env.BATTLE_NET_API_CLIENT_ID,
                password: process.env.BATTLE_NET_API_CLIENT_SECRET
            };
            let authCaptor = td.matchers.captor();

            td.when(mockHttpCommunicator.post(td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), authCaptor.capture())).thenResolve({});

            return battleNetDataAccessor._getAccessToken().then(() => {
                expect(authCaptor.value).to.deep.equal(expectedAuth);
            });
        });
    });
});
