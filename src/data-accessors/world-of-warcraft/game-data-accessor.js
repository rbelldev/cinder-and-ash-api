class GameDataAccessor {
    getClassMap() {
        return new Promise(resolve => {
            resolve(classMap);
        });
    }
}

module.exports = new GameDataAccessor();


let classMap = {
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
