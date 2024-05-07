import { createSlice } from "@reduxjs/toolkit"
import { fetchAllUsers } from "./Action"

const initialState = {
    allUsers: null,
    isLoading: false,
    error: null,
    success: null,
    fail: null,
}

const allUsersSlice = createSlice({
    name: "allUsers",
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
        
    }
})

export default allUsersSlice.reducer