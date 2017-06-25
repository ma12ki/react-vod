import { get$ } from '../utils/http';

const getVideoList$ = () => {
    return get$('videos');
};

export {
    getVideoList$,
};
