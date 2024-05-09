import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const fetchAllUsers = createAsyncThunk("allUsers/fetchAllUsers", async (reqData) => {
        const jwt = localStorage.getItem("jwt")
        const {data} = await axios.get(`${API_URL}/api/allusers`, {
                         headers:{
                             Authorization:`Bearer ${jwt}`
                         }
                     })
        return data
})

export const fetchAllTeams = createAsyncThunk("allTeams/fetchAllTeams", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.get(`${API_URL}/api/allteams`, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

// export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async (reqData) => {
//     const jwt = localStorage.getItem("jwt")
//     const {data} = await axios.put(`${API_URL}/api/task`, reqData, {
//                      headers:{
//                          Authorization:`Bearer ${jwt}`
//                      }
//                  })
//     return data
// })
