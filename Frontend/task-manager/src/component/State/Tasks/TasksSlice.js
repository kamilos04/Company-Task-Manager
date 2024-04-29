import { createSlice } from "@reduxjs/toolkit"
import { fetchMyTasks } from "./Action"

const initialState = {
    mytasks: null,
    isLoading: false,
    error: null,
    success: null,
    fail: null,
    totalElements: null
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchMyTasks.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(fetchMyTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "fetchMyTasks"
            state.mytasks = action.payload.tasks
            state.totalElements = action.payload.totalElements
            console.log("fulfilled")
        })
        .addCase(fetchMyTasks.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="fetchMyTasks"
            console.log("rejected")
        })
    }
})

export default tasksSlice.reducer