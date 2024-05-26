import { createSlice } from "@reduxjs/toolkit"
import { changePassword, changePasswordAdmin, createTask, deleteTask, fetchAllTasksAdmin, fetchMyTasks, getTask, updateTask, updateTaskStatus } from "./Action"

const initialState = {
    isLoading: false,
    error: null,
    success: null,
    fail: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(changePasswordAdmin.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(changePasswordAdmin.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "changePasswordAdmin"
            console.log("fulfilled")
        })
        .addCase(changePasswordAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="changePasswordAdmin"
            console.log("rejected")
        })

        
    }
})

export default usersSlice.reducer