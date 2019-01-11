const expect = require('chai').expect;

describe('Game Data Accessor', () => {
    let gameDataAccessor;

    beforeEach(() => {
        gameDataAccessor = require('../../../src/data-accessors/world-of-warcraft/game-data-accessor');
    });

    describe('getClassMap()', () => {
        it('should return the correct class map', () => {
            let expectedClassMap = {
                1: {name: "Warrior"},
                2: {name: "Paladin"},
                3: {name: "Hunter"},
                4: {name: "Rouge"},
                5: {name: "Priest"},
                6: {name: "Death Knight"},
                7: {name: "Shaman"},
                8: {name: "Mage"},
                9: {name: "Warlock"},
                10: {name: "Monk"},
                11: {name: "Druid"},
                12: {name: "Demon Hunter"},
            };

            return gameDataAccessor.getClassMap().then(classMap => {
                expect(classMap).to.deep.equal(expectedClassMap);
            });
        })
    });
});
