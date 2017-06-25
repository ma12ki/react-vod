import { Observable } from 'rxjs';

import {
    LIST_LOAD_START,
    listLoadSuccess,
    listLoadError,
} from './videos.actions';
import { getVideoList$ } from './videos.service';

export const loadVideosList$ = action$ =>
    action$.ofType(LIST_LOAD_START)
        .switchMap(() => getVideoList$())
            .map((res) => listLoadSuccess(res))
            .catch((err) => Observable.of(listLoadError(err)));
