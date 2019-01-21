class CharacterDataTranslator {
    translate(characterJson, classMap) {
        let spec = 'unknown';
        let role = 'unknown';

        if (characterJson['spec']) {
            spec = characterJson['spec']['name'];
            role = characterJson['spec']['role'];
        } else if (characterJson['talents']) {
            const talents = characterJson['talents'];
            talents.forEach(talent => {
                if (talent['selected']) {
                    spec = talent['spec']['name'];
                    role = talent['spec']['role'];
                }
            })
        }
        return {
            name: characterJson['name'],
            className: classMap[characterJson['class']],
            spec: spec,
            role: role,
            level: characterJson['level'],
            realm: characterJson['realm'],
            thumbnail: characterJson['thumbnail'],
        };
    }
}

module.exports = new CharacterDataTranslator();
