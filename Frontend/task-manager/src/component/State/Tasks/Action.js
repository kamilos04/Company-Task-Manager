import axios from "axios"
import { API_URL } from "../../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const fetchMyTasks = createAsyncThunk("tasks/fetchMytasks", async (reqData) => {
        console.log(`${API_URL}/api/mytasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`)
        const jwt = localStorage.getItem("jwt")
        const {data} = await axios.get(`${API_URL}/api/mytasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`, {
                         headers:{
                             Authorization:`Bearer ${jwt}`
                         }
                     })
        return data
})

export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async (reqData) => {
    // console.log(`${API_URL}/api/mytasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`)
    const jwt = localStorage.getItem("jwt")
    console.log(reqData.taskData)
    const {data} = await axios.put(`${API_URL}/api/task`, reqData, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})
