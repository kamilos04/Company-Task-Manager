import React from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Button, Checkbox, FormControlLabel, FormLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import FilterBar from './FilterBar'

const Tasks = () => {
  CheckIfProfileLoad()

  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row' >
        <div className='flex shadow-md flex-col'>
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
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />
          <TaskAccordion />

        </div>
      </div>

    </div>
  )
}

export default Tasks
