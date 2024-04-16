import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'

const InvalidLoginAlert = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.setV(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        console.log("t")
        props.setV(false)
    }


    return (
        <div>
            <Alert sx={{ position: "fixed", top: "2rem", left: "50%", transform: "translateX(-50%)"}} variant="filled" severity="error" onClose={() => {handleClose()}}>
                This is a filled error Alert.
            </Alert>
        </div>
    )
}

export default InvalidLoginAlert
