import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home'

const HomeRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoute
