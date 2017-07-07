import { normalizrEntityReducer } from './normalizrEntity.reducer';

describe('normalizrEntityReducer', () => {

    it('sets proper state for LOAD ALL action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const key = 'lolEntity';
        const entities = {
            [key]: {
                1: 'omg',
                2: 'kthxbai',
            }
        };
        const reducer = normalizrEntityReducer(key, loadAll, loadOne);
        const expected = {
            something: 'thatShouldNotChange',
            [key]: {
                ...entities[key],
            }
        };
        const state = {
            ...expected,
            [key]: {
                something: 'thatShouldBeReplaced',
                ...expected[key],
            }
        };

        const actual = reducer(state, { type: loadAll, payload: { entities } });

        expect(actual).toEqual(expected);
    });

    it('sets proper state for LOAD ONE action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const key = 'lolEntity';
        const entities = {
            [key]: {
                2: 'kthxbai',
            }
        };
        const reducer = normalizrEntityReducer(key, loadAll, loadOne);
        const expected = {
            something: 'thatShouldNotChange',
            [key]: {
                ...entities[key],
                2: 'kthxbai',
            }
        };
        const state = {
            ...expected,
            [key]: {
                ...expected[key],
                1: 'omg',
            }
        };

        const actual = reducer(state, { type: loadAll, payload: { entities } });

        expect(actual).toEqual(expected);
    });


    it('does not modify state for unknown action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const key = 'lolEntity';
        const reducer = normalizrEntityReducer(key, loadAll, loadOne);
        const expected = {
            rofl: 'xD'
        };

        const actual = reducer(expected, { type: 'SOMETHING_ELSE' });

        expect(actual).toEqual(expected);
    });

});