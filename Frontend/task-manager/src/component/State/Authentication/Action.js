import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {logout} from "./AuthenticationSlice"


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


export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const { data } = await axios.get(`${API_URL}/api/profile`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return data
})

export const logoutUser = (navigate) => (dispatch) => {
    console.log("logout")
    localStorage.clear()
    navigate("/login")
    dispatch(logout())
}