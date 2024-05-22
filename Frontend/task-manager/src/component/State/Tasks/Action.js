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
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.put(`${API_URL}/api/task`, reqData, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

export const createTask = createAsyncThunk("tasks/createTask", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.post(`${API_URL}/api/task`, reqData, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

export const updateTask = createAsyncThunk("tasks/updateTask", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.put(`${API_URL}/api/task`, reqData, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

export const getTask = createAsyncThunk("tasks/getTask", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.get(`${API_URL}/api/task?id=${reqData.id}`, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (reqData) => {
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.delete(`${API_URL}/api/task?id=${reqData.id}`, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})

export const fetchAllTasksAdmin = createAsyncThunk("tasks/fetchAllTasksAdmin", async (reqData) => {
    console.log(`${API_URL}/api/admin/alltasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`)
    const jwt = localStorage.getItem("jwt")
    const {data} = await axios.get(`${API_URL}/api/mytasks?id=${reqData.userId}&sortedBy=${reqData.sortedBy}&pageNumber=${reqData.pageNumber}&pageElementsNumber=10&filters=${reqData.filters}&sortingDirection=${reqData.sortingDirection}`, {
                     headers:{
                         Authorization:`Bearer ${jwt}`
                     }
                 })
    return data
})
