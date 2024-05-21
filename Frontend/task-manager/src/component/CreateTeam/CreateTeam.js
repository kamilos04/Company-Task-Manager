import React, { useEffect, useState } from 'react'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import Navbar from '../Navbar/Navbar'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeams, fetchAllUsers } from '../State/GeneralData/Action'
import { createTask } from '../State/Tasks/Action'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import ErrorAlert from '../General/ErrorAlert'
import SuccessAlert from '../General/SuccessAlert'
import { createTeam } from '../State/Teams/Action'


const CreateTeam = () => {
    CheckIfProfileLoad()
    const generalData = useSelector(store => store.generalData)
    const teams = useSelector(store => store.teams)
    const dispatch = useDispatch()
    const [visibleErrorAlert, setVisibleErrorAlert] = useState(false)
    const [visibleSuccessAlert, setVisibleSuccessAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const schema = yup.object().shape({
      name: yup.string().required(),
  
    })
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema)
    })
  
    useEffect(() => {
      dispatch(fetchAllUsers())
    }, [])
    useEffect(() => {
      if (teams.fail === "createTeam") {
        setAlertText("Something went wrong")
        setVisibleErrorAlert(true)
      }
  
    }, [teams.fail])
  
    useEffect(() => {
      if (teams.success === "createTeam") {
        setAlertText("The team has been created")
        setVisibleSuccessAlert(true)
        reset()
      }
  
    }, [teams.success])
  
    const onSubmit = (data) => {
      let reqData = {
        name: data.name,
        usersIds: data.users?.map((user) => user.id),
        adminsIds: data.admins?.map((user) => user.id),
        tasksIds: []
      }
      console.log(reqData)
      console.log(data)
      dispatch(createTeam(reqData))
    }
  
    return (
        <div className='flex flex-col h-screen'>
        <Navbar />
        {visibleErrorAlert === true && <ErrorAlert setV={setVisibleErrorAlert} text={alertText} />}
        {visibleSuccessAlert === true && <SuccessAlert setV={setVisibleSuccessAlert} text={alertText} />}
        <div className='flex flex-col justify-center items-center h-full' >
          <div className='flex flex-col p-4 border-solid border
                  bg-white border-gray-200 shadow-md rounded-lg text-white items-center'>
            <h1 className='text-[rgb(24,28,44)] mt-0'>Create new team</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col w-[50rem]'>
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      {...register("name")}
                      className='flex-grow '
                      error={!!errors.name}
                      helperText={!!errors.name && "Name is required"}
                    />
                <div className='mt-10'>
                  {generalData.allUsers &&
                    <Controller
                      control={control}
                      name="users"
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          className=' mb-7 w-full'
                          sx={{ '.MuiChip-root': { bgcolor: "rgb(230, 186, 255)" } }}
                          multiple
                          id="tags-outlined"
                          options={generalData.allUsers}
                          getOptionLabel={(option) => `${option.name} ${option.surname}, ${"\xa0\xa0\xa0\xa0\xa0\xa0"}E-mail: ${option.email}`}
                          filterSelectedOptions
                          value={value || []}
                          isOptionEqualToValue={(option, value) => {
                            if (option.email === value.email) {
                              return true
                            }
                            else return false
                          }}
                          onChange={(event, item) => {
                            onChange(item)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // placeholder="Users"
                              label="Users"
                            />
                          )}
                        />
                      )} />}
                  {generalData.allUsers &&
                    <Controller
                      control={control}
                      name="admins"
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          className='w-full mb-7'
                          sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 209, 255)" } }}
                          multiple
                          id="tags-outlined"
                          options={generalData.allUsers}
                          getOptionLabel={(option) => `${option.name} ${option.surname}, ${"\xa0\xa0\xa0\xa0\xa0\xa0"}E-mail: ${option.email}`}
                          filterSelectedOptions
                          value={value || []}
                          isOptionEqualToValue={(option, value) => {
                            if (option.email === value.email) {
                              return true
                            }
                            else return false
                          }}
                          onChange={(event, item) => {
                            onChange(item)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Admins"
                            // placeholder="Admins"
                            />
                          )}
                        />
                      )} />}
                  {generalData.allTeams &&
                    <Controller
                      control={control}
                      name="teams"
                      render={({ field: { onChange } }) => (
                        <Autocomplete
                          className='w-full mb-5'
                          sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 255, 188)" } }}
                          multiple
                          id="tags-outlined"
                          options={generalData.allTeams}
                          getOptionLabel={(option) => `${option.name}`}
                          filterSelectedOptions
                          isOptionEqualToValue={(option, value) => {
                            if (option.name === value.name) {
                              return true
                            }
                            else return false
                          }}
                          onChange={(event, item) => {
                            onChange(item)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // label="Users"
                              // placeholder="Teams"
                              label="Teams"
                            />
                          )}
                        />
                      )} />}
  
                </div>
              </div>
              <div className='flex flex-row justify-end '>
                <Button type="submit" variant="contained">Create team</Button>
              </div>
  
  
  
  
  
            </form>
          </div>
  
        </div>
  
      </div>
  )
}

export default CreateTeam
