import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Register from '../Login/Register'
import Tasks from '../Tasks/Tasks'

const HomeRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoute
