import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logoutUser } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad';
import { Button } from '@mui/material';
import { fetchTasksStats } from '../State/GeneralData/Action';
import { PieChart } from "@mui/x-charts/PieChart"

const Home = () => {
  // const dispatch=useDispatch()
  // const auth = useSelector(store=>store.auth)
  const generalData = useSelector(store => store.generalData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createTaskHandleClick = () => {
    navigate("/create-new-task")
  }

  useEffect(() => {
    console.log("t")
    dispatch(fetchTasksStats())
  }, [])


  CheckIfProfileLoad()

  // console.log(auth.profile)
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-col h-full justify-center items-center'>
        <div className='flex flex-col bg-white p-8 shadow-md rounded-lg'>
          {!!generalData.tasksStats && <div className='p-4 bg-slate-300 shadow-md rounded-lg'>
            <PieChart
              series={[
                {
                  data: 
                  [
                    { id: 0, value: generalData.tasksStats.high, label: "High" },
                    { id: 1, value: generalData.tasksStats.medium, label: "Medium" },
                    { id: 2, value: generalData.tasksStats.low, label: "Low" }
                  ]
                }
              ]}
              width={400} 
              height={200}/>
          </div>}
          {!!generalData.tasksStats && <div className='p-4 bg-slate-300 shadow-md rounded-lg'>
            <PieChart
              series={[
                {
                  data: 
                  [
                    { id: 0, value: generalData.tasksStats.inProgress, label: "In progress" },
                    { id: 1, value: generalData.tasksStats.waiting, label: "Waiting" },
                    { id: 2, value: generalData.tasksStats.finished, label: "Finished" }
                  ]
                }
              ]}
              width={400} 
              height={200}
              className='mt-2'/>
          </div>}
          <Button variant="contained" className='w-36' onClick={createTaskHandleClick}>Create task</Button>
        </div>
      </div>

    </div>
  )
}

export default Home
