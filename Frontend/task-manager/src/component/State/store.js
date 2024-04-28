import { authReducer } from "./Authentication/Reducer";
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from "./Tasks/TasksSlice";
import authenticationReducer from "./Authentication/AuthenticationSlice"


export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        tasks: tasksReducer
    }
})
