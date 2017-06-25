import {
    LIST_LOAD_START,
    listLoadSuccess,
    listLoadError,
} from './videos.actions';

export const loadVideosList = action$ =>
    action$.ofType(LIST_LOAD_START)
        .switchMap(() => videosService.loadVideos())
            .map((res) => listLoadSuccess(res))
            .catch((err) => Observable.of(listLoadError(err)));
