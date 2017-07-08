import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { VideoList } from './VideoList';

const makeWrapper = ({ items = [] } = {}) => shallow(<VideoList items={items} />);

describe('VideoList', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "items" object prop', () => {
        testPropTypes(
            VideoList,
            'items',
            [[]],
            [123, '123', null, undefined]
        );
    });

});