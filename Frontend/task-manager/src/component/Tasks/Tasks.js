import React from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Checkbox, FormControlLabel, FormLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const Tasks = () => {
  CheckIfProfileLoad()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      Tester: false,
    }
  })

  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row' >
        <div className='flex w-[25rem] shadow-md flex-col'>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Controller
              control={control}
              name="Tester"
              defaultValue={false}
              render={({
                field }) => (
                <FormControlLabel 
                {...field}
                label="TestS"
                 control={<Checkbox inputProps={{ 'aria-label': 'controlled' }}/>
              
                } />


              )}
            /><input type='submit' />
          </form>



          {/* <Checkbox
            checked={checked}
            onChange={handleChange}
            labe
            inputProps={{ 'aria-label': 'controlled' }}
          /> */}
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
