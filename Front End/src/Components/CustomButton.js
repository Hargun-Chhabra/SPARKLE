// Neha Dadarwala - neha.dadarwala@dal.ca

import React from 'react'
import { Button } from '@mui/material';

const CustomButton = ({ label, onclickFunction }) => {
    return (
        <>
            <Button sx={{
                margin: '3%', float: 'right', backgroundColor: '#444454',
                color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
                borderRadius:4,
                ':hover': {
                    bgcolor: '#c4ccb9', 
                    color: '#4c4c4a',
                    fontWeight: 'bold'
                },
            }}
                variant="contained"
                onClick={onclickFunction}>
                {label}
            </Button>
        </>
    )
}

export default CustomButton