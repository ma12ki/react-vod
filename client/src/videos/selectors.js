const getVideos = ({ videos }) => videos;
const getInitialized = (state) => getVideos(state).initialized;
const getLoading = (state) => getVideos(state).loading;
const getError = (state) => getVideos(state).error;
const getVideosResult = (state) => getVideos(state).result || [];
const getEntities = (state) => getVideos(state).entities || {};
const getVideosEntities = (state) => getEntities(state).videos || {};
const getVideosEntity = (state, id) => getVideosEntities(state)[id] || {};

const getVideosArray = (state) => {
    const entities = getVideosEntities(state);
    const result = getVideosResult(state);

    return result.map((id) => entities[id]);
};

const getSearch = (state) => getVideos(state).search;
const getFilteredVideos = (state) => {
    const term = getSearch(state);
    const videos = getVideosArray(state);

    return term ? videos.filter((video) => video.name.match(new RegExp(term, 'i'))) : videos;
};

export {
    getInitialized,
    getLoading,
    getError,
    getVideosEntities,
    getVideosEntity,
    getVideosResult,
    getVideosArray,
    getSearch,
    getFilteredVideos,
};
