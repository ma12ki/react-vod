import React from 'react';

// this has some limitations:
// https://stackoverflow.com/questions/41916992/why-does-my-jest-test-of-react-proptypes-break-when-using-multiple-unacceptable/41916993#41916993
export const testPropTypes = (component, propName, acceptableValues, unacceptableValues, otherProps) => {
    console.error = jest.fn();
    const _test = (testValues, expectError) => {
        for (let propValue of testValues) {
            console.error.mockClear();
            React.createElement(component, {...otherProps, [propName]: propValue});
            try {
                expect(console.error).toHaveBeenCalledTimes(expectError ? 1 : 0);
            } catch (err) {
                console.log(`${propName} expected to ${expectError ? '' : 'NOT'} fail for value ${propValue}`);
                throw err;
            }
        }
    };
    _test(acceptableValues || [], false);
    _test(unacceptableValues || [], true);
};
