import {
    LIST_LOAD_START,
    LIST_LOAD_SUCCESS,
    LIST_LOAD_ERROR,
} from './videos.actions';

const defaultState = {
    loading: false,
    items: [],
    error: null,
};

export const videos = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LIST_LOAD_START: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case LIST_LOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null,
            };
        }
        case LIST_LOAD_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}