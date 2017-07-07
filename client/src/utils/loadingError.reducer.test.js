import { loadingErrorReducer } from './loadingError.reducer';

describe('loadingErrorReducer', () => {

    it('sets proper state for START action', () => {
        const start = 'START';
        const success = 'SUCCESS';
        const error = 'ERROR';
        const reducer = loadingErrorReducer(start, success, error);
        const expected = {
            loading: true,
            error: null,
        };

        const actual = reducer({}, { type: start });

        expect(actual).toEqual(expected);
    });

    it('sets proper state for SUCCESS action', () => {
        const start = 'START';
        const success = 'SUCCESS';
        const error = 'ERROR';
        const reducer = loadingErrorReducer(start, success, error);
        const expected = {
            loading: false,
            error: null,
        };

        const actual = reducer({}, { type: success });

        expect(actual).toEqual(expected);
    });

    it('sets proper state for ERROR action', () => {
        const start = 'START';
        const success = 'SUCCESS';
        const error = 'ERROR';
        const errorMsg = 'oh noez ;/';
        const reducer = loadingErrorReducer(start, success, error);
        const expected = {
            loading: false,
            error: errorMsg,
        };

        const actual = reducer({}, { type: error, payload: errorMsg });

        expect(actual).toEqual(expected);
    });

    it('does not modify state for unknown action', () => {
        const start = 'START';
        const success = 'SUCCESS';
        const error = 'ERROR';
        const reducer = loadingErrorReducer(start, success, error);
        const expected = {
            rofl: 'xD'
        };

        const actual = reducer(expected, { type: 'SOMETHING_ELSE' });

        expect(actual).toEqual(expected);
    });

});