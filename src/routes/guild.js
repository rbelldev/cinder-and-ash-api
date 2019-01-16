const battleNetDataAccessor = require('../data-accessors/battle-net/battle-net-data-accessor');
const guildDataTranslator = require('../data-translators/battle-net/guild-data-translator');

let getMembers = async (request, response) => {
    try {
        let guildMemberJson = await battleNetDataAccessor.getGuildMembers();
        let guildMembers = await guildDataTranslator.translate(guildMemberJson);

        response.send(guildMembers);
    } catch (e) {
        console.error(e);
        response.sendStatus(500)
    }
};

module.exports = {getMembers: getMembers};
