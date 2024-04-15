import { Button, Stack, TextField } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-7 rounded-lg drop-shadow-lg flex-col'>
        <h1 className='text-3xl font-medium mt-4 mb-4'>Login</h1>
        
        <Stack spacing={1}>
          <TextField  color="primary" className='w-[20rem] text-trans' id="email" label="E-mail" variant="standard" />
          <TextField type="password" className='w-[20rem]' id="password" label="Password" variant="standard" />
        </Stack>
        <Button className='w-[20rem]' sx={{marginTop: "2rem"}} variant="contained">Sign in</Button>
        <div className='pt-8 flex justify-center items-center text-[1rem]'><span>Don't have account?</span><Button sx={{color: "#000000", fontSize: "1rem", fontWeight: 500}}> Sign up</Button></div>
      </div>
    </div>

  )
}

export default Login
