import { createSlice } from "@reduxjs/toolkit"
import { createTeam, deleteTeam, updateTeam } from "./Action"


const initialState = {
    isLoading: false,
    error: null,
    success: null,
    fail: null,
}


const teamsSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        setSuccessNull(state) {
            state.success=null
        },
        setFailNull(state) {
            state.fail=null
        }
    },
    extraReducers: builder => {
        builder.addCase(createTeam.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            // console.log("pending")
        })
        .addCase(createTeam.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "createTeam"
            // console.log("fulfilled")
        })
        .addCase(createTeam.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="createTeam"
            // console.log("rejected")
        })
        .addCase(updateTeam.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            // console.log("pending")
        })
        .addCase(updateTeam.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "updateTeam"
            // console.log("fulfilled")
        })
        .addCase(updateTeam.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="updateTeam"
            // console.log("rejected")
        })
        .addCase(deleteTeam.pending, (state, action) => {
            state.isLoading = true
            state.error=null
            state.success= null
            state.fail = null
            // console.log("pending")
        })
        .addCase(deleteTeam.fulfilled, (state, action) => {
            state.isLoading = false
            state.success= "deleteTeam"
            // console.log("fulfilled")
        })
        .addCase(deleteTeam.rejected, (state, action) => {
            state.isLoading = false
            state.error=action.error
            state.fail="deleteTeam"
            // console.log("rejected")
        })
        
    }
})
export const { setSuccessNull, setFailNull } = teamsSlice.actions
export default teamsSlice.reducer