import React from 'react'
import Navbar from '../Navbar/Navbar'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'

const Profile = () => {
    CheckIfProfileLoad()
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row' >
        
      </div>

    </div>
  )
}

export default Profile
