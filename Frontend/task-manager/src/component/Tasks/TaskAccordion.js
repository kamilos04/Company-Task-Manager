import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import PriorityChip from './PriorityChip';
import StatusChip from './StatusChip';
import DescChip from './DescChip';

const TaskAccordion = (props) => {
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

                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default TaskAccordion
