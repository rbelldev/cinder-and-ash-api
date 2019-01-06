const axios = require('axios');

class HttpCommunicator {
    static get(url) {
        return axios.get(url)
    }
}

module.exports = HttpCommunicator;
