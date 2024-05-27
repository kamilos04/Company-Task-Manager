import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'
import { Button, Pagination } from '@mui/material'
import FilterBar from './FilterBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTasksAdmin, fetchMyTasks } from '../State/Tasks/Action'
import { useMediaQuery } from 'react-responsive';
import CheckIfProfileLoadAndIsSuperAdmin from '../Logic/checkIfProfileLoadAndIsSuperAdmin'
import { fetchProfile } from '../State/Authentication/Action'
import { useNavigate } from 'react-router-dom'



const Tasks = (props) => {


  const auth = useSelector(store => store.auth)
  const tasks = useSelector(store => store.tasks)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const [showFilterBar, setShowFilterBar] = useState(false)
  const isSmallScreen = useMediaQuery({ maxWidth: 1023 })
  const navigate = useNavigate()
  const filteringData = useRef({
    userId: auth.profile?.id,
    sortedBy: "dateOfCreation",
    pageNumber: page - 1,
    filters: ['low', 'medium', 'high', 'waiting', 'inProgress', 'finished'],
    sortingDirection: 'asc'
  })

  
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchProfile())
    }
    else {
      navigate("/login")
    }

  }, [dispatch]);

  useEffect(() => {
    if (auth.fail === "profile" && auth.profile === null) {
      navigate("/login")
    }
  }, [auth.fail])

  useEffect(() => {
    if (auth.success === "profile" && auth.profile?.role !== "SUPER_ADMIN" && props.superAdmin===true) {
      navigate("/")
    }

  }, [auth.success])

  // if(props.superAdmin===true){
  //   CheckIfProfileLoadAndIsSuperAdmin()
  // }
  // else{
  //   CheckIfProfileLoad()
  // }


  useEffect(() => {
    filteringData.current.userId = auth.profile?.id
    filteringData.current.pageNumber = page - 1
    if (auth.profile) {
      if (props.superAdmin === true) {
        dispatch(fetchAllTasksAdmin(filteringData.current))
      }
      else {
        dispatch(fetchMyTasks(filteringData.current))
      }
    }

  }, [auth.profile, page, props.superAdmin])



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
    if (props.superAdmin === true) {
      dispatch(fetchAllTasksAdmin(filteringData.current))
    }
    else {
      dispatch(fetchMyTasks(filteringData.current))
    }
  }

  const handleClickShowFilterBar = () => {
    setShowFilterBar(!showFilterBar)
  }
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-col max-lg:mt-[4rem] lg:flex-row max-lg:items-center' >
        {isSmallScreen && <Button variant="outlined" onClick={handleClickShowFilterBar} className='mt-4'>{showFilterBar ? "HIDE FILTER BAR" : "SHOW FILTER BAR"}</Button>}
        <div className='flex-row flex'>
          {(!isSmallScreen || showFilterBar) && <FilterBar handleFilterSubmit={handleFilterSubmit} />}
        </div>
        <div className='flex w-[100%] max-lg:p-3 mr-40 ml-40 flex-col'>
          {tasks.mytasks?.map((task) => {
            // console.log(task)
            return <TaskAccordion key={task.id} task={task} />
          })}

          <div className='flex flex-row justify-center w-full mt-7 mb-5'>
            <Pagination count={Math.floor((tasks.totalElements - 1) / 10) + 1} color="primary" size='large' page={page} onChange={handlePageChange} sx={{ '.MuiPaginationItem-text': { color: 'white' } }} />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Tasks
