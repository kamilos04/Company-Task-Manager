import { Alert } from '@mui/material'
import React, { useEffect } from 'react'

const SuccessAlert = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.setV(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        props.setV(false)
    }


    return (
        <div>
            <Alert sx={{ position: "fixed", top: "2rem", left: "50%", transform: "translateX(-50%)"}} variant="filled" severity="success" onClose={() => {handleClose()}}>
                {props.text}
            </Alert>
        </div>
    )
}

export default SuccessAlert
