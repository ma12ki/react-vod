import React from 'react';
import { shallow, mount } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { VideoSearch } from './VideoSearch';

jest.mock('throttle-debounce', () => {
    return {
        debounce: (_delay, _atBegin, fn) => (...args) => fn.apply(null, args)
    };
});

const makeWrapper = ({ search = '', performSearch = () => null } = {}) => shallow(<VideoSearch search={search} performSearch={performSearch} />);
const mountWrapper = ({ search = '', performSearch = () => null } = {}) => mount(<VideoSearch search={search} performSearch={performSearch} />);

describe('VideoSearch', () => {

    beforeEach(() => jest.clearAllMocks());

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "search" string prop', () => {
        testPropTypes(
            VideoSearch,
            'search',
            ['rofl', 'xD', ''],
            [123, null, undefined],
            {
                performSearch: () => null
            }
        );
    });

    it('requires "performSearch" function prop', () => {
        testPropTypes(
            VideoSearch,
            'performSearch',
            [() => null],
            ['123', 123, null, undefined],
            {
                search: 'lol'
            }
        );
    });

    it('calls "performSearch" on key up', () => {
        const performSearch = jest.fn();
        const wrapper = mountWrapper({ performSearch });
        const chars = 'lol';

        wrapper.find('input').node.value = chars;
        wrapper.simulate('keyup');

        expect(performSearch).toHaveBeenCalledWith(chars);
    });

});