import { authReducer } from "./Authentication/Reducer";
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from "./Tasks/TasksSlice";


export const store = configureStore({
    reducer: {
        auth:authReducer,
        tasks: tasksReducer
    }
})
