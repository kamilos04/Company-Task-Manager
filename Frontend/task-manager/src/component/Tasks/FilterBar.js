import React from 'react'
import { Button, Checkbox, FormControlLabel, FormLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const FilterBar = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
          waiting: true,
          inProgress: true,
          finished: true,
          low: true,
          medium: true,
          high: true,
        }
      })
  
    return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
            <div className='flex flex-col items-left ml-6 mt-3'>
              <span className='text-xl font-medium'>Status</span>

              <Controller
                control={control}
                name="waiting"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="Waiting"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />

              <Controller
                control={control}
                name="inProgress"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="In progress"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />

              <Controller
                control={control}
                name="finished"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="Finished"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />




              <span className='text-xl font-medium mt-5'>Priority</span>
              <Controller
                control={control}
                name="low"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="Low"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />

              <Controller
                control={control}
                name="medium"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="Medium"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />

              <Controller
                control={control}
                name="high"
                render={({
                  field: { value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    onChange={onChange}
                    label="High"
                    control={<Checkbox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                    } />
                )} />

              <Button className='mt-5 w-[8rem] bg-green-300' variant="contained" type='submit'>FILTER</Button>
            </div>

          </form>
    </div>
  )
}

export default FilterBar
