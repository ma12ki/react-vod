import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { FileSize } from './FileSize';

const makeWrapper = (size = 12345) => shallow(<FileSize size={size} />);

describe('FileSize', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "size" number prop', () => {
        testPropTypes(
            FileSize,
            'size',
            [0, 1, 20, 300, 4000, 50000, 600000],
            ['123', null, undefined]
        );
    });

    it('properly renders size', () => {
        [
            { input: 0, output: '0B'},
            { input: 1023, output: '1023B'},
            { input: 1024, output: '1kB'},
            { input: 1025, output: '1kB'},
            { input: 1024 + 1023, output: '1kB'},
            { input: 1024 * 1023, output: '1023kB'},
            { input: 1024 * 1024, output: '1MB'},
            { input: 1024 * 1025, output: '1MB'},
            { input: 1024 * 1024 * 1023, output: '1023MB'},
            { input: 1024 * 1024 * 1024, output: '1GB'},
            { input: 1024 * 1024 * 1025, output: '1GB'},
            { input: 1024 * 1024 * 1024 * 1023, output: '1023GB'},
            { input: 1024 * 1024 * 1024 * 1025, output: '1025GB'},
        ].forEach(({ input, output }) => {
            const wrapper = makeWrapper(input);

            expect(wrapper.text()).toEqual(output);
        });
    });

});