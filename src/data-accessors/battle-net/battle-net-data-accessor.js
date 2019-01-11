const httpCommunicator = require('../../communicators/http/http-communicator');

class BattleNetDataAccessor {
    getGuildMembers() {
        return new Promise((resolve, reject) => {
            this._getAccessToken().then(accessToken => {
                let url = `https://us.api.blizzard.com/wow/guild/malganis/cinder%20and%20ash?fields=members`;
                let headers = {'Authorization': `Bearer ${accessToken}`};

                httpCommunicator.get(url, headers).then(result => {
                    resolve(result);
                }).catch(() => {
                    reject();
                })
            });

        });
    }

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
}

module.exports = new BattleNetDataAccessor();
