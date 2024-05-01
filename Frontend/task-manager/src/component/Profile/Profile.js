import React from 'react'
import Navbar from '../Navbar/Navbar'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { useSelector } from 'react-redux'
import CustomChip from './CustomChip'

const Profile = () => {
  CheckIfProfileLoad()
  const auth = useSelector(store => store.auth)
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-full' >
        <div className='flex flex-col bg-[rgb(32,36,52)] p-4 border-solid border border-gray-200 shadow-md rounded-lg text-white'>
          <div className='flex flex-col text-xl'>
            <div><span className='font-bold '>Name: </span><span>{auth.profile?.name}</span></div>
            <div className='mt-2'><span className='font-bold'>Surname: </span><span>{auth.profile?.surname}</span></div>
            <div className='mt-2'><span className='font-bold'>E-mail: </span><span>{auth.profile?.email}</span></div>
          </div>
          <div className='mt-5 text-xl flex flex-col'>
            <span className='font-bold mb-1'>Teams:</span>
            <div className='flex flex-row'>
              {auth.profile?.teams.map((team, index) => {
                return (<CustomChip text={team.name} key={index} />)
              })}
            </div>
          </div>
          <div className='mt-5 text-xl flex flex-col'>
            <span className='font-bold mb-1'>Teams with admin role:</span>
            <div className='flex flex-row'>
              {auth.profile?.teamsAdmin.map((team, index) => {
                return (<CustomChip text={team.name} key={index} />)
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Profile
