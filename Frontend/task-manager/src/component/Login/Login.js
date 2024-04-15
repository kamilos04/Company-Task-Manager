import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, loginUser } from '../State/Authentication/Action'
import { useNavigate } from 'react-router-dom'
import { store } from '../State/store'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(store=>store.auth)
  console.log(auth.profile)
  console.log(auth.jwt)

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);


//   useEffect(() => {
//     if(auth.fail === "profile" && auth.profile === null){
//         navigate("/")
//     }
// },[auth.fail])

  useEffect(() => {
    if(auth.success === "login"){
    navigate("/")
  }
  }, [auth.success])
  
  useEffect(() =>{
    if(auth.profile !== null){
      navigate("/")
    }
  }, [auth.profile])

  

  const onSubmit = (data) => {
    console.log(data)
    const requestBody = {
      userData: {email: data.email,
      password: data.password}
    }
    try{
      dispatch(loginUser(requestBody))
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-7 rounded-lg drop-shadow-lg flex-col'>
        <h1 className='text-3xl font-medium mt-4 mb-4'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <TextField
              color="primary"
              className='w-[20rem] text-trans'
              id="email"
              label="E-mail"
              variant="standard" 
              {...register("email")}/>

            <TextField
              type="password"
              className='w-[20rem]'
              id="password"
              label="Password"
              variant="standard" 
              {...register("password")}/>

          </Stack>
          <Button
            type="submit"
            className='w-[20rem]'
            sx={{ marginTop: "2rem" }}
            variant="contained">
            Sign in
          </Button>
        </form>
        <div className='pt-8 flex justify-center items-center text-[1rem]'>
          <span>Don't have account?</span>
          <Button sx={{ color: "#000000", fontSize: "1rem", fontWeight: 500 }}> Sign up</Button>
        </div>
      </div>
    </div>

  )
}

export default Login
