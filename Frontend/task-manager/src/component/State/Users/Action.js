import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const changePasswordAdmin = createAsyncThunk("users/changePasswordAdmin", async (reqData) => {
        const jwt = localStorage.getItem("jwt")
        const {data} = await axios.get(`${API_URL}/auth/change-password-admin`, reqData, {
                         headers:{
                             Authorization:`Bearer ${jwt}`
                         }
                     })
        return data
})

