import { Chip } from '@mui/material'
import React from 'react'

const DateChip = (props) => {
    return (
      <div>
        <Chip className={`bg-amber-200 mr-3 shadow-md max-lg:mt-2`} label={`Created: ${props.text}`} />
      </div>
    )
}

export default DateChip
