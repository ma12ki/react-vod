export const normalizrResultReducer = (loadAllActionType, loadOneActionType) => 
    (state = [], action = {}) => {
        switch (action.type) {
            case loadAllActionType: {
                const { result } = action.payload;
                return [...result];
            }
            case loadOneActionType: {
                const { result } = action.payload;
                return [...state, result];
            }
            default: {
                return state;
            }
        }
    };
