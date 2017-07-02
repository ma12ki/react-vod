import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { Player } from './Player';

jest.mock('../../config', () => {
    return {
        apiUrl: 'BEST_API'
    };
});

describe('Player', () => {

    beforeEach(() => jest.clearAllMocks());

    it('matches the snapshot', () => {
        const id = 'omg';
        const ext = '.mp4';
        const wrapper = shallow(<Player id={id} ext={ext} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "id" string prop', () => {
        testPropTypes(
            Player,
            'id',
            ['rofl', 'xD'],
            [123, null, undefined],
            {
                ext: '.mp4'
            }
        );
    });

    it('requires "ext" string prop', () => {
        testPropTypes(
            Player,
            'ext',
            ['.mp4', '.webm'],
            [123, null, undefined],
            {
                ext: '.mp4'
            }
        );
    });

});