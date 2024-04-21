import { MYTASKS_FAILURE, MYTASKS_REQUEST, MYTASKS_SUCCESS } from "./ActionType"

const initialState = {
    mytasks: null,
    isLoading: false,
    error: null,
    success: null,
    fail: null,
    totalElements: null
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case MYTASKS_REQUEST:
            return {
                ...state, isLoading: true, error: null, success: null, fail: null, totalElements: null
            };
        case MYTASKS_SUCCESS:
            return {
                ...state, isLoading: false, error: action.payload, fail: "mytasks", success: "mytasks", mytasks: action.payload.tasks, totalElements: action.payload.totalElements
            };
        case MYTASKS_FAILURE:
            return {
                ...state, isLoading: false, error: action.payload, success: null, fail: "mytasks", mytasks: null, totalElements: null
            };

        default:
            return { ...state }
    }
}