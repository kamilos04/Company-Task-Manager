import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfile, registerUser } from '../State/Authentication/Action'
import { Button, Grid, Stack, TextField } from '@mui/material'
import { store } from '../State/store'
import { lightTheme } from '../Theme/LightTheme'
import ErrorAlert from './ErrorAlert'

const Register = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(store => store.auth)
    const [visibleAlert, setVisibleAlert] = useState(false)
    const [alertText, setAlertText] = useState("")

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    //if jwt is ok - go to /
    useEffect(() => {
        if (auth.profile !== null) {
            navigate("/")
        }
    }, [auth.profile])

    //if login succeffully - go to /
    useEffect(() => {
        if (auth.success === "register") {
            navigate("/")
        }
    }, [auth.success])




    const onSubmit = (data) => {
        console.log(data)
        let isOkToSubmit = true
        if (data.email == "") {
            setAlertText("Invalid email!")
            setVisibleAlert(true)
            isOkToSubmit = false
        }
        if (data.name == "") {
            setAlertText("Invalid name!")
            setVisibleAlert(true)
            isOkToSubmit = false
        }
        if (data.surname == "") {
            setAlertText("Invalid surname!")
            setVisibleAlert(true)
            isOkToSubmit = false
        }
        if (data.password.length < 5) {
            setAlertText("Password has to be longer than 5 characters!")
            setVisibleAlert(true)
            isOkToSubmit = false
        }

        if (isOkToSubmit === true) {
            const requestBody = {
                userData: {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    surname: data.surname
                }
            }
            try {
                dispatch(registerUser(requestBody))
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {visibleAlert && <ErrorAlert text={alertText} setV={setVisibleAlert} />}
            <div className='bg-white p-7 rounded-lg drop-shadow-lg flex-col'>
                <h1 className='text-3xl font-medium mt-4 mb-4'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{
                        width: "25rem",
                        [lightTheme.breakpoints.down('sm')]: {
                            width: "80vw",
                        },
                    }}>
                        <Grid item xs={6}>
                            <TextField
                                color="primary"
                                className=''
                                id="name"
                                fullWidth
                                label="Name"
                                variant="standard"
                                {...register("name")} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                color="primary"
                                className=''
                                id="surname"
                                fullWidth
                                label="Surname"
                                variant="standard"
                                {...register("surname")} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="primary"
                                className='w-[20rem]'
                                id="email"
                                fullWidth
                                label="E-mail"
                                variant="standard"
                                {...register("email")} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                className='w-[20rem]'
                                id="password"
                                fullWidth
                                label="Password"
                                variant="standard"
                                {...register("password")} />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        className='w-[10rem]'
                        sx={{ marginTop: "2rem" }}
                        variant="contained">
                        Sign up
                    </Button>


                </form>
                <div className='pt-8 flex justify-center items-center text-[1rem]'>
                    <span>Do you have an account?</span>
                    <Button onClick={() => (navigate("/login"))} sx={{ color: "#000000", fontSize: "1rem", fontWeight: 500 }}> Sign in</Button>
                </div>
            </div>
        </div>

    )
}

export default Register
