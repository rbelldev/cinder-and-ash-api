let battleNetDataAccessor = require('../data-accessors/battle-net/battle-net-data-accessor');
let gameDataAccessor = require('../data-accessors/world-of-warcraft/game-data-accessor');
let characterDataTranslator = require('../data-translators/battle-net/character-data-translator');

let routes = {
    character: {
        get: async (request, response) => {
            try {
                let characterJson = await battleNetDataAccessor.getCharacter(request.params.realm, request.params.characterName);
                let classMap = await gameDataAccessor.getClassMap();

                response.send(characterDataTranslator.translate(characterJson, classMap));
            } catch (e) {
                response.sendStatus(500);
            }
        }
    }
};

module.exports = routes;
