import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Button, Checkbox, FormControlLabel, FormLabel, Pagination } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import FilterBar from './FilterBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyTasks } from '../State/Tasks/Action'



const Tasks = () => {
  const auth = useSelector(store=>store.auth)
  const tasks = useSelector(store=>store.tasks)
  const dispatch = useDispatch()
  CheckIfProfileLoad()
  const handlePageChange = (event, value) => {
    setPage(value)
  }
  
  const handleFilterSubmit = (data) => {
    console.log(data)
    let sortedBy = "name"
    let sortingDirection = "asc"
    let filters = []
    if(data.sortedBy === "nameAsc"){
      sortedBy = "name"
      sortingDirection = "asc"
    }
    else if(data.sortedBy === "nameDesc"){
      sortedBy = "name"
      sortingDirection = "desc"
    }
    else if(data.sortedBy === "dateOfCreationAsc"){
      sortedBy = "dateOfCreation"
      sortingDirection = "asc"
    }
    else if(data.sortedBy === "dateOfCreationDesc"){
      sortedBy = "dateOfCreation"
      sortingDirection = "desc"
    }
    if(data.low === true){
      filters.push("low")
    }
    if(data.medium === true){
      filters.push("medium")
    }
    if(data.high === true){
      filters.push("high")
    }
    if(data.waiting === true){
      filters.push("waiting")
    }
    if(data.inProgress === true){
      filters.push("inProgress")
    }
    if(data.finished === true){
      filters.push("finished")
    }

    const requestBody = {
        userId: auth.profile.id,
        sortedBy: sortedBy,
        pageNumber: page, 
        filters: filters,
        sortingDirection: sortingDirection
    }
    try {
      dispatch(fetchMyTasks(requestBody))
    }
    catch (error) {
      console.log(error)
    }
  }

  const [page, setPage] = useState(1)

  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row' >
        <div className='flex flex-col'>
          <FilterBar handleFilterSubmit={handleFilterSubmit}/>

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
