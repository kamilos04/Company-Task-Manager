import React, { useEffect } from 'react'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import Navbar from '../Navbar/Navbar'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeams, fetchAllUsers } from '../State/GeneralData/Action'
import { createTask } from '../State/Tasks/Action'

const CreateNewTask = () => {
  CheckIfProfileLoad()
  const generalData = useSelector(store => store.generalData)
  const dispatch = useDispatch()
  const { register, handleSubmit, control } = useForm({

  })

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllTeams())
  }, [])
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
      <div className='flex flex-col justify-center items-center h-full' >
        <div className='flex flex-col p-4 border-solid border
                bg-white border-gray-200 shadow-md rounded-lg text-white items-center'>
                  <h1 className='text-[rgb(24,28,44)] mt-0'>Create new task</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='flex flex-col place-content-between mr-5'>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    {...register("name")}
                    className='w-[25rem] '

                  />
                  <Controller
                    control={control}
                    name="priority"
                    render={({
                      field: { value, onChange } }) => (
                      <FormControl className='w-[25rem]' size='small'>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value || ""}
                          label="Priority"
                          onChange={onChange}
                        >
                          <MenuItem value="LOW">Low</MenuItem>
                          <MenuItem value="MEDIUM">Medium</MenuItem>
                          <MenuItem value="HIGH">High</MenuItem>
                        </Select>
                      </FormControl>

                    )} />
                </div>
                <TextField
                  className=' w-[30rem]'
                  id="desc"
                  label="Description"
                  multiline
                  variant="outlined"
                  rows={4}
                  {...register("desc")}

                />
              </div>
              <div className='mt-5'>
                {generalData.allUsers &&
                  <Controller
                    control={control}
                    name="users"
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        className=' mb-3 w-full'
                        sx={{ '.MuiChip-root': { bgcolor: "rgb(230, 186, 255)" } }}
                        multiple
                        id="tags-outlined"
                        options={generalData.allUsers}
                        getOptionLabel={(option) => `${option.name} ${option.surname}, ${"\xa0\xa0\xa0\xa0\xa0\xa0"}E-mail: ${option.email}`}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => {
                          if(option.email===value.email){
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
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        className='w-full mb-3'
                        sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 209, 255)" } }}
                        multiple
                        id="tags-outlined"
                        options={generalData.allUsers}
                        getOptionLabel={(option) => `${option.name} ${option.surname}, ${"\xa0\xa0\xa0\xa0\xa0\xa0"}E-mail: ${option.email}`}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => {
                          if(option.email===value.email){
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
                        className='w-full mb-3'
                        sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 255, 188)" } }}
                        multiple
                        id="tags-outlined"
                        options={generalData.allTeams}
                        getOptionLabel={(option) => `${option.name}`}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => {
                          if(option.name===value.name){
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
