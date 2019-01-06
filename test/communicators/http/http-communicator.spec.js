const td = require('testdouble');
const expect = require('chai').expect;

describe('HTTP Communicator', () => {
    let httpCommunicator;
    let mockAxios;

    beforeEach(() => {
        mockAxios = td.replace('axios');
        httpCommunicator = require('../../../communicators/http/http-communicator');
    });

    describe("get(url)", () => {
        it('should return the result from the request', () => {
            let expectedResponse = 'expected response';
            let url = 'http://api.com/resource';

            td.when(mockAxios.get(url)).thenResolve(expectedResponse);

            return httpCommunicator.get(url).then((actualResponse) => {
                expect(actualResponse).to.equal(expectedResponse)
            })
        })
    });
});
