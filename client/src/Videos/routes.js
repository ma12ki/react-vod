import { payload } from '../router.selectors';
import { videosEntities } from './videos.selectors';
import { getVideoList$ } from './videos.service';
import { listLoadSuccess } from './videos.actions';

const routerPrefix = '[ROUTER]';
const featurePrefix = '[VIDEOS]';
const prefix = `${routerPrefix}${featurePrefix}`;

export const routesKeys = {
    home: `${prefix}HOME`,
    video: `${prefix}VIDEO`,
};

const videoThunk = async (dispatch, getState) => {
    const state = getState();
    const { id } = payload(state);
    const entities = videosEntities(state);
    const video = entities[id];
    
    if (!video) {
        const videos = await getVideoList$().toPromise();
        dispatch(listLoadSuccess(videos));
    }
};

export const routesMap = { 
    [routesKeys.home]: '/', 
    [routesKeys.video]: { path: '/video/:id', thunk: videoThunk, }, 
};
