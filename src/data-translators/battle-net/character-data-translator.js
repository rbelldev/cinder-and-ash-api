class CharacterDataTranslator {
    translate(characterJson, classMap) {
        return {
            name: characterJson['name'],
            class: classMap[characterJson['class']],
            spec: characterJson['spec']['name'],
            role: characterJson['spec']['role'],
        };
    }
}

module.exports = new CharacterDataTranslator();
