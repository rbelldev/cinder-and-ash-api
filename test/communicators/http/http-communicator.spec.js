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
        it('should return the data from the request', async () => {
            let expectedData = 'expected data';
            let httpResponse = {other: 'This should not be included', data: expectedData};
            let url = 'http://api.com/resource';

            td.when(mockAxios.get(url, td.matchers.anything())).thenResolve(httpResponse);

            let data = await httpCommunicator.get(url);
            expect(data).to.equal(expectedData)
        });

        it('should set headers', async () => {
            let expectedHeaders = {'key': 'value', 'next-key': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.get(td.matchers.anything(), configCaptor.capture())).thenResolve({});

            await httpCommunicator.get('url', expectedHeaders);

            expect(configCaptor.value.headers).to.equal(expectedHeaders);
        });
    });

    describe("post(:url, :data, :headers, :auth)", () => {
        it('should return the data from the request', async () => {
            let expectedResponseData = 'expected data';
            let httpResponse = {other: 'This should not be included', data: expectedResponseData};
            let url = 'http://api.com/resource';

            td.when(mockAxios.post(url, td.matchers.anything(), td.matchers.anything())).thenResolve(httpResponse);

            let data = await httpCommunicator.post(url);

            expect(data).to.equal(expectedResponseData)
        });

        it('should set request data', async () => {
            let expectedRequestDataToStringify = {'key': 'value', 'next-key': 'next-value'};
            let expectedRequestData = 'data as a string';
            td.when(mockQueryString.stringify(expectedRequestDataToStringify)).thenReturn(expectedRequestData);

            let requestDataCaptor = td.matchers.captor();
            td.when(mockAxios.post(td.matchers.anything(), requestDataCaptor.capture(), td.matchers.anything())).thenResolve({});

            await httpCommunicator.post('url', expectedRequestDataToStringify);
            expect(requestDataCaptor.value).to.equal(expectedRequestData);
        });

        it('should set headers', async () => {
            let expectedHeaders = {'key': 'value', 'next-key': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.post(td.matchers.anything(), td.matchers.anything(), configCaptor.capture())).thenResolve({});

            await httpCommunicator.post('url', null, expectedHeaders);

            expect(configCaptor.value.headers).to.equal(expectedHeaders);
        });

        it('should set basic authorization', async () => {
            let expectedAuth = {'username': 'value', 'password': 'next-value'};
            let configCaptor = td.matchers.captor();

            td.when(mockAxios.post(td.matchers.anything(), td.matchers.anything(), configCaptor.capture())).thenResolve({});

            await httpCommunicator.post('url', null, null, expectedAuth);
            
            expect(configCaptor.value.auth).to.equal(expectedAuth);
        });
    });
});
