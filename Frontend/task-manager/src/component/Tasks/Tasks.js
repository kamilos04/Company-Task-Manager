import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Button, Checkbox, FormControlLabel, FormLabel, Pagination } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import FilterBar from './FilterBar'



const Tasks = () => {
  
  const handlePageChange = (event, value) => {
    setPage(value)
    console.log(event)
  }
  
  CheckIfProfileLoad()
  const [page, setPage] = useState(1)
  console.log(page)
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row' >
        <div className='flex flex-col'>
          <FilterBar />

        </div>
        <div className='flex w-[100%] mr-40 ml-40 flex-col'>
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <div className='flex flex-row justify-center w-full mt-7'>
            <Pagination count={3} color="primary" size='large' page={page} onChange={handlePageChange} />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Tasks
