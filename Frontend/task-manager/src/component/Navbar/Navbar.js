import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, logoutUser } from '../State/Authentication/Action';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const auth = useSelector(store => store.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [visibleMenuMobile, setVisibleMenuMobile] = useState(false)
  useEffect(() => {
    dispatch(fetchProfile())
  }, [])

  const handleClickMobileMenu = () => {
    setVisibleMenuMobile(!visibleMenuMobile)
    console.log(visibleMenuMobile)
  }
  return (
    <div>
      {/* Desktop */}
      <div className='hidden lg:flex w-[100%] shadow-lg flex-row h-16 justify-between items-center' style={{ borderBottom: '1px solid rgb(84, 87, 92)' }}>
        <div className='flex flex-row items-center'>
          <div className='ml-8 text-3xl text-white mr-8 fontlogo'>COMPANY TASK MANAGER</div>
          <Button onClick={() => { navigate("/") }} className={`ml-6  ${location.pathname === "/" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Home</Button>
          <Button onClick={() => { navigate("/tasks") }} className={`ml-2  ${location.pathname === "/tasks" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks</Button>
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/teams-admin") }} className={`ml-3  ${location.pathname === "/teams-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Teams - admin panel</Button>}
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/tasks-admin") }} className={`ml-3  ${location.pathname === "/tasks-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Tasks - admin panel</Button>}
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/users-admin") }} className={`ml-3  ${location.pathname === "/users-admin" ? "text-green-300" : "text-white"} text-lg normal-case`} variant="text">Users - admin panel</Button>}
        </div>

        <div className='flex flex-row'>
          <AccountCircleIcon onClick={() => { navigate("/profile") }} className='text-4xl mr-6 text-white block cursor-pointer' />
          <LogoutIcon onClick={() => { dispatch(logoutUser(navigate)) }} className='text-4xl mr-4 block cursor-pointer text-white' />
        </div>
      </div>

      {/* Mobile */}
      <div className='flex lg:hidden w-[100%] fixed flex-col justify-between items-center z-10 bg-[rgb(24,28,44)]' style={{ borderBottom: '1px solid rgb(84, 87, 92)' }}>
        <div className='flex justify-between  w-full  p-4 h-16'>
          <div className='ml-1 text-2xl text-white mr-1 fontlogo'></div>
          <div className='flex flex-row'>
            <AccountCircleIcon onClick={() => { navigate("/profile") }} className='text-4xl mr-6 text-white block cursor-pointer' />
            <LogoutIcon onClick={() => { dispatch(logoutUser(navigate)) }} className='text-4xl mr-4 block cursor-pointer text-white' />
            <MenuIcon onClick={() => { handleClickMobileMenu() }} className='text-4xl text-white block cursor-pointer' />
          </div>
        </div>

        {visibleMenuMobile && <div className='flex flex-col items-center bg- w-full mb-2'>

          <Button onClick={() => { navigate("/") }} className={`${location.pathname === "/" ? "text-green-300" : "text-white"} text-2xl normal-case pb-2 pt-2 border-b-2 border-slate-500 border-solid w-full`} variant="text">Home</Button>
          <Button onClick={() => { navigate("/tasks") }} className={`${location.pathname === "/tasks" ? "text-green-300" : "text-white"} text-2xl normal-case pb-2 pt-2 border-b-2 border-slate-500 border-solid w-full`} variant="text">Tasks</Button>
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/teams-admin") }} className={`${location.pathname === "/teams-admin" ? "text-green-300" : "text-white"} text-2xl normal-case pb-2 pt-2 border-b-2 border-slate-500 border-solid w-full`} variant="text">Teams - admin panel</Button>}
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/tasks-admin") }} className={`${location.pathname === "/tasks-admin" ? "text-green-300" : "text-white"} text-2xl normal-case pb-2 pt-2 border-b-2 border-slate-500 border-solid w-full`} variant="text">Tasks - admin panel</Button>}
          {auth.profile?.role === "SUPER_ADMIN" && <Button onClick={() => { navigate("/users-admin") }} className={`${location.pathname === "/users-admin" ? "text-green-300" : "text-white"} text-2xl normal-case pb-2 pt-2 `} variant="text">Users - admin panel</Button>}
        </div>}


      </div>

    </div>
  )
}

export default Navbar
