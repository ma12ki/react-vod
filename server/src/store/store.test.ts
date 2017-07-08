import { store } from './store';

describe('store', () => {

    describe('#get/set()', () => {
        it('stores and returns arbitrary data', async () => {
            const assertionPromises = [
                { key: 'a', value: 'a' },
                { key: 'b', value: {} },
                { key: 'c', value: 123 },
                { key: 'd', value: new Date() },
                { key: 'e', value: '' },
                { key: 'f', value: /lmao/ },
                { key: 'g', value: `xD` },
                { key: 'h', value: class Omg {} },
            ].map(async ({ key, value }) => {
                await store.set(key, value);
                const retrieved = await store.get(key);

                expect(retrieved).toEqual(value);
            });

            return Promise.all(assertionPromises);
        });
    });

});
