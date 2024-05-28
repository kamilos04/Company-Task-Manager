import React, { useEffect, useState } from 'react'
import CheckIfProfileLoadAndIsSuperAdmin from '../Logic/checkIfProfileLoadAndIsSuperAdmin'
import Navbar from '../Navbar/Navbar'
import ErrorAlert from '../General/ErrorAlert'
import SuccessAlert from '../General/SuccessAlert'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { fetchAllUsers } from '../State/GeneralData/Action'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, Button, TextField } from '@mui/material'
import { changePasswordAdmin } from '../State/Users/Action'
import { setFailNull, setSuccessNull } from '../State/Users/UsersSlice'


const UsersAdmin = () => {
    CheckIfProfileLoadAndIsSuperAdmin()
    const dispatch = useDispatch()
    const generalData = useSelector(store => store.generalData)
    const [visibleErrorAlert, setVisibleErrorAlert] = useState(false)
    const [visibleSuccessAlert, setVisibleSuccessAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const users = useSelector(store => store.users)
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])


    const schema = yup.object().shape({
        newPassword: yup.string().required(),
        user: yup.object().required(),
        // priority: yup.string().required()

    })

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        let reqData = {
            id: data.user.id,
            newPassword: data.newPassword
        }
        dispatch(changePasswordAdmin(reqData))
        console.log(reqData)
    }

    useEffect(() => {
        if (users.fail === "changePasswordAdmin") {
          setAlertText("Something went wrong")
          setVisibleErrorAlert(true)
          dispatch(setFailNull())
        }
    
      }, [users.fail])
    
      useEffect(() => {
        if (users.success === "changePasswordAdmin") {
          setAlertText("Password has been changed")
          setVisibleSuccessAlert(true)
          reset()
          dispatch(setSuccessNull())
        }
    
      }, [users.success])

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            {visibleErrorAlert === true && <ErrorAlert setV={setVisibleErrorAlert} text={alertText} />}
            {visibleSuccessAlert === true && <SuccessAlert setV={setVisibleSuccessAlert} text={alertText} />}
            <div className='flex flex-col h-full justify-center items-center'>
                <div className='flex flex-col bg-white p-4 shadow-md rounded-lg items-center max-lg:w-full'>
                <h1 className='text-[rgb(24,28,44)] mt-0 text-3xl'>Change user password</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='max-lg:w-full'>
                        <div className='flex flex-col'>
                            {generalData.allUsers && <Controller
                                control={control}
                                name="user"
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        className='lg:w-[30rem]'
                                        disablePortal
                                        id="combo-box-demo"
                                        value={value}
                                        options={generalData.allUsers}
                                        error="Test"

                                        getOptionLabel={(option) => `${option.name} ${option.surname}, ${"\xa0\xa0\xa0\xa0\xa0\xa0"}E-mail: ${option.email}`}
                                        // sx={{ width: 300 }}
                                        // isOptionEqualToValue={(option, value) => {
                                        //     if (option.email === value.email) {
                                        //       return true
                                        //     }
                                        //     else return false
                                        //   }}
                                        onChange={(event, item) => {
                                            onChange(item)
                                        }}
                                        renderInput={(params) => <TextField {...params} label="User"
                                            error={!!errors.user}
                                            helperText={!!errors.user && "User is required"} />}
                                    />

                                )} />}
                            <TextField
                                id="newPassword"
                                label="New password"
                                variant="outlined"
                                type='password'
                                {...register("newPassword")}
                                className='lg:w-[30rem] mt-5'
                                error={!!errors.newPassword}
                                helperText={!!errors.newPassword && "Password is required"}
                            />

                            <Button type="submit" variant="contained" className='mt-5'>Change password</Button>
                        </div>

                    </form>


                </div>
            </div>

        </div>
    )
}

export default UsersAdmin
