import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const FilterBar = (props) => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            waiting: true,
            inProgress: true,
            finished: true,
            low: true,
            medium: true,
            high: true,
            sortedBy: "nameAsc"
        }
    })

    const FilterCheckBox = styled(Checkbox)({
        color: "white"
    })

    return (
        <div>
            <form onSubmit={handleSubmit((data) => props.handleFilterSubmit(data))}>
                <div className='flex flex-col bg-[rgb(32,36,52)] items-left pl-3 ml-3 mt-5 pt-2 pr-3 pb-4 border-solid border border-gray-200 shadow-md rounded-lg'>
                    <span className='text-xl font-medium text-white'>Status</span>

                    <Controller
                        control={control}
                        name="waiting"
                        render={({
                            field: { value, onChange } }) => (
                            <FormControlLabel
                                checked={value}
                                onChange={onChange}
                                label={<span className='text-white'>Waiting</span>}
                                control={<FilterCheckBox className='pt-1 pb-1 ' inputProps={{ 'aria-label': 'controlled' }} />
                                
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
                                label={<span className='text-white'>In progress</span>}
                                control={<FilterCheckBox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

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
                                label={<span className='text-white'>Finished</span>}
                                control={<FilterCheckBox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                                } />
                        )} />




                    <span className='text-xl font-medium mt-5 text-white'>Priority</span>
                    <Controller
                        control={control}
                        name="low"
                        render={({
                            field: { value, onChange } }) => (
                            <FormControlLabel
                                checked={value}
                                onChange={onChange}
                                label={<span className='text-white'>Low</span>}
                                control={<FilterCheckBox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

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
                                label={<span className='text-white'>Medium</span>}
                                control={<FilterCheckBox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

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
                                label={<span className='text-white'>High</span>}
                                control={<FilterCheckBox className='pt-1 pb-1' inputProps={{ 'aria-label': 'controlled' }} />

                                } />
                        )} />


                    <Controller
                        control={control}
                        name="sortedBy"
                        render={({
                            field: { value, onChange } }) => (
                            <FormControl className='w-[16rem] mt-5' size='small'>
                                <InputLabel className='text-white' id="demo-simple-select-label">Sorted by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Sorted by"
                                    onChange={onChange}
                                    className='text-white'
                                    sx={{color: 'white', borderColor: "red",
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                      },
                                    '.MuiSelect-iconOutlined': {
                                        color: 'white'
                                    }
                                }}
                                >
                                    <MenuItem value="nameAsc">Name A-Z</MenuItem>
                                    <MenuItem value="nameDesc">Name Z-A</MenuItem>
                                    <MenuItem value="dateOfCreationAsc">Date of creation - oldest</MenuItem>
                                    <MenuItem value="dateOfCreationDesc">Date of creation - latest</MenuItem>
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
