import { combineRouteSwitchers } from './combineRouteSwitchers';

describe('combineRouteSwitchers', () => {

    it('returns matched component', () => {
        const routeKey = 'lol';
        const expected = 'component';
        const switcherFn = jest.fn((key) => key === routeKey ? expected : null );
        const combined = combineRouteSwitchers(switcherFn);

        const actual = combined(routeKey);

        expect(actual).toEqual(expected);
    });

    it('logs error if no matched component', () => {
        const routeKey = 'lol';
        const expected = undefined;
        const switcherFn = jest.fn(() => null );
        const combined = combineRouteSwitchers(switcherFn);
        const consoleError = console.error;

        try {
            console.error = jest.fn();

            const actual = combined(routeKey);

            expect(actual).toEqual(expected);
            expect(console.error).toHaveBeenCalled();
        } finally {
            console.error = consoleError;
        }
    });

    it('stops executing after first match', () => {
        const expected = 'component';
        const switcherFn = jest.fn(() => expected );
        const switcherFn2 = jest.fn(() => null );
        const combined = combineRouteSwitchers(switcherFn, switcherFn2);

        const actual = combined('rofl');

        expect(actual).toEqual(expected);
        expect(switcherFn).toHaveBeenCalled();
        expect(switcherFn2).not.toHaveBeenCalled();
    });

    it('keeps looking until it finds a match', () => {
        const expected = 'component';
        const switcherFn = jest.fn(() => null );
        const switcherFn2 = jest.fn(() => expected );
        const combined = combineRouteSwitchers(switcherFn, switcherFn2);

        const actual = combined('rofl');

        expect(actual).toEqual(expected);
        expect(switcherFn).toHaveBeenCalled();
        expect(switcherFn2).toHaveBeenCalled();
    });

});