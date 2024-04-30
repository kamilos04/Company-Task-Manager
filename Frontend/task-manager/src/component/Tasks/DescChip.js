import { Chip } from '@mui/material'
import React from 'react'

const DescChip = (props) => {
    let color = ""

    if(props.type === "admin"){
      color = "bg-cyan-200"
    }
    else if(props.type === "team"){
      color = "bg-green-300"
    }
    else if(props.type === "user"){
      color = "bg-violet-300"
    }
    return (
      <div>
        <Chip className={`${color} mr-3 shadow-md mb-2`} label={props.text} />
      </div>
    )
}

export default DescChip
