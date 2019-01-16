class GameDataAccessor {
    async getClassMap() {
        return classMap;
    }
}

module.exports = new GameDataAccessor();

let classMap = {
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
