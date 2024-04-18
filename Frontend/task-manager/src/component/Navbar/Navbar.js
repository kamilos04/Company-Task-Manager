import { Button, Stack } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  return (
    <div className='w-[100%] shadow-lg  bg-blue-500 flex flex-row h-[4rem] justify-between items-center'>
      <div className='flex flex-row items-center'>
        <div className='ml-8 text-xl font-bold text-white mr-[2rem]'>TASK MANAGER</div>
        <Button onClick={() => {navigate("/")}} className={`ml-6  ${location.pathname=="/" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Home</Button>
        <Button onClick={() => {navigate("/tasks")}} className={`ml-2  ${location.pathname=="/tasks" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks</Button>
      </div>

      <div>
        <AccountCircleIcon className='text-4xl mr-6 block cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar
