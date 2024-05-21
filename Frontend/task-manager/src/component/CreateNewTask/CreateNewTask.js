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

const CreateNewTask = () => {
  CheckIfProfileLoad()
  const generalData = useSelector(store => store.generalData)
  const tasks = useSelector(store => store.tasks)
  const dispatch = useDispatch()
  const [visibleErrorAlert, setVisibleErrorAlert] = useState(false)
  const [visibleSuccessAlert, setVisibleSuccessAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const schema = yup.object().shape({
    name: yup.string().required(),
    desc: yup.string().required(),
    priority: yup.string().required()

  })
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllTeams())
  }, [])
  useEffect(() => {
    if (tasks.fail === "createTask") {
      setAlertText("Something went wrong")
      setVisibleErrorAlert(true)
    }

  }, [tasks.fail])

  useEffect(() => {
    if (tasks.success === "createTask") {
      setAlertText("The task has been created")
      setVisibleSuccessAlert(true)
      reset()
    }

  }, [tasks.success])

  const onSubmit = (data) => {
    let reqData = {
      name: data.name,
      desc: data.desc,
      priority: data.priority,
      usersIds: data.users?.map((user) => user.id),
      adminsIds: data.admins?.map((user) => user.id),
      teamsIds: data.teams?.map((team) => team.id)

    }
    console.log(reqData)
    console.log(data)
    dispatch(createTask(reqData))
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      {visibleErrorAlert === true && <ErrorAlert setV={setVisibleErrorAlert} text={alertText} />}
      {visibleSuccessAlert === true && <SuccessAlert setV={setVisibleSuccessAlert} text={alertText} />}
      <div className='flex flex-col justify-center items-center h-full' >
        <div className='flex flex-col p-4 border-solid border
                bg-white border-gray-200 shadow-md rounded-lg text-white items-center'>
          <h1 className='text-[rgb(24,28,44)] mt-0'>Create new task</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-[60rem]'>
              <div className='flex flex-row'>
                <div className='flex flex-col place-content-between mr-5'>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    {...register("name")}
                    className='w-[25rem] '
                    error={!!errors.name}
                    helperText={!!errors.name && "Name is required"}
                  />
                  <Controller
                    control={control}
                    name="priority"

                    render={({
                      field: { value, onChange } }) => (
                      <FormControl className='w-[25rem]' size='small'>
                        <InputLabel id="demo-simple-select-label" className={!!errors.priority && 'text-red-600'}>Priority</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          error={!!errors.priority}
                          value={value || ""}
                          label="Priority"
                          onChange={onChange}
                        >
                          <MenuItem value="LOW">Low</MenuItem>
                          <MenuItem value="MEDIUM">Medium</MenuItem>
                          <MenuItem value="HIGH">High</MenuItem>
                        </Select>
                        {!!errors.priority && <FormHelperText className='text-red-600'>Priority is required</FormHelperText>}
                      </FormControl>

                    )} />
                </div>
                <TextField
                  className=' flex-grow'
                  id="desc"
                  label="Description"
                  multiline
                  variant="outlined"
                  rows={5}
                  error={!!errors.desc}
                  helperText={!!errors.name && "Name is required"}

                  {...register("desc")}

                />
              </div>
              <div className='mt-10'>
                {generalData.allUsers &&
                  <Controller
                    control={control}
                    name="users"
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        className=' mb-7 w-full flex-grow-1'
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
                    render={({ field: { onChange, value  } }) => (
                      <Autocomplete
                        className='w-full mb-5'
                        sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 255, 188)" } }}
                        multiple
                        id="tags-outlined"
                        options={generalData.allTeams}
                        getOptionLabel={(option) => `${option.name}`}
                        filterSelectedOptions
                        value={value || []}
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
              <Button type="submit" variant="contained">Create task</Button>
            </div>





          </form>
        </div>

      </div>

    </div>
  )
}

export default CreateNewTask
