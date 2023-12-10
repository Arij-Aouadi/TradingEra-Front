import React, { useEffect, useState } from 'react'
import {Grid, Paper, ThemeProvider, Typography,Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import axiosInstance from '../../axios';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import OpenOrders from '../OpenOrdres/OpenOrders';



const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? ' rgba(0,0,0,0.3)' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const MakeNewOrder = () => {
  const [showOpenOrders,setShowOpenOrders]=useState(true)
  const [showPositions,setShowPositions]=useState(false)
  const [shwoClosedOrders,setShowClosedOrders]=useState(false)
  const [whatToShow,setWhatToShow]=useState('1')
  
  const handleShowOpenOrders= () => {
    setShowOpenOrders(true)
    setShowClosedOrders(false)
    setShowPositions(false)
    setWhatToShow("1")
  }

  const handleShowPositions= () => {
    setShowOpenOrders(false)
    setShowClosedOrders(false)
    setShowPositions(true)
    setWhatToShow("2")

  }

  const handleShowClosedOrders= () => {
    setShowOpenOrders(false)
    setShowClosedOrders(true)
    setShowPositions(false)
    setWhatToShow("3")

  }

  return (
    <Grid container spacing={0.5}>

        <Grid item xs={12} sx={{ml:1,mt:0.5}}>
        <div>
            <Stack direction="row" spacing={1}>
            <Button variant="contained" size='small' onClick={handleShowOpenOrders} sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px',fontFamily:'Orbitron',fontSize:'12px'}} >Ordres Ouverts</Button>
            <Button variant="contained" size='small' onClick={handleShowPositions} sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px',fontFamily:'Orbitron',fontSize:'12px'}} >Positions</Button>
            <Button variant="contained" size='small' onClick={handleShowClosedOrders} sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px',fontFamily:'Orbitron',fontSize:'12px'}} >Ordres Fermés</Button>
            <Button variant="contained" size='small' sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px',fontFamily:'Orbitron',fontSize:'12px'}} >Historique</Button>

            </Stack>
        </div>

        </Grid>

        <Grid item xs={12}>
            <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d) `,
             ml:1,mr:1,mt:1,mb:1,
             minHeight:'23vh',
             display:'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
        }}>
            <OpenOrders tab={whatToShow} />
            </Paper>
        </Grid>

      
    </Grid>
  )
}

export default MakeNewOrder
