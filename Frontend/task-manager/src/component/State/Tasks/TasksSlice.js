import { createSlice } from "@reduxjs/toolkit"
import { createTask, fetchMyTasks, updateTaskStatus } from "./Action"

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
        .addCase(updateTaskStatus.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(updateTaskStatus.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="updateTaskStatus"
            console.log("rejected")
        })
        .addCase(updateTaskStatus.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "updateTaskStatus"
            state.mytasks.forEach((task, index) => {
                if(task.id===action.payload.id){
                    state.mytasks[index] = action.payload
                }
            });
            console.log("fulfilled")
        })
        .addCase(createTask.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="createTask"
            console.log("rejected")
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "createTask"
            console.log("fulfilled")
        })
        
    }
})

export default tasksSlice.reducer