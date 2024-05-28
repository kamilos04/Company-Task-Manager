import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import TeamAccordion from './TeamAccordion'
import { fetchAllTeams } from '../State/GeneralData/Action'
import TaskAccordion from '../Tasks/TaskAccordion'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CheckIfProfileLoadAndIsSuperAdmin from '../Logic/checkIfProfileLoadAndIsSuperAdmin'

const TeamsAdmin = () => {
    CheckIfProfileLoadAndIsSuperAdmin()
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
            <div className='flex flex-col justify-center items-center lg:pt-10 max-lg:mt-[4rem] '>
                <div className='flex max-lg:flex-col lg:flex-wrap justify-center  lg:w-[80rem] w-screen'>
                    <Button variant="contained" className="lg:w-[20rem] h-12 rounded-xl m-3" onClick={handleClickCreateTeam}>Create Team</Button>
                    {generalData.allTeams?.map((team) => <TeamAccordion key={team.id} team={team}/>)}
                    
                </div>
            </div>

        </div>
    )
}

export default TeamsAdmin
