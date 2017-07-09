export const normalizrResultReducer = (loadAllActionTypes, loadOneActionTypes) => {
    loadAllActionTypes = [].concat(loadAllActionTypes);
    loadOneActionTypes = [].concat(loadOneActionTypes);

    return (state = [], action = {}) => {
        const { type, payload } = action;

        if (loadAllActionTypes.includes(type)) {
            const { result } = payload;
            return [...result];
        } else if (loadOneActionTypes.includes(type)) {
            const { result } = action.payload;
            return [...state, result];
        } else {
            return state;
        }
    };
} 
