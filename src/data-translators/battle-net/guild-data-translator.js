let characterDataTranslator = require('./character-data-translator');
let gameDataAccessor = require('../../data-accessors/world-of-warcraft/game-data-accessor');

class GuildDataTranslator {
    async translate(guildJson) {
        let classMap = await gameDataAccessor.getClassMap();
        let members = guildJson.members.map(characterJson => {
            return characterDataTranslator.translate(characterJson.character, classMap)
        });

        return {members: members};
    }
}

module.exports = new GuildDataTranslator();
