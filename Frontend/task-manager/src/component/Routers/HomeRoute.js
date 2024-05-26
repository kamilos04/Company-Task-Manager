import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Register from '../Login/Register'
import Tasks from '../Tasks/Tasks'
import Profile from '../Profile/Profile'
import CreateNewTask from '../CreateNewTask/CreateNewTask'
import EditTask from '../EditTask.js/EditTask'
import TeamsAdmin from '../TeamsAdmin/TeamsAdmin'
import CreateTeam from '../CreateTeam/CreateTeam'
import EditTeam from '../EditTeam/EditTeam'
import TasksAdmin from '../TasksAdmin/TasksAdmin'
import UsersAdmin from '../UsersAdmin/UsersAdmin'

const HomeRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-new-task' element={<CreateNewTask/>}/>
        <Route path='/update-task/:id' element={<EditTask/>}/>
        <Route path='/teams-admin' element={<TeamsAdmin/>}/>
        <Route path='/create-new-team' element={<CreateTeam/>}/>
        <Route path='/update-team/:id' element={<EditTeam/>}/>
        <Route path='/tasks-admin' element={<TasksAdmin/>}/>
        <Route path='/users-admin' element={<UsersAdmin/>}/>
        <Route path='*' element={<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoute
