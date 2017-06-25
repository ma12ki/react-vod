import { schema, normalize } from 'normalizr';

import { get$ } from '../utils/http';

const videosSchema = new schema.Entity('videos');

const getVideoList$ = () => {
    return get$('videos')
        .map((res) => {
            return normalize(res, [videosSchema])
        });
};

export {
    getVideoList$,
};
