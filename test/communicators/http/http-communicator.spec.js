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
            let expectedData = 'expected data';
            let httpResponse = {other: 'This should not be included', data: expectedData};
            let url = 'http://api.com/resource';

            td.when(mockAxios.get(url, td.matchers.anything())).thenResolve(httpResponse);

            return httpCommunicator.get(url).then((data) => {
                expect(data).to.equal(expectedData)
            })
        });

        it('should set headers if present', () => {
            let expectedHeaders = {'key': 'value', 'next-key': 'next-value'};
            let headerCaptor = td.matchers.captor();

            td.when(mockAxios.get(td.matchers.anything(), headerCaptor.capture())).thenResolve({});

            return httpCommunicator.get('url', expectedHeaders).then(() => {
                expect(headerCaptor.value.headers).to.equal(expectedHeaders);
            })
        })
    });
});
