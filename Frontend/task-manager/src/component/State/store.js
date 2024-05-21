
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from "./Tasks/TasksSlice";
import authenticationReducer from "./Authentication/AuthenticationSlice"
import generalDataReducer from "./GeneralData/GeneralDataSlice"
import teamsReducer from './Teams/TeamsSlice'

export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        tasks: tasksReducer,
        generalData: generalDataReducer,
        teams: teamsReducer
    }
})
