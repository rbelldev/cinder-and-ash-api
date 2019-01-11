const expect = require('chai').expect;

describe('Game Data Accessor', () => {
    let gameDataAccessor;

    beforeEach(() => {
        gameDataAccessor = require('../../../src/data-accessors/world-of-warcraft/game-data-accessor');
    });

    describe('getClassMap()', () => {
        it('should return the correct class map', () => {
            let expectedClassMap = {
                1: "Warrior",
                2: "Paladin",
                3: "Hunter",
                4: "Rouge",
                5: "Priest",
                6: "Death Knight",
                7: "Shaman",
                8: "Mage",
                9: "Warlock",
                10: "Monk",
                11: "Druid",
                12: "Demon Hunter",
            };

            return gameDataAccessor.getClassMap().then(classMap => {
                expect(classMap).to.deep.equal(expectedClassMap);
            });
        })
    });
});
