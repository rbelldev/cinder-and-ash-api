class CharacterDataTranslator {
    translate(characterJson, classMap) {
        let spec = 'unknown';
        let role = 'unknown';

        if (characterJson['spec']) {
            spec = characterJson['spec']['name'];
            role = characterJson['spec']['role'];
        }
        return {
            name: characterJson['name'],
            class: classMap[characterJson['class']],
            spec: spec,
            role: role,
        };
    }
}

module.exports = new CharacterDataTranslator();
