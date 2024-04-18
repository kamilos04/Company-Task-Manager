import React from 'react'
import Navbar from '../Navbar/Navbar'
import TaskAccordion from './TaskAccordion'
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad'

const Tasks = () => {
  CheckIfProfileLoad()
  return (
    <div>
      <Navbar/>
      <TaskAccordion/>
    </div>
  )
}

export default Tasks
