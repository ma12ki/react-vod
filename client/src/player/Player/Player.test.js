import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { Player } from './Player';

jest.mock('../../config', () => {
    return {
        apiUrl: 'BEST_API'
    };
});

const makeWrapper = ({ id = 'omg', ext = '.mp4' } = {}) => shallow(<Player id={id} ext={ext} />);

describe('Player', () => {

    beforeEach(() => jest.clearAllMocks());

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

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

    it('accepts supported extensions', () => {
        ['.mp4', '.webm'].forEach((ext) => {
            const makeWrapperExt = makeWrapper.bind(null, { ext });
            expect(makeWrapperExt).not.toThrow();
        });
    });

    it('throws when passed unsupported extensions', () => {
        ['.txt', '.avi', '.lol'].forEach((ext) => {
            const makeWrapperExt = makeWrapper.bind(null, { ext });
            expect(makeWrapperExt).toThrow();
        });
    });

    it('sets the proper "src" attribute on the video source', () => {
        const id = '123';
        const wrapper = makeWrapper({ id });

        expect(wrapper.find({ src: `BEST_APIplay/${id}` }).exists()).toBe(true);
    });

    it('sets the proper "type" attribute on the video source', () => {
        [
            { ext: '.mp4', type: 'video/mp4' },
            { ext: '.webm', type: 'video/webm' },
        ].forEach(({ ext, type }) => {
            const wrapper = makeWrapper({ ext });
            expect(wrapper.find({ type }).exists()).toBe(true);
        });
    });

});