import { Chip } from '@mui/material'
import React from 'react'

const CustomChip = (props) => {
    return (
      <div>
        <Chip className={`mr-3 shadow-md mb-2 text-white text-base`} label={props.text} variant="outlined"/>
      </div>
    )
}

export default CustomChip
