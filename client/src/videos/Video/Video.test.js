import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { Video } from './Video';

const mockState = {
    location: {
        routesMap: {}
    }
};
const makeWrapper = ({ video = {}, loadVideo = () => null } = {}) => shallow(<Video video={video} loadVideo={loadVideo} />);
const mountWrapper = ({ video = {}, loadVideo = () => null, mockStore = configureStore()(() => mockState) } = {}) => {
    return mount(
        <Provider store={mockStore}>
            <Video video={video} loadVideo={loadVideo} />
        </Provider>
    );
};

describe('Video', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('accepts "video" object', () => {
        testPropTypes(
            Video,
            'video',
            [{}, null],
            [123, 'abc'],
            { loadVideo: () => null }
        );
    });

    it('requires "loadVideo" function', () => {
        testPropTypes(
            Video,
            'loadVideo',
            [() => null],
            [123, 'abc', null, undefined],
            { video: {} }
        );
    });

    it('calls loadVideo if video ID is missing', () => {
        const loadVideo = jest.fn();
        mountWrapper({ loadVideo });

        expect(loadVideo).toHaveBeenCalled();
    });

    it('does NOT call loadVideo if video ID is present', () => {
        const video = {
            id: '123',
            ext: '.mp4'
        };
        const loadVideo = jest.fn();
        mountWrapper({ video, loadVideo });

        expect(loadVideo).not.toHaveBeenCalled();
    });

});