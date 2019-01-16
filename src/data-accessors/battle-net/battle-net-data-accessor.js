const httpCommunicator = require('../../communicators/http/http-communicator');

class BattleNetDataAccessor {
    async getGuildMembers() {
        let accessToken = await this._getAccessToken();
        let url = `https://us.api.blizzard.com/wow/guild/malganis/cinder%20and%20ash?fields=members`;
        let headers = {'Authorization': `Bearer ${accessToken}`};

        return await httpCommunicator.get(url, headers);
    };

    async _getAccessToken() {
        let response = await httpCommunicator.post(
            `https://us.battle.net/oauth/token`,
            {'grant_type': 'client_credentials'},
            null,
            {
                username: process.env.BATTLE_NET_API_CLIENT_ID,
                password: process.env.BATTLE_NET_API_CLIENT_SECRET
            });

        return response['access_token'];
    }
}

module.exports = new BattleNetDataAccessor();
