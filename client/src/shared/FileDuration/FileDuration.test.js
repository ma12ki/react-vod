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
            { input: 0, output: '0:00:00'},
            { input: 28, output: '0:00:28'},
            { input: 180, output: '0:03:00'},
            { input: 3599, output: '0:59:59'},
            { input: 3600, output: '1:00:00'},
            { input: 3721, output: '1:02:01'},
        ].forEach(({ input, output }) => {
            const wrapper = makeWrapper(input);

            expect(wrapper.text()).toEqual(output);
        });
    });

});