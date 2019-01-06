const request = require('supertest');
const app = require('../../app');


describe('GET /', () => {
    it('should respond with a status code of 200', () => {
        return request(app)
            .get('/')
            .expect(200);
    })
});
