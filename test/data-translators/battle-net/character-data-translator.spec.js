const expect = require('chai').expect;

describe('Character Data Translator', () => {
    let characterJson;
    let characterDataTranslator;

    beforeEach(() => {
        characterJson = {
            name: undefined,
            class: undefined,
        };

        characterDataTranslator = require('../../../src/data-translators/battle-net/character-data-translator');
    });

    describe('translate', () => {
        it('should map name', () => {
            let expectedName = 'Knute';
            characterJson.name = expectedName;

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.name).to.equal(expectedName);
        });

        it('should map className', () => {
            characterJson.class = 2;

            let expectedClass = {'name': 'Monk'};
            let classMap = {
                0: {'name': 'Mage'},
                2: expectedClass,
                17: {'name': 'Warlock'},
                15: {'name': 'DeathKnight'},
            };

            let character = characterDataTranslator.translate(characterJson, classMap);
            expect(character.className).to.deep.equal(expectedClass);
        });

        it('should map spec - from spec', () => {
            let expectedSpec = 'Brew Master';
            characterJson.spec = {name: expectedSpec};

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.spec).to.equal(expectedSpec);
        });

        it('should map spec - from talents', () => {
            let expectedSpec = 'Brew Master';
            characterJson.talents = [
                {spec: {name: 'Wind Walker'}},
                {selected: true, spec: {name: expectedSpec}}
            ];

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.spec).to.equal(expectedSpec);
        });

        it('should map role - from spec', () => {
            let expectedRole = 'Tank';
            characterJson.spec = {role: expectedRole};

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.role).to.equal(expectedRole);
        });

        it('should map role - from talents', () => {
            let expectedRole = 'Tank';
            characterJson.talents = [
                {spec: {role: 'DPS'}},
                {selected: true, spec: {role: expectedRole}}
            ];

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.role).to.equal(expectedRole);
        });

        it(`should return 'unknown' for spec and role if no spec present`, () => {
            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.spec).to.equal('unknown');
            expect(character.role).to.equal('unknown');
        });

        it('should map level', () => {
            let expectedLevel = 110;
            characterJson.level = expectedLevel;

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.level).to.equal(expectedLevel);
        });

        it('should map realm', () => {
            let expectedRealm = 'Mal\'Ganis';
            characterJson.realm = expectedRealm;

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.realm).to.equal(expectedRealm);
        });

        it('should map thumbnail', () => {
            let expectedThumbnail = 'path to an image';
            characterJson.thumbnail = expectedThumbnail;

            let character = characterDataTranslator.translate(characterJson, {});
            expect(character.thumbnail).to.equal(expectedThumbnail);
        });
    })
});
