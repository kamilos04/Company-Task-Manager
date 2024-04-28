

// const initialState = {
//     isLoading: false,
//     error: null,
//     jwt: null,
//     success: null,
//     profile: null,
//     fail: null
// }

// export const authReducer=(state = initialState, action)=>{
//     switch (action.type) {
//         case LOGOUT_REQUEST:
//             return{
//                 ...state, isLoading:true, error:null, success:null, fail: null
//             };
//         case LOGOUT_SUCCESS:
//             return{
//                 ...state, isLoading:false, jwt: null, success:"logout"
//             };
//         case LOGOUT_FAILURE:
//             return{
//                 ...state, isLoading:false, error: action.payload, fail: "login"
//             };

//         default:
//             return{...state}
//     }
// }