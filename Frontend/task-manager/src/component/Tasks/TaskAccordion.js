import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import PriorityChip from './PriorityChip';
import StatusChip from './StatusChip';

const TaskAccordion = (props) => {
    return (

        <div className='flex w-[100%] mt-5'>
            <Accordion className='bg-slate-200 w-[100%] shadow-lg'>
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
                            <PriorityChip type={props.task.priority}/>
                            <StatusChip type={props.task.status}/>
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
                        <div className='font-medium mt-1'>
                            <Chip className='bg-green-300 mr-3 shadow-md mb-2' label="Backend developers" />
                            <Chip className='bg-green-300 mr-3 shadow-md mb-2' label="Help-desk" />
                            <Chip className='bg-green-300 mr-3 shadow-md mb-2' label="Backend developers" />
                            <Chip className='bg-green-300 mr-3 shadow-md mb-2' label="Backend developers" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Users:<br /></span>
                        <div className='font-medium mt-1'>
                            <Chip className='bg-violet-300 mr-3 shadow-md mb-2' label="Kamil Jach" />
                            <Chip className='bg-violet-300 mr-3 shadow-md mb-2' label="Jan Kowalski" />
                            <Chip className='bg-violet-300 mr-3 shadow-md mb-2' label="Franek Ostrowski" />
                            <Chip className='bg-violet-300 mr-3 shadow-md mb-2' label="Przemysław Polański" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Admins:<br /></span>
                        <div className='font-medium mt-1'>
                            <Chip className='bg-cyan-200 mr-3 shadow-md mb-2' label="Kamil Jach" />
                            <Chip className='bg-cyan-200 mr-3 shadow-md mb-2' label="Jan Kowalski" />
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default TaskAccordion
