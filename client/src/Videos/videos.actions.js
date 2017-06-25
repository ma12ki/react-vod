const prefix = '[VIDEOS]';

export const LIST_LOAD_START = `${prefix}LIST_LOAD_START`;
export const LIST_LOAD_SUCCESS = `${prefix}LIST_LOAD_SUCCESS`;
export const LIST_LOAD_ERROR = `${prefix}LIST_LOAD_ERROR`;

export const listLoadStart = () => ({ type: LIST_LOAD_START });
export const listLoadSuccess = (payload) => ({ type: LIST_LOAD_SUCCESS, payload });
export const listLoadError = (payload) => ({ type: LIST_LOAD_ERROR, payload });
