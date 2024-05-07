import { Button } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../State/Authentication/Action';

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  return (
    <div className='w-[100%] shadow-lg   flex flex-row h-[4rem] justify-between items-center' style={{ borderBottom: '1px solid rgb(84, 87, 92)' }}>
      <div className='flex flex-row items-center'>
        <div className='ml-8 text-3xl text-white mr-8 fontlogo'>COMPANY TASK MANAGER</div>
        <Button onClick={() => { navigate("/") }} className={`ml-6  ${location.pathname === "/" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Home</Button>
        <Button onClick={() => { navigate("/tasks") }} className={`ml-2  ${location.pathname === "/tasks" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks</Button>
      </div>

      <div className='flex flex-row'>
        <AccountCircleIcon onClick={() => { navigate("/profile") }} className='text-4xl mr-6 text-white block cursor-pointer' />
        <LogoutIcon onClick={() => { dispatch(logoutUser(navigate)) }} className='text-4xl mr-4 block cursor-pointer text-white' />
      </div>
    </div>
  )
}

export default Navbar
