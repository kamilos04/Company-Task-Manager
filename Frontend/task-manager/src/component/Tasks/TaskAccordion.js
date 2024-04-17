import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

const TaskAccordion = () => {
    return (
        <div>
            <Accordion className='bg-emerald-300 w-[50rem]'>
                <AccordionSummary
                    className='font-medium'
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                >
                    <div className='flex flex-row justify-between items-center w-[100%]'>
                        <div className='flex flex-row '>
                            <span className='mr-8'>Nazwa taska</span>
                            <span className=''>Data stworzenia: 09-04-2024 13:05</span>
                        </div>
                        <div className='flex flex-row '>
                            <Chip className='bg-green-500 mr-3' label="Low priority" />
                            <Chip className='bg-green-500 mr-3' label="Waiting" />
                        </div>


                    </div>


                </AccordionSummary>
                <AccordionDetails>
                    Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska. Opis taska.
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default TaskAccordion
