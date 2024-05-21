import { createSlice } from "@reduxjs/toolkit"
import { createTeam } from "./Action"


const initialState = {
    isLoading: false,
    error: null,
    success: null,
    fail: null,
}


const teamsSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(createTeam.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            console.log("pending")
        })
        .addCase(createTeam.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "createTeam"
            console.log("fulfilled")
        })
        .addCase(createTeam.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="createTeam"
            console.log("rejected")
        })
       
        
    }
})

export default teamsSlice.reducer