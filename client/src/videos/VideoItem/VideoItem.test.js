import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { VideoItem } from './VideoItem';

const makeWrapper = ({ video = {}, searchTerm = '' } = {}) => shallow(<VideoItem video={video} searchTerm={searchTerm} />);

describe('VideoItem', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('accepts "video" object prop', () => {
        testPropTypes(
            VideoItem,
            'video',
            [{}],
            [123, '123', null, undefined],
            { searchTerm: '' }
        );
    });

    it('accepts "searchTerm" string prop', () => {
        testPropTypes(
            VideoItem,
            'searchTerm',
            ['ad sd fsd f sdf sdf sdfsd', 'FFFFF!@#$%^&*()_', '', null, undefined],
            [123, <i></i>],
            { video: {} }
        );
    });

});