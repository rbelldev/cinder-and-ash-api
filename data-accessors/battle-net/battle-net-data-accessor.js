const httpCommunicator = require('../../communicators/http/http-communicator');

let battleNetDataAccessor = {
    _getAccessToken() {
        return new Promise((resolve, reject) => {
            httpCommunicator.post(`https://us.battle.net/oauth/token`,
                {'grant_type': 'client_credentials'},
                null,
                {
                    username: process.env.BATTLE_NET_API_CLIENT_ID,
                    password: process.env.BATTLE_NET_API_CLIENT_SECRET
                })
                .then((response) => {
                    resolve(response['access_token']);
                }).catch(() => {
                reject();
            })
        });
    }
};

module.exports = battleNetDataAccessor;
