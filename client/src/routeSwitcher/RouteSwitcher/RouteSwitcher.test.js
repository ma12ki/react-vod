import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { RouteSwitcher } from './RouteSwitcher';

jest.mock('../../rootRoutes', () => {
    return {
        rootRouteSwitcher: jest.fn(() => <div></div>)
    };
});

describe('RouteSwitcher', () => {

    beforeEach(() => jest.clearAllMocks());

    it('matches the snapshot', () => {
        const routeKey = 'lol';
        const wrapper = shallow(<RouteSwitcher routeKey={routeKey} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "routeKey" string prop', () => {
        testPropTypes(
            RouteSwitcher,
            'routeKey',
            ['rofl', 'xD'],
            [123, null, undefined],
        );
    });

});