import { createSlice } from "@reduxjs/toolkit"
import { fetchProfile, loginUserRequest, registerUserRequest } from "./Action"

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
    reducers:{
        // logout(state){
        //     state.success = "logout"
        //     state.jwt = null
        //     state.profile = null
        // }
    },
    extraReducers: builder => {
        builder.addCase(loginUserRequest.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
        })
        .addCase(loginUserRequest.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "login"
            state.jwt = action.payload
        })
        .addCase(loginUserRequest.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="login"
        })
        .addCase(registerUserRequest.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null

        })
        .addCase(registerUserRequest.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = "register"
            state.jwt = action.payload

        })
        .addCase(registerUserRequest.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail = "register"
        })
        .addCase(fetchProfile.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null

        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = "profile"
            state.profile = action.payload

        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail = "profile"
            state.profile = null

        })
    }
})

export default authenticationSlice.reducer