export const normalizrEntityReducer = (entitiesKey, loadAllActionType, loadOneActionType) => 
    (state = {}, action = {}) => {
        switch (action.type) {
            case loadAllActionType: {
                const { entities } = action.payload;
                return {
                    ...state,
                    [entitiesKey]: {
                        ...entities[entitiesKey]
                    }
                };
            }
            case loadOneActionType: {
                const { entities } = action.payload;
                return {
                    ...state,
                    [entitiesKey]: {
                        ...state[entitiesKey],
                        ...entities[entitiesKey]
                    }
                };
            }
            default: {
                return state;
            }
        }
    };
