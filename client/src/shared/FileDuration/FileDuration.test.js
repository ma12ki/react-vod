import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { FileDuration } from './FileDuration';

const makeWrapper = (duration = 12345) => shallow(<FileDuration duration={duration} />);

describe('FileDuration', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "duration" number prop', () => {
        testPropTypes(
            FileDuration,
            'duration',
            [0, 1, 20, 300, 4000, 50000],
            ['123', null, undefined]
        );
    });

    it('properly renders time', () => {
        [
            { input: 0, output: ''},
            { input: 28, output: '28s'},
            { input: 180, output: '3m'},
            { input: 3599, output: '59m 59s'},
            { input: 3600, output: '1h'},
            { input: 3721, output: '1h 2m 1s'},
        ].forEach(({ input, output }) => {
            const wrapper = makeWrapper(input);

            expect(wrapper.text()).toEqual(output);
        });
    });

});