const expect = require('chai').expect;

describe('Character Data Translator', () => {
    let characterJson = {
        name: undefined,
        class: undefined,
        spec: {}
    };
    let characterDataTranslator;

    beforeEach(() => {
        characterDataTranslator = require('../../../data-translators/battle-net/character-data-translator');
    });

    describe('translate', () => {
        it('should map name', () => {
            let expectedName = 'Knute';
            characterJson.name = expectedName;

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.name).to.equal(expectedName);
        });

        it('should map class', () => {
            characterJson.class = 2;

            let expectedClass = {'name': 'Monk'};
            let classMap = {
                0: {'name': 'Mage'},
                2: expectedClass,
                17: {'name': 'Warlock'},
                15: {'name': 'DeathKnight'},
            };

            let character = characterDataTranslator.translate(characterJson, classMap);
            expect(character.class).to.deep.equal(expectedClass);
        });

        it('should map spec', () => {
            let expectedSpec = 'Brew Master';
            characterJson.spec = {name: expectedSpec};

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.spec).to.equal(expectedSpec);
        });

        it('should map role', () => {
            let expectedRole = 'Tank';
            characterJson.spec = {role: expectedRole};

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.role).to.equal(expectedRole);
        });
    })
});
