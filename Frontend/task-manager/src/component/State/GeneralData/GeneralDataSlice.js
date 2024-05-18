import { createSlice } from "@reduxjs/toolkit"
import { fetchAllTeams, fetchAllUsers, fetchTasksStats } from "./Action"

const initialState = {
    allUsers: null,
    isLoading: false,
    error: null,
    success: null,
    fail: null,
    allTeams: null,
    tasksStats: null
}

const generalDataSlice = createSlice({
    name: "generalData",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "fetchAllUsers"
            state.allUsers = action.payload
            console.log("fulfilled")
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="fetchAllUsers"
            console.log("rejected")
        })
        .addCase(fetchAllTeams.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(fetchAllTeams.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "fetchAllTeams"
            state.allTeams = action.payload
            console.log("fulfilled")
        })
        .addCase(fetchAllTeams.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="fetchAllTeams"
            console.log("rejected")
        })
        .addCase(fetchTasksStats.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(fetchTasksStats.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "fetchTasksStats"
            state.tasksStats = action.payload
            console.log("fulfilled")
        })
        .addCase(fetchTasksStats.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="fetchTasksStatus"
            console.log("rejected")
        })
    }
})

export default generalDataSlice.reducer