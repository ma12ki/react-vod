export const loadingErrorReducer = (startActionType, successActionType, errorActionType) => 
    (state = {}, action = {}) => {
        switch (action.type) {
            case startActionType: {
                return {
                    loading: true,
                    error: null,
                };
            }
            case successActionType: {
                return {
                    loading: false,
                    error: null,
                };
            }
            case errorActionType: {
                return {
                    loading: false,
                    error: action.payload,
                };
            }
            default: {
                return state;
            }
        }
    };
