export const normalizrEntityReducer = (entitiesKey, loadAllActionTypes, loadOneActionTypes) => {
    loadAllActionTypes = [].concat(loadAllActionTypes);
    loadOneActionTypes = [].concat(loadOneActionTypes);

    return (state = {}, action = {}) => {
        const { type, payload } = action;
        if (loadAllActionTypes.includes(type)) {
            const { entities } = payload;
            return {
                ...state,
                [entitiesKey]: {
                    ...entities[entitiesKey]
                }
            };
        } else if (loadOneActionTypes.includes(type)) {
            const { entities } = payload;
            return {
                ...state,
                [entitiesKey]: {
                    ...state[entitiesKey],
                    ...entities[entitiesKey]
                }
            };
        } else {
            return state;
        }
    };
}
