let characterDataTranslator = require('./character-data-translator');
let gameDataAccessor = require('../../data-accessors/world-of-warcraft/game-data-accessor');

class GuildDataTranslator {
    translate(guildJson) {
        return new Promise(resolve => {
            gameDataAccessor.getClassMap().then(classMap => {
                let members = guildJson.members.map(characterJson => {
                    return characterDataTranslator.translate(characterJson.character, classMap)
                });
                resolve({members: members});
            })
        });

    }
}

module.exports = new GuildDataTranslator();
