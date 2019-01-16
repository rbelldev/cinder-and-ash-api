const axios = require('axios');
const querystring = require('querystring');

class HttpCommunicator {
    static async get(url, headers) {
        let response = await axios.get(url, {headers: headers});
        return response.data;
    }

    static async post(url, data, headers, auth) {
        let config = {
            headers: headers,
            auth: auth
        };

        let response = await axios.post(url, querystring.stringify(data), config);
        return response.data;
    }
}

module.exports = HttpCommunicator;
