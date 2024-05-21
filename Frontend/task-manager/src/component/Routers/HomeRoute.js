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
        <Route path='*' element={<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoute
