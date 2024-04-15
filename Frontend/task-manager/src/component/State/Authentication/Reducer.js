import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    jwt: null,
    success: null,
    profile: null,
}

export const authReducer=(state = initialState, action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case PROFILE_REQUEST:
            return{
                ...state, isLoading:true, error:null, success:null
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{
                ...state, isLoading:false, jwt:action.payload, success:"Login"
            };
        case LOGOUT_SUCCESS:
            return{
                ...state, isLoading:false, jwt: null, success:"Logout"
            };
        case PROFILE_SUCCESS:
            return{
                ...state, isLoading:false, success:"Profile", profile: action.payload
            }
        
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case PROFILE_FAILURE:
            return{
                ...state, isLoading:false, error: action.payload
            };
        default:
            return{...state}
    }
}