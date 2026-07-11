describe('i18n Fallback', () => {
    test('empty ES key falls back to EN', () => {
        const key = 'ranukit.100';
        const esValue = getTranslation(key, 'es');
        const enValue = getTranslation(key, 'en');
        expect(esValue).toBe(enValue);
    });

    test('empty EN key returns original key', () => {
        const key = 'non.existent.key';
        const value = getTranslation(key, 'en');
        expect(value).toBe(key);
    });
});