import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescChip from '../Tasks/DescChip';

const TeamAccordion = (props) => {
  return (
    <div>
      <Accordion className='bg-slate-300 w-[20rem] shadow-xl shadow-slate-800 text-[rgb(24,28,44)] rounded-xl m-3'>
                <AccordionSummary
                    className='font-medium'
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                >
                    <div className='flex flex-row justify-between items-center w-[100%]'>
                        <div className='flex flex-row '>
                            <span className='mr-8 font-bold'>{props.team.name}</span>
                        </div>


                    </div>


                </AccordionSummary>
                <AccordionDetails className=''>
                    <div className='mt-3'>
                        <span className='font-bold'>Users:<br /></span>
                        <div className='font-medium mt-1 flex flex-row'>
                            {props.team.users.map((user, index) => {
                                return (<DescChip type="user" text={`${user.name} ${user.surname}`} key={index} />)
                            })}

                        </div>
                    </div>
                    <div className='mt-3'>
                        <span className='font-bold'>Admins:<br /></span>
                        <div className='font-medium mt-1 flex flex-row'>
                            {props.team.admins.map((admin, index) => {
                                return (<DescChip type="admin" text={`${admin.name} ${admin.surname}`} key={index} />)
                            })}
                        </div>
                    </div>



                </AccordionDetails>
            </Accordion>
    </div>
  )
}

export default TeamAccordion
