const battleNetDataAccessor = require('../data-accessors/battle-net/battle-net-data-accessor');
const guildDataTranslator = require('../data-translators/battle-net/guild-data-translator');

let getMembers = function (request, response) {
    battleNetDataAccessor.getGuildMembers()
        .then(guildDataTranslator.translate)
        .then(members => {
            response.send(members);
        })
        .catch(() => {
            response.sendStatus(500)
        });
};

module.exports = {getMembers: getMembers};
