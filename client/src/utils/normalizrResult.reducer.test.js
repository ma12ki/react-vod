import { normalizrResultReducer } from './normalizrResult.reducer';

describe('normalizrResultReducer', () => {

    it('sets proper state for LOAD ALL action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const reducer = normalizrResultReducer(loadAll, loadOne);
        const expected = ['lol', 'mao'];
        const state = ['omg'];

        const actual = reducer(state, { type: loadAll, payload: { result: expected } });

        expect(actual).toEqual(expected);
    });

    it('sets proper state for LOAD ONE action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const reducer = normalizrResultReducer(loadAll, loadOne);
        const expected = ['lol', 'mao'];
        const state = ['lol'];

        const actual = reducer(state, { type: loadOne, payload: { result: 'mao' } });

        expect(actual).toEqual(expected);
    });

    it('does not modify state for unknown action', () => {
        const loadAll = 'LOAD_ALL';
        const loadOne = 'LOAD_ONE';
        const reducer = normalizrResultReducer(loadAll, loadOne);
        const expected = {
            rofl: 'xD'
        };

        const actual = reducer(expected, { type: 'SOMETHING_ELSE' });

        expect(actual).toEqual(expected);
    });

});