const axios = require('axios');
const querystring = require('querystring');

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

    static post(url, data, headers, auth) {
        return new Promise(((resolve, reject) => {
            let config = {
                headers: headers,
                auth: auth
            };

            axios.post(url, querystring.stringify(data), config).then(response => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        }));
    }
}

module.exports = HttpCommunicator;
