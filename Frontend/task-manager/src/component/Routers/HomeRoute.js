import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Register from '../Login/Register'

const HomeRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoute
