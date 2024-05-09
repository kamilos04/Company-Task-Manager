
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from "./Tasks/TasksSlice";
import authenticationReducer from "./Authentication/AuthenticationSlice"
import generalDataReducer from "./GeneralData/GeneralDataSlice"


export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        tasks: tasksReducer,
        generalData: generalDataReducer
    }
})
