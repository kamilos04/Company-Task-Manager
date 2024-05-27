import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Button, Pagination } from '@mui/material'
import FilterBar from './FilterBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyTasks } from '../State/Tasks/Action'



const Tasks = () => {
  const auth = useSelector(store => store.auth)
  const tasks = useSelector(store => store.tasks)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const filteringData = useRef({
    userId: auth.profile?.id,
    sortedBy: "dateOfCreation",
    pageNumber: page - 1,
    filters: ['low', 'medium', 'high', 'waiting', 'inProgress', 'finished'],
    sortingDirection: 'asc'
  })

  useEffect(() => {
    filteringData.current.userId = auth.profile?.id
    filteringData.current.pageNumber = page - 1
    if (auth.profile) {
      try {
        dispatch(fetchMyTasks(filteringData.current))
      }
      catch (error) {
        console.log(error)
      }
    }

  }, [auth.profile, page])

  CheckIfProfileLoad()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleFilterSubmit = (data) => {
    let sortedBy = "name"
    let sortingDirection = "asc"
    let filters = []
    if (data.sortedBy === "nameAsc") {
      sortedBy = "name"
      sortingDirection = "asc"
    }
    else if (data.sortedBy === "nameDesc") {
      sortedBy = "name"
      sortingDirection = "desc"
    }
    else if (data.sortedBy === "dateOfCreationAsc") {
      sortedBy = "dateOfCreation"
      sortingDirection = "asc"
    }
    else if (data.sortedBy === "dateOfCreationDesc") {
      sortedBy = "dateOfCreation"
      sortingDirection = "desc"
    }
    if (data.low === true) {
      filters.push("low")
    }
    if (data.medium === true) {
      filters.push("medium")
    }
    if (data.high === true) {
      filters.push("high")
    }
    if (data.waiting === true) {
      filters.push("waiting")
    }
    if (data.inProgress === true) {
      filters.push("inProgress")
    }
    if (data.finished === true) {
      filters.push("finished")
    }

    filteringData.current = {
      userId: auth.profile?.id,
      sortedBy: sortedBy,
      pageNumber: page - 1,
      filters: filters,
      sortingDirection: sortingDirection
    }
    try {
      dispatch(fetchMyTasks(filteringData.current))
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row mt-[4rem]' >
        <div className='flex flex-col'>
          <FilterBar handleFilterSubmit={handleFilterSubmit} />
        </div>
        <div className='flex w-[100%] mr-40 ml-40 flex-col'>
          {tasks.mytasks?.map((task) => {
            // console.log(task)
            return <TaskAccordion key={task.id} task={task} />
          })}

          <div className='flex flex-row justify-center w-full mt-7 mb-5'>
            <Pagination count={Math.floor((tasks.totalElements-1) / 10) + 1} color="primary" size='large' page={page} onChange={handlePageChange} sx={{'.MuiPaginationItem-text': {color: 'white'}}}/>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Tasks
