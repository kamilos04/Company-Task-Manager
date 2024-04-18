import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

const TaskAccordion = () => {
    return (
        <div>
            <Accordion className='bg-white w-[50rem] shadow-lg'>
                <AccordionSummary
                    className='font-medium'
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                >
                    <div className='flex flex-row justify-between items-center w-[100%]'>
                        <div className='flex flex-row '>
                            <span className='mr-8 font-bold'>Nazwa taska</span>
                            <span className=''>Date of creation: 09-04-2024 13:05</span>
                        </div>
                        <div className='flex flex-row '>
                            <Chip className='bg-green-500 mr-3 shadow-md' label="Low priority" />
                            <Chip className='bg-green-500 mr-3 shadow-md' label="Waiting" />
                        </div>


                    </div>


                </AccordionSummary>
                <AccordionDetails className=''>
                    <div>
                        <span className='font-bold'>Description:<br/></span>
                    Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska.
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Teams:<br/></span>
                        <div className='font-medium mt-1'>
                            <Chip className='bg-green-300 mr-3 shadow-md' label="Backend developers" />
                            <Chip className='bg-green-300 mr-3 shadow-md' label="Help-desk" />
                            <Chip className='bg-green-300 mr-3 shadow-md' label="Backend developers" />
                            <Chip className='bg-green-300 mr-3 shadow-md' label="Backend developers" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Users:<br/></span>
                        <div className='font-medium mt-1'>
                            <Chip className='bg-violet-300 mr-3 shadow-md' label="Kamil Jach" />
                            <Chip className='bg-violet-300 mr-3 shadow-md' label="Jan Kowalski" />
                            <Chip className='bg-violet-300 mr-3 shadow-md' label="Franek Ostrowski" />
                            <Chip className='bg-violet-300 mr-3 shadow-md' label="Przemysław Polański" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Admins:<br/></span>
                        <div className='font-medium mt-1'>
                            <Chip className='bg-cyan-200 mr-3 shadow-md' label="Kamil Jach" />
                            <Chip className='bg-cyan-200 mr-3 shadow-md' label="Jan Kowalski" />
                        </div>
                    </div>
                    
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default TaskAccordion
