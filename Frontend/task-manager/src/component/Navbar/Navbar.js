import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, logoutUser } from '../State/Authentication/Action';

const Navbar = () => {
  const auth = useSelector(store => store.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile())
  }, [])
  return (
    <div>
    <div className='w-[100%] shadow-lg   flex flex-row h-16 justify-between items-center' style={{ borderBottom: '1px solid rgb(84, 87, 92)' }}>
      <div className='flex flex-row items-center'>
        <div className='ml-8 text-3xl text-white mr-8 fontlogo'>COMPANY TASK MANAGER</div>
        <Button onClick={() => { navigate("/") }} className={`ml-6  ${location.pathname === "/" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Home</Button>
        <Button onClick={() => { navigate("/tasks") }} className={`ml-2  ${location.pathname === "/tasks" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks</Button>
        {auth.profile?.role==="SUPER_ADMIN" && <Button onClick={() => { navigate("/teams-admin") }} className={`ml-3  ${location.pathname === "/teams-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Teams - admin panel</Button>}
        {auth.profile?.role==="SUPER_ADMIN" && <Button onClick={() => { navigate("/tasks-admin") }} className={`ml-3  ${location.pathname === "/tasks-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks - admin panel</Button>}
        {auth.profile?.role==="SUPER_ADMIN" && <Button onClick={() => { navigate("/users-admin") }} className={`ml-3  ${location.pathname === "/users-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Users - admin panel</Button>}
      </div>

      <div className='flex flex-row'>
        <AccountCircleIcon onClick={() => { navigate("/profile") }} className='text-4xl mr-6 text-white block cursor-pointer' />
        <LogoutIcon onClick={() => { dispatch(logoutUser(navigate)) }} className='text-4xl mr-4 block cursor-pointer text-white' />
      </div>
    </div>
    </div>
  )
}

export default Navbar
