const td = require('testdouble');
const expect = require('chai').expect;

describe('GET /battle-net/character/:realm/:characterName', () => {
    let battleNetRoutes;
    let mockBattleNetDataAccessor;
    let mockGameDataAccessor;
    let mockCharacterDataTranslator;

    beforeEach(() => {
        mockBattleNetDataAccessor = td.replace('../../src/data-accessors/battle-net/battle-net-data-accessor');
        mockGameDataAccessor = td.replace('../../src/data-accessors/world-of-warcraft/game-data-accessor');
        mockCharacterDataTranslator = td.replace('../../src/data-translators/battle-net/character-data-translator');

        battleNetRoutes = require('../../src/routes/battle-net');
    });

    it('should respond with the value from the character data translator', async () => {
        let expectedJson = JSON.stringify({'some': 'json'});

        td.when(mockBattleNetDataAccessor.getCharacter(td.matchers.anything(), td.matchers.anything())).thenResolve({});
        td.when(mockGameDataAccessor.getClassMap()).thenResolve({});
        td.when(mockCharacterDataTranslator.translate(td.matchers.anything(), td.matchers.anything())).thenReturn(expectedJson);

        let mockResponse = td.object({send: td.function()});
        await battleNetRoutes.character.get({params: {}}, mockResponse);

        td.verify(mockResponse.send(expectedJson));
    });

    it('should pass the class map and character JSON to the character data translator', async () => {
        // let characterJsonCaptor = td.matchers.captor();
        let expectedCharacterJson = JSON.stringify({'some': 'json'});

        // let classMapCaptor = td.matchers.captor();
        let expectedClassMap = 'class map';

        td.when(mockBattleNetDataAccessor.getCharacter(td.matchers.anything(), td.matchers.anything())).thenResolve(expectedCharacterJson);
        td.when(mockGameDataAccessor.getClassMap()).thenResolve(expectedClassMap);

        let mockResponse = td.object({send: td.function()});
        await battleNetRoutes.character.get({params: {}}, mockResponse);

        td.verify(mockCharacterDataTranslator.translate(expectedCharacterJson, expectedClassMap))
    });

    it('should pass the realm and character name from the url parameters to the battle net data accessor', async () => {
        let expectedRealm = 'malganis';
        let realmParamCaptor = td.matchers.captor();

        let expectedCharacterName = 'Knute';
        let characterNameParamCaptor = td.matchers.captor();

        td.when(mockBattleNetDataAccessor.getCharacter(realmParamCaptor.capture(), characterNameParamCaptor.capture())).thenResolve();

        let mockResponse = td.object({send: td.function()});
        let request = {
            params: {
                realm: expectedRealm,
                characterName: expectedCharacterName
            }
        };

        await battleNetRoutes.character.get(request, mockResponse);

        expect(realmParamCaptor.value).to.equal(expectedRealm);
        expect(characterNameParamCaptor.value).to.equal(expectedCharacterName);
    })
});
