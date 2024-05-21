import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import TeamAccordion from './TeamAccordion'
import { fetchAllTeams } from '../State/GeneralData/Action'
import TaskAccordion from '../Tasks/TaskAccordion'

const TeamsAdmin = () => {
    const dispatch = useDispatch()
    const generalData = useSelector(store => store.generalData)
    useEffect(() => {
        dispatch(fetchAllTeams())
    }, []) 

    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-col justify-center items-center pt-10'>
                <div className='flex flex-wrap justify-center w-[80rem]'>
                    {generalData.allTeams?.map((team) => <TeamAccordion  team={team}/>)}
                    {/* <TeamAccordion/>
                    <TeamAccordion/>
                    <TeamAccordion/>
                    <TeamAccordion/>
                    <TeamAccordion/>
                    <TeamAccordion/> */}
                    
                    

                </div>
            </div>

        </div>
    )
}

export default TeamsAdmin
