import React, { useEffect, useState } from 'react'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import Navbar from '../Navbar/Navbar'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeams, fetchAllUsers } from '../State/GeneralData/Action'
import { createTask, deleteTask, getTask, updateTask } from '../State/Tasks/Action'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import ErrorAlert from '../General/ErrorAlert'
import SuccessAlert from '../General/SuccessAlert'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {
    CheckIfProfileLoad()
    const { id } = useParams()
    const generalData = useSelector(store => store.generalData)
    const tasks = useSelector(store => store.tasks)
    const dispatch = useDispatch()
    const [visibleErrorAlert, setVisibleErrorAlert] = useState(false)
    const [visibleSuccessAlert, setVisibleSuccessAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const navigate = useNavigate()
    const schema = yup.object().shape({
        name: yup.string().required(),
        desc: yup.string().required(),
        priority: yup.string().required()

    })
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: null,
            priority: null,
            users: null,
            desc: null,
            admins: null,
            team: null
        }
    })

    useEffect(() => {
        console.log("idzie")
        dispatch(getTask({ id: id }))
        dispatch(fetchAllUsers())
        dispatch(fetchAllTeams())
    }, [])

    useEffect(() => {

        if (!!tasks.editTask && !!generalData.allUsers) {
            reset({
                name: tasks.editTask?.name || '',
                priority: tasks.editTask?.priority || null,
                // users: tasks.editTask?.users.map((user)=> user.id),
                users: tasks.editTask?.users,
                desc: tasks.editTask?.desc,
                admins: tasks.editTask?.admins,
                teams: tasks.editTask?.teams
            })
            console.log(tasks.editTask?.users?.map((user) => user.id))
        }
    }, [tasks.editTask, generalData.allUsers])



    useEffect(() => {
        if (tasks.fail === "getTask") {
            navigate("/")
        }
        if (tasks.fail === "updateTask") {
            setAlertText("Something went wrong")
            setVisibleErrorAlert(true)
        }
        if (tasks.fail === "deleteTask") {
            setAlertText("Something went wrong")
            setVisibleErrorAlert(true)
        }

    }, [tasks.fail])

    useEffect(() => {
        if (tasks.success === "updateTask") {
            setAlertText("The task has been updated")
            setVisibleSuccessAlert(true)
            // reset()
        }
        if (tasks.success === "deleteTask") {
            setAlertText("The task has been deleted")
            setVisibleSuccessAlert(true)
            setTimeout(() => {
                setVisibleSuccessAlert(false)
                navigate("/tasks")
            }, 2000)

            // reset()
        }

    }, [tasks.success])


    const onSubmit = (data) => {
        let reqData = {
            id: id,
            name: data.name,
            description: data.desc,
            priority: data.priority,
            usersIds: data.users?.map((user) => user.id),
            adminsIds: data.admins?.map((user) => user.id),
            teamsIds: data.teams?.map((team) => team.id),
            status: null

        }

        // console.log(reqData)
        // console.log(data)
        dispatch(updateTask(reqData))
    }

    const handleOnClickDeleteTask = () => {
        dispatch(deleteTask({ id: id }))
    }

    return (

        <div className='flex flex-col h-screen'>
            <Navbar />
            {visibleErrorAlert === true && <ErrorAlert setV={setVisibleErrorAlert} text={alertText} />}
            {visibleSuccessAlert === true && <SuccessAlert setV={setVisibleSuccessAlert} text={alertText} />}
            <div className='flex flex-col justify-center items-center h-full' >
                <div className='flex flex-col p-4 border-solid border
                bg-white border-gray-200 shadow-md rounded-lg text-white items-center'>
                    <h1 className='text-[rgb(24,28,44)] mt-0'>Update task</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col w-[60rem]'>
                            <div className='flex flex-row'>
                                <div className='flex flex-col place-content-between mr-5'>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                {(generalData.allUsers && tasks.editTask) &&
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
                                                defaultValue={tasks.editTask?.users}
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
                                {(generalData.allUsers && tasks.editTask) &&
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
                                                defaultValue={tasks.editTask?.admins}
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
                                {(generalData.allTeams && tasks.editTask) &&
                                    <Controller
                                        control={control}
                                        name="teams"
                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                className='w-full mb-5'
                                                sx={{ '.MuiChip-root': { bgcolor: "rgb(159, 255, 188)" } }}
                                                multiple
                                                id="tags-outlined"
                                                options={generalData.allTeams}
                                                getOptionLabel={(option) => `${option.name}`}
                                                filterSelectedOptions
                                                value={value || []}
                                                defaultValue={tasks.editTask?.teams}
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
                        <div className='flex flex-row justify-between '>
                            <Button variant="contained" className='bg-red-400' onClick={handleOnClickDeleteTask}>Delete task</Button>
                            <Button type="submit" variant="contained">Update task</Button>
                        </div>





                    </form>
                </div>

            </div>

        </div>
    )
}

export default EditTask
