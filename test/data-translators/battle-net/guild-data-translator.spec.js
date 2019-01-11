const td = require('testdouble');
const expect = require('chai').expect;

describe('Guild Data Translator', () => {
    let mockCharacterDataTranslator;
    let mockGameDataAccessor;
    let guildDataTranslator;

    beforeEach(() => {
        mockCharacterDataTranslator = td.replace('../../../src/data-translators/battle-net/character-data-translator');
        mockGameDataAccessor = td.replace('../../../src/data-accessors/world-of-warcraft/game-data-accessor');
        guildDataTranslator = require('../../../src/data-translators/battle-net/guild-data-translator');
    });

    describe('translate(:guildJson)', () => {
        it('should map each character', () => {
            let expectedClassMap = {'the': 'class map'};
            td.when(mockGameDataAccessor.getClassMap()).thenResolve(expectedClassMap);

            let character1 = {name: 'Knute'};
            let character2 = {name: 'Gray'};

            let guildJson = {
                members: [
                    {character: character1},
                    {character: character2}
                ]
            };
            let expectedCharacter1 = 'Knute\'s info';
            let expectedCharacter2 = 'Gray\'s info';

            td.when(mockCharacterDataTranslator.translate(character1, expectedClassMap)).thenReturn(expectedCharacter1);
            td.when(mockCharacterDataTranslator.translate(character2, expectedClassMap)).thenReturn(expectedCharacter2);

            return guildDataTranslator.translate(guildJson).then(guildInfo => {
                expect(guildInfo.members.length).to.equal(2);
                expect(guildInfo.members).to.include(expectedCharacter1);
                expect(guildInfo.members).to.include(expectedCharacter2);
            });

        })
    })
});
