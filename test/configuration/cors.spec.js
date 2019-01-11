const td = require('testdouble');

describe('CORS configuration middleware', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;

    let corsMiddleware;

    beforeEach(() => {
        mockRequest = {method: undefined};
        mockResponse = td.object({header: td.function(), sendStatus: td.function()});
        mockNext = td.function();

        corsMiddleware = require('../../src/configuration/cors')
    });

    it(`should set 'Access-Control-Allow-Origin' to '*'`, () => {
        corsMiddleware(mockRequest, mockResponse, mockNext);
        td.verify(mockResponse.header('Access-Control-Allow-Origin', '*'));
    });

    it(`should set 'Access-Control-Allow-Methods' to 'GET, PUT, POST, DELETE, OPTIONS'`, () => {
        corsMiddleware(mockRequest, mockResponse, mockNext);
        td.verify(mockResponse.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'));
    });

    it(`should set 'Access-Control-Allow-Headers' to 'GET, PUT, POST, DELETE, OPTIONS'`, () => {
        corsMiddleware(mockRequest, mockResponse, mockNext);
        td.verify(mockResponse.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'));
    });

    it(`should send a 200 status if the request method is 'OPTIONS'`, () => {
        mockRequest.method = 'OPTIONS';
        corsMiddleware(mockRequest, mockResponse, mockNext);
        td.verify(mockResponse.sendStatus(200));
    });

    it(`should call next() if request method is not 'OPTIONS'`, () => {
        mockRequest.method = 'NOT OPTIONS';
        corsMiddleware(mockRequest, mockResponse, mockNext);
        td.verify(mockResponse.sendStatus(td.matchers.anything()), {times: 0});
        td.verify(mockNext());
    });
});
