import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { Videos } from './Videos';

const mockState = {
    location: {
        routesMap: {}
    },
    videos: {}
};
const makeWrapper = ({ initialized = false, loadVideos = () => null } = {}) => shallow(<Videos initialized={initialized} loadVideos={loadVideos} />);
const mountWrapper = ({ initialized = false, loadVideos = () => null, mockStore = configureStore()(() => mockState) } = {}) => {
    return mount(
        <Provider store={mockStore}>
            <Videos initialized={initialized} loadVideos={loadVideos} />
        </Provider>
    );
};

describe('Video', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "initialized" bool', () => {
        testPropTypes(
            Videos,
            'initialized',
            [true, false],
            [123, 'abc', null, undefined],
            { loadVideos: () => null }
        );
    });

    it('requires "loadVideos" function', () => {
        testPropTypes(
            Videos,
            'loadVideos',
            [() => null],
            [123, 'abc', null, undefined],
            { initialized: true }
        );
    });

    it('calls loadVideos if "initialized" prop is FALSE', () => {
        const loadVideos = jest.fn();
        mountWrapper({ initialized: false, loadVideos });

        expect(loadVideos).toHaveBeenCalled();
    });

    it('does NOT call loadVideos if "initialized" prop is TRUE', () => {
        const loadVideos = jest.fn();
        mountWrapper({ initialized: true, loadVideos });

        expect(loadVideos).not.toHaveBeenCalled();
    });

});