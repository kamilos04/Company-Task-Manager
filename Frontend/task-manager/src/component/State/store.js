
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from "./Tasks/TasksSlice";
import authenticationReducer from "./Authentication/AuthenticationSlice"
import allUsersReducer from "./AllUsers/AllUsersSlice"


export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        tasks: tasksReducer,
        allUsers: allUsersReducer
    }
})
