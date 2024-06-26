import { Chip } from '@mui/material'
import React from 'react'

const StatusChip = (props) => {
    let color = ""
    let text = "" 
    if(props.type === "WAITING"){
      color = "bg-sky-500"
      text= "Waiting"
    }
    else if(props.type === "IN_PROGRESS"){
      color = "bg-violet-500"
      text= "In progress"
    }
    else if(props.type === "FINISHED"){
      color = "bg-fuchsia-400"
      text= "Finished"
    }
    return (
      <div>
        <Chip className={`${color} mr-3 shadow-md max-lg:mt-2`} label={text} />
      </div>
    )
}

export default StatusChip
