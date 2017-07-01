import { schema, normalize } from 'normalizr';

import { http } from '../utils';

const videosSchema = new schema.Entity('videos');

const getVideoList$ = () => {
    return http.get$('videos')
        .map((res) => {
            return normalize(res, [videosSchema]);
        });
};

const getOneVideo$ = (id) => {
    return http.get$(`videos/${id}`)
        .map((res) => {
            return normalize(res, videosSchema);
        });
};

export {
    getVideoList$,
    getOneVideo$,
};
