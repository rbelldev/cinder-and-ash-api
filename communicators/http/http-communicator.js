const axios = require('axios');

class HttpCommunicator {
    static get(url, headers) {
        return new Promise(((resolve, reject) => {
            axios.get(url, {headers: headers}).then(response => {
                resolve(response.data);
            }).catch(() => {
                reject();
            })
        }));
    }
}

module.exports = HttpCommunicator;
