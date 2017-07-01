import { combineEpics } from 'redux-observable';

import { videosEpics } from './videos';

export const rootEpic = combineEpics(
    videosEpics,
);
