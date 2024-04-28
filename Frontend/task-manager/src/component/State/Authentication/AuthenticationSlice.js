import { createSlice } from "@reduxjs/toolkit"
import { loginUserRequest } from "./Action"

const initialState = {
    isLoading: false,
    error: null,
    jwt: null,
    success: null,
    profile: null,
    fail: null
}

const authenticationSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(loginUserRequest.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(loginUserRequest.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "login"
            state.jwt = action.payload
            console.log("fulfilled")
        })
        .addCase(loginUserRequest.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="login"
            console.log("rejected")
        })
    }
})

export default authenticationSlice.reducer