import React, { useEffect, useState } from 'react'
import {Grid, Paper, ThemeProvider, Typography,Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import axiosInstance from '../../axios';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';



const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? ' rgba(0,0,0,0.3)' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const MakeNewOrder = () => {
  const [openOrders,setOpenOrders]=useState([])
  const [positions,setPositions]=useState([])
  const [closedOrders,setClosedOrders]=useState([])


  useEffect(()=>{
    
    axiosInstance.get('/ordre/showall')
    .then(res => {setOpenOrders(res.data); })
    .catch(error => {
          console.error( error);
        });

    axiosInstance.get('/Position/showall')
    .then(res => {setPositions(res.data); })
    .catch(error => {
    console.error( error);
    });    
  }
  ,[]);


  return (
    <Grid container spacing={0.5}>

        <Grid item xs={12} sx={{ml:1,mt:0.5}}>
        <div>
            <Stack direction="row" spacing={1}>
            <Button variant="contained" size='small' sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px'}} >Ordres Ouverts</Button>
            <Button variant="contained" size='small' sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px'}} >Positions</Button>
            <Button variant="contained" size='small' sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px'}} >Ordres Fermés</Button>
            <Button variant="contained" size='small' sx={{height:'25px',backgroundColor:'#131722',borderRadius:'10px'}} >Historique</Button>

            </Stack>
        </div>

        </Grid>

        <Grid item xs={12}>
            <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d) `,
             ml:1,mr:1,
             minHeight:'30vh',
             display:'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
        }}>
            <div>
            
            </div>
            </Paper>
        </Grid>

      
    </Grid>
  )
}

export default MakeNewOrder
