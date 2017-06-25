const videos = (state) => state.videos;
const loading = (state) => videos(state).loading;
const error = (state) => videos(state).error;
const items = (state) => videos(state).items || {};
const videosResult = (state) => items(state).result || [];
const entities = (state) => items(state).entities || {};
const videosEntities = (state) => entities(state).videos || {};

const videosItems = (state) => {
    const entities = videosEntities(state);
    const result = videosResult(state);

    return result.map((id) => entities[id]);
};

export {
    loading,
    error,
    videosEntities,
    videosResult,
    videosItems,
};
