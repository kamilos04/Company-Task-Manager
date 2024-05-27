import React, { useEffect, useState } from 'react'
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
  const auth = useSelector(store => store.auth)
  // const [createTaskButtonVisible, setCreateTaskButtonVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createTaskHandleClick = () => {
    navigate("/create-new-task")
  }

  useEffect(() => {
    console.log("t")
    dispatch(fetchTasksStats())
  }, [])


  const isUserTeamAdminOrSuperAdmin = () => {
    let result = false
    if (auth.profile?.role === "SUPER_ADMIN" || auth.profile?.teamsAdmin.length > 0) {
      result = true
    }
    return result
  }

  CheckIfProfileLoad()

  // console.log(auth.profile)
  return (
    <div className='flex flex-col h-screen '>
      <Navbar />
      <div className='flex flex-col h-full max-lg:mt-[4rem] justify-center items-center'>
        <div className='flex flex-col  bg-white p-8 shadow-md rounded-lg'>
          <div className='flex flex-col lg:flex-row mb-5'>
            {!!generalData.tasksStats && <div className='p-4 bg-slate-200 shadow-md rounded-lg lg:flex flex-col items-center h-[20rem] w-[25rem] hidden'>
              <span className=' font-medium text-xl mb-3'>Status</span>
              <PieChart
                series={[
                  {
                    data:
                      [
                        { id: 0, value: generalData.tasksStats.inProgress, label: "In progress", color: "rgb(139 92 246)" },
                        { id: 1, value: generalData.tasksStats.waiting, label: "Waiting", color: "rgb(14 165 233)" },
                        { id: 2, value: generalData.tasksStats.finished, label: "Finished", color: "rgb(232 121 249)" }
                      ],
                    innerRadius: 12,
                    outerRadius: 95,
                    paddingAngle: 2,
                    cornerRadius: 5,

                  }
                ]}
                // width={400}
                // height={200}
                // sx={{height: '15rem'}}
                className='mt-2' />
            </div>}
            {!!generalData.tasksStats && <div className='p-4 bg-slate-200 shadow-md rounded-lg ml-5 lg:flex flex-col items-center  h-[20rem] w-[25rem] hidden'>
              <span className=' font-medium text-xl mb-3'>Priority</span>
              <PieChart
                series={[
                  {
                    data:
                      [
                        { id: 0, value: generalData.tasksStats.high, label: "High", color: "rgb(220 38 38)" },
                        { id: 1, value: generalData.tasksStats.medium, label: "Medium", color: "rgb(251 191 36)" },
                        { id: 2, value: generalData.tasksStats.low, label: "Low", color: "rgb(74 222 128)" }
                      ],
                    innerRadius: 12,
                    outerRadius: 95,
                    paddingAngle: 2,
                    cornerRadius: 5,
                  }
                ]}
              // width={400}
              // height={200} 
              />
            </div>}
            {!!generalData.tasksStats && <div className='p-4 bg-slate-200 shadow-md rounded-lg flex flex-col items-center lg:hidden mb-5'>
              <span className=' font-medium text-xl mb-3'>Status</span>
              <PieChart

                series={[
                  {
                    data:
                      [
                        { id: 0, value: generalData.tasksStats.inProgress, label: "In progress", color: "rgb(139 92 246)" },
                        { id: 1, value: generalData.tasksStats.waiting, label: "Waiting", color: "rgb(14 165 233)" },
                        { id: 2, value: generalData.tasksStats.finished, label: "Finished", color: "rgb(232 121 249)" }
                      ],

                  }
                ]}
              width={250}
              height={100}

              />
            </div>}
            
            {!!generalData.tasksStats && <div className='p-2 bg-slate-200 shadow-md rounded-lg flex flex-col items-center lg:hidden'>
              <span className=' font-medium text-xl mb-3'>Priority</span>
              <PieChart
                series={[
                  {
                    data:
                      [
                        { id: 0, value: generalData.tasksStats.high, label: "High", color: "rgb(220 38 38)" },
                        { id: 1, value: generalData.tasksStats.medium, label: "Medium", color: "rgb(251 191 36)" },
                        { id: 2, value: generalData.tasksStats.low, label: "Low", color: "rgb(74 222 128)" }
                      ],

                  }
                ]}
                width={250}
                height={100}
              />
            </div>}
          </div>

          {isUserTeamAdminOrSuperAdmin() && <Button variant="contained" className='w-36' onClick={createTaskHandleClick}>Create task</Button>}
        </div>
      </div>

    </div>
  )
}

export default Home
