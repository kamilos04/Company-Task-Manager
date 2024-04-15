import axios from "axios"
import { API_URL } from "../../config/api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if(data.jwt)localStorage.setItem("jwt", data.jwt)
        console.log("register")
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
    }
    catch (error) {
        console.log("error", error)
        dispatch({type:REGISTER_FAILURE, payload:error})
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if(data.jwt)localStorage.setItem("jwt", data.jwt)
        console.log("login")
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
    }
    catch (error) {
        console.log("error", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}

export const logoutUser=()=>async(dispatch)=>{
    dispatch({type:LOGOUT_REQUEST})
    try {
        localStorage.clear();
        console.log("logout")
        dispatch({type:LOGOUT_SUCCESS})
    }
    catch (error) {
        console.log("error", error)
        dispatch({type:LOGOUT_FAILURE, payload:error})
    }
}

export const getProfile=()=>async(dispatch)=>{
    dispatch({type:PROFILE_REQUEST})
    console.log("Test")
    try {
        // const jwt = localStorage.getItem("jwt")
        const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTMxODY1NzIsImV4cCI6MTcxMzE5NTIxMiwiZW1haWwiOiJ0ZXN0MTExQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiIn0.UXKD66N8mZTScpQITCyzYD_59sVSkvPRJpG3Maj_I0g"
        const {data} = await axios.get(`${API_URL}/api/profile`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        console.log("profile")
        dispatch({type:PROFILE_SUCCESS, payload: data})
        
    }
    catch (error) {
        console.log("error", error)
        dispatch({type:PROFILE_FAILURE, payload:error})
    }
}

