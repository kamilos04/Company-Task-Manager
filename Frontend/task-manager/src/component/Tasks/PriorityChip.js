import { Chip } from '@mui/material'
import React from 'react'

const PriorityChip = (props) => {
  let color = ""
  let text = "" 
  if(props.type === "LOW"){
    color = "bg-green-400"
    text= "Low priority"
  }
  else if(props.type === "MEDIUM"){
    color = "bg-amber-400"
    text= "Medium priority"
  }
  else if(props.type === "HIGH"){
    color = "bg-red-600"
    text= "High priority"
  }
  return (
    <div>
      <Chip className={`${color} mr-3 shadow-md `} label={text} />
    </div>
  )
}

export default PriorityChip
