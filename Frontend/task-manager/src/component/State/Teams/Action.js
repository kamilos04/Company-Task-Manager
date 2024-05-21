import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const createTeam = createAsyncThunk("teams/createTeam", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.post(`${API_URL}/api/team`, reqData, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})
