import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
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
            sortedBy: null
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


                    <Controller
                        control={control}
                        name="sortedBy"
                        render={({
                            field: { value, onChange } }) => (
                            <FormControl className='w-[16rem] mt-5 mr-6' size='small'>
                                <InputLabel className='text-black' id="demo-simple-select-label">Sorted by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Sorted by"
                                    onChange={onChange}
                                    
                                >
                                    <MenuItem value="nameAsc">Name A-Z</MenuItem>
                                    <MenuItem value="nameDesc">Name Z-A</MenuItem>
                                    <MenuItem value="dateOfCreationAsc">Date of creation - ascending</MenuItem>
                                    <MenuItem value="dateOfCreationDesc">Date of creation - descending</MenuItem>
                                </Select>
                            </FormControl>

                        )} />


                    <Button className='mt-5 w-[16rem] bg-green-300' variant="contained" type='submit'>FILTER</Button>

                </div>

            </form >
        </div >
    )
}

export default FilterBar
