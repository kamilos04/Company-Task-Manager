import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
// import {logout} from "./AuthenticationSlice"


export const registerUserRequest = createAsyncThunk("auth/registerUserRequest", async (reqData) => {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
    if (data.jwt) localStorage.setItem("jwt", data.jwt)
    return data.jwt
})



export const loginUserRequest = createAsyncThunk("auth/loginUserRequest", async (reqData) => {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
    if (data.jwt) localStorage.setItem("jwt", data.jwt)
    console.log("login")
    return data.jwt
})


// export const logoutUser = () => async (dispatch) => {
//     dispatch({ type: LOGOUT_REQUEST })
//     try {
//         localStorage.clear();
//         console.log("logout")
//         dispatch({ type: LOGOUT_SUCCESS })
//     }
//     catch (error) {
//         console.log("error", error)
//         dispatch({ type: LOGOUT_FAILURE, payload: error })
//     }
// }

// export const logoutUser = () => async (dispatch) => {
//     localStorage.clear()
//     // dispatch(logout)
// }


// export const getProfile = (reqData) => async (dispatch) => {
//     dispatch({ type: PROFILE_REQUEST })
//     try {
//         const jwt = localStorage.getItem("jwt")
//         // const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTMxODY1NzIsImV4cCI6MTcxMzE5NTIxMiwiZW1haWwiOiJ0ZXN0MTExQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiIn0.UXKD66N8mZTScpQITCyzYD_59sVSkvPRJpG3Maj_I0g"
//         const { data } = await axios.get(`${API_URL}/api/profile`, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`
//             }
//         })
//         dispatch({ type: PROFILE_SUCCESS, payload: data })

//     }
//     catch (error) {
//         console.log("error", error)
//         dispatch({ type: PROFILE_FAILURE, payload: error.message })
//     }


// }

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const { data } = await axios.get(`${API_URL}/api/profile`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return data
})

