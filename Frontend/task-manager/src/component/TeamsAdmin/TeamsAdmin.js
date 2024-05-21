import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import TeamAccordion from './TeamAccordion'
import { fetchAllTeams } from '../State/GeneralData/Action'
import TaskAccordion from '../Tasks/TaskAccordion'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TeamsAdmin = () => {
    const dispatch = useDispatch()
    const generalData = useSelector(store => store.generalData)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchAllTeams())
    }, []) 

    const handleClickCreateTeam = () => {
       navigate("/create-new-team")
    }

    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-col justify-center items-center pt-10'>
                <div className='flex flex-wrap justify-center w-[80rem]'>
                    {generalData.allTeams?.map((team) => <TeamAccordion  team={team}/>)}
                    <Button variant="contained" className="w-[20rem] h-12 rounded-xl m-3" onClick={handleClickCreateTeam}>Create Team</Button>
                </div>
            </div>

        </div>
    )
}

export default TeamsAdmin
