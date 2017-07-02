import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

import { loadingErrorReducer, normalizrEntityReducer, normalizrResultReducer } from '../utils';
import { getVideoList$, getOneVideo$ } from './videos.service.js';

// Actions
const prefix = 'vod/videos/';

const LOAD_VIDEOS_START = `${prefix}LOAD_VIDEOS_START`;
const LOAD_VIDEOS_SUCCESS = `${prefix}LOAD_VIDEOS_SUCCESS`;
const LOAD_VIDEOS_ERROR = `${prefix}LOAD_VIDEOS_ERROR`;

const LOAD_VIDEO_START = `${prefix}LOAD_VIDEO_START`;
const LOAD_VIDEO_SUCCESS = `${prefix}LOAD_VIDEO_SUCCESS`;
const LOAD_VIDEO_ERROR = `${prefix}LOAD_VIDEO_ERROR`;

const SEARCH = `${prefix}SEARCH`;

// Action creators
export const loadVideosStart = () => ({ type: LOAD_VIDEOS_START });
export const loadVideosSuccess = (payload) => ({ type: LOAD_VIDEOS_SUCCESS, payload });
export const loadVideosError = (payload) => ({ type: LOAD_VIDEOS_ERROR, payload });

export const loadVideoStart = (payload) => ({ type: LOAD_VIDEO_START, payload });
export const loadVideoSuccess = (payload) => ({ type: LOAD_VIDEO_SUCCESS, payload });
export const loadVideoError = (payload) => ({ type: LOAD_VIDEO_ERROR, payload });

export const search = (payload) => ({ type: SEARCH, payload });

// Reducers
export const oneVideoReducer = loadingErrorReducer(LOAD_VIDEO_START, LOAD_VIDEO_SUCCESS, LOAD_VIDEO_ERROR);
export const videoListReducer = loadingErrorReducer(LOAD_VIDEOS_START, LOAD_VIDEOS_SUCCESS, LOAD_VIDEOS_ERROR);
export const videoEntitiesReducer = normalizrEntityReducer('videos', LOAD_VIDEOS_SUCCESS, LOAD_VIDEO_SUCCESS);
export const videoResultReducer = normalizrResultReducer(LOAD_VIDEOS_SUCCESS, LOAD_VIDEO_SUCCESS);
export const initializedReducer = (state = false, action = {}) => {
    switch (action.type) {
        case LOAD_VIDEOS_SUCCESS:
        case LOAD_VIDEOS_ERROR: {
            return true;
        }
        default: {
            return state;
        }
    }
};

export const searchReducer = (state = '', action = {}) => {
    switch (action.type) {
        case SEARCH: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const reducer = combineReducers({
    one: oneVideoReducer,
    list: videoListReducer,
    entities: videoEntitiesReducer,
    result: videoResultReducer,
    initialized: initializedReducer,
    search: searchReducer,
});

export default reducer;

// Epics
export const loadVideosList$ = action$ =>
    action$.ofType(LOAD_VIDEOS_START)
        .switchMap(() => getVideoList$())
            .map((res) => loadVideosSuccess(res))
            .catch((err) => Observable.of(loadVideosError(err)));

export const loadOneVideo$ = action$ =>
    action$.ofType(LOAD_VIDEO_START)
        .switchMap(({ payload }) => getOneVideo$(payload))
            .map((res) => loadVideoSuccess(res))
            .catch((err) => Observable.of(loadVideoError(err)));

export const videosEpics = combineEpics(
    loadVideosList$,
    loadOneVideo$,
);
