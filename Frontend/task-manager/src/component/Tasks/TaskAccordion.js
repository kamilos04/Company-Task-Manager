import { Accordion, AccordionDetails, AccordionSummary, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import PriorityChip from './PriorityChip';
import StatusChip from './StatusChip';
import DescChip from './DescChip';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../State/Tasks/Action';
import { useNavigate } from 'react-router-dom';

const TaskAccordion = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(store => store.auth)

    const handleClickUpdateTask = () => {
        navigate(`/update-task/${props.task.id}`)
    }

    const ifUserHasPermissionToEditTask = () => {
        let permission = false
        let usersTeamsAdminNames = auth.profile.teamsAdmin.map((team) => team.name)
        console.log(usersTeamsAdminNames)
        props.task.teams.forEach((team) => {
            if(usersTeamsAdminNames.includes(team.name)){
                permission = true
            }
        })
        props.task.admins.forEach((admin) => {
            if(admin.id === auth.profile.id){
                permission = true
            }
        })
        console.log(permission)
        return permission
    }

    const handleStatusChange = (task) => (event, newValue) => {
        const taskData = {
            id: task.id,
            status: newValue,
            name: null,
            description: null,
            priority: null,
            usersIds: null,
            adminsIds: null,
            teamsIds: null
        }
        dispatch(updateTaskStatus(taskData))
    }

    return (

        <div className='flex w-[100%] mt-5'>
            <Accordion className='bg-slate-500 w-[100%] shadow-lg text-white'>
                <AccordionSummary
                    className='font-medium'
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                >
                    <div className='flex flex-row justify-between items-center w-[100%]'>
                        <div className='flex flex-row '>
                            <span className='mr-8 font-bold'>{props.task.name}</span>
                            <span className=''>Date of creation: {props.task.dateOfCreation}</span>
                        </div>
                        <div className='flex flex-row '>
                            <PriorityChip type={props.task.priority} />
                            <StatusChip type={props.task.status} />
                        </div>


                    </div>


                </AccordionSummary>
                <AccordionDetails className=''>
                    <div>
                        <span className='font-bold'>Description:<br /></span>
                        {props.task.desc}
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Teams:<br /></span>
                        <div className='font-medium mt-1 flex flex-row'>
                            {props.task.teams.map((team, index) => {
                                return (<DescChip type="team" text={team.name} key={index} />)
                            })}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Users:<br /></span>
                        <div className='font-medium mt-1 flex flex-row'>
                            {props.task.users.map((user, index) => {
                                return (<DescChip type="user" text={`${user.name} ${user.surname}`} key={index} />)
                            })}

                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Admins:<br /></span>
                        <div className='font-medium mt-1 flex flex-row'>
                            {props.task.admins.map((admin, index) => {
                                return (<DescChip type="admin" text={`${admin.name} ${admin.surname}`} key={index} />)
                            })}
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                    {ifUserHasPermissionToEditTask() && <Button variant="contained" className='mr-3' onClick={handleClickUpdateTask}>Update</Button>}
                        <ToggleButtonGroup
                            value={props.task.status}
                            exclusive
                            onChange={handleStatusChange(props.task)}
                            aria-label="Platform"
                            sx={{
                                '.MuiToggleButton-root': { color: 'white' },
                            }}
                        >
                            <ToggleButton value="WAITING" className='normal-case' sx={{
                                "&.Mui-selected": {
                                    color: "black",
                                    backgroundColor: '#9ffd9f'
                                }
                            }}>Waiting</ToggleButton>
                            <ToggleButton value="IN_PROGRESS" className='normal-case' sx={{
                                "&.Mui-selected": {
                                    color: "black",
                                    backgroundColor: '#9ffd9f'
                                }
                            }}>In progress</ToggleButton>
                            <ToggleButton value="FINISHED" className='normal-case' sx={{
                                "&.Mui-selected": {
                                    color: "black",
                                    backgroundColor: '#9ffd9f'
                                }
                            }}>Finished</ToggleButton>
                        </ToggleButtonGroup>
                    </div>


                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default TaskAccordion
