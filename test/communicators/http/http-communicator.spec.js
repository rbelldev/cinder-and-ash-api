const td = require('testdouble');
const expect = require('chai').expect;

describe('HTTP Communicator', () => {
    let httpCommunicator;
    let mockAxios;
    let mockQueryString;

    beforeEach(() => {
        mockAxios = td.replace('axios');
        mockQueryString = td.replace('querystring');
        httpCommunicator = require('../../../src/communicators/http/http-communicator');
    });

    describe("get(:url, :headers)", () => {
        it('should return the data from the request', () => {
            let expectedData = 'expected data';
            let httpResponse = {other: 'This should not be included', data: expectedData};
            let url = 'http://api.com/resource';

            td.when(mockAxios.get(url, td.matchers.anything())).thenResolve(httpResponse);

            return httpCommunicator.get(url).then((data) => {
                expect(data).to.equal(expectedData)
            });
        });

        it('should set headers', () => {
            let expectedHeaders = {'key': 'value', 'next-key': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.get(td.matchers.anything(), configCaptor.capture())).thenResolve({});

            return httpCommunicator.get('url', expectedHeaders).then(() => {
                expect(configCaptor.value.headers).to.equal(expectedHeaders);
            });
        });
    });

    describe("post(:url, :data, :headers, :auth)", () => {
        it('should return the data from the request', () => {
            let expectedResponseData = 'expected data';
            let httpResponse = {other: 'This should not be included', data: expectedResponseData};
            let url = 'http://api.com/resource';

            td.when(mockAxios.post(url, td.matchers.anything(), td.matchers.anything())).thenResolve(httpResponse);

            return httpCommunicator.post(url).then((data) => {
                expect(data).to.equal(expectedResponseData)
            });
        });

        it('should set request data', () => {
            let expectedRequestDataToStringify = {'key': 'value', 'next-key': 'next-value'};
            let expectedRequestData = 'data as a string';
            td.when(mockQueryString.stringify(expectedRequestDataToStringify)).thenReturn(expectedRequestData);

            let requestDataCaptor = td.matchers.captor();
            td.when(mockAxios.post(td.matchers.anything(), requestDataCaptor.capture(), td.matchers.anything())).thenResolve({});

            return httpCommunicator.post('url', expectedRequestDataToStringify).then(() => {
                expect(requestDataCaptor.value).to.equal(expectedRequestData);
            });
        });

        it('should set headers', () => {
            let expectedHeaders = {'key': 'value', 'next-key': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.post(td.matchers.anything(), td.matchers.anything(), configCaptor.capture())).thenResolve({});

            return httpCommunicator.post('url', null, expectedHeaders).then(() => {
                expect(configCaptor.value.headers).to.equal(expectedHeaders);
            });
        });

        it('should set basic authorization', () => {
            let expectedAuth = {'username': 'value', 'password': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.post(td.matchers.anything(), td.matchers.anything(), configCaptor.capture())).thenResolve({});

            return httpCommunicator.post('url', null, null, expectedAuth).then(() => {
                expect(configCaptor.value.auth).to.equal(expectedAuth);
            });
        });
    });
});
