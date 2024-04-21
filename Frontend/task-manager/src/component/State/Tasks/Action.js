import axios from "axios"
import { API_URL } from "../../config/api"
import { MYTASKS_FAILURE, MYTASKS_REQUEST, MYTASKS_SUCCESS } from "./ActionType"

export const getMyTasks=(reqData)=>async(dispatch)=>{
    dispatch({type:MYTASKS_REQUEST})
    try {
        const jwt = localStorage.getItem("jwt")
        const {data} = await axios.post(`${API_URL}/api/mytasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`, {
                         headers:{
                             Authorization:`Bearer ${jwt}`
                         }
                     })

        console.log("mytasks")
        dispatch({type:MYTASKS_SUCCESS, payload: {tasks: data.tasks, totalElements: data.totalElements}})
    }
    catch (error) {
        console.log("error", error)
        dispatch({type:MYTASKS_FAILURE, payload:error})
    }
}

// export const loginUser=(reqData)=>async(dispatch)=>{
//     dispatch({type:LOGIN_REQUEST})
//     try {
//         const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
//         if(data.jwt)localStorage.setItem("jwt", data.jwt)
//         console.log("login")
//         dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
//     }
//     catch (error) {
//         console.log("error", error)
//         dispatch({type:LOGIN_FAILURE, payload:error})
//     }
// }

// export const logoutUser=()=>async(dispatch)=>{
//     dispatch({type:LOGOUT_REQUEST})
//     try {
//         localStorage.clear();
//         console.log("logout")
//         dispatch({type:LOGOUT_SUCCESS})
//     }
//     catch (error) {
//         console.log("error", error)
//         dispatch({type:LOGOUT_FAILURE, payload:error})
//     }
// }

// export const getProfile=(reqData)=>async(dispatch)=>{
//     dispatch({type:PROFILE_REQUEST})
//     console.log("Test")
//     try {
//         const jwt = localStorage.getItem("jwt")
//         // const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTMxODY1NzIsImV4cCI6MTcxMzE5NTIxMiwiZW1haWwiOiJ0ZXN0MTExQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiIn0.UXKD66N8mZTScpQITCyzYD_59sVSkvPRJpG3Maj_I0g"
//         const {data} = await axios.get(`${API_URL}/api/profile`, {
//             headers:{
//                 Authorization:`Bearer ${jwt}`
//             }
//         })
//         console.log("profile")
//         dispatch({type:PROFILE_SUCCESS, payload: data})
        
//     }
//     catch (error) {
//         console.log("error", error)
//         dispatch({type:PROFILE_FAILURE, payload:error})
//     }
// }

