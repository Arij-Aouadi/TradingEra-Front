import React, { useEffect, useState } from 'react'
import {Grid, Paper, ThemeProvider, Typography,Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axiosInstance from '../../axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? ' rgba(0,0,0,0.3)' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const MakeNewOrder = () => {
  const [appData,setAppData]=useState([])
  useEffect(()=>{
    
    axiosInstance.get('/Position/showall')
    .then(res => {setAppData(res.data); })
    .catch(error => {
          console.error( error);
        });
  }
  ,[]);
  return (
    <Grid container spacing={1}>

        <Grid item xs={12} sx={{ml:1,mt:0.5}}>
        <div>
            <Stack direction="row" spacing={1}>
            <Item> Saisie Des Ordres </Item>
            <Item> Mon Portefeuille</Item>
            <Item> Ordres Ouverts</Item>
            </Stack>
        </div>

        </Grid>

        <Grid item xs={12}>
            <Paper sx={{backgroundColor: '  rgba(0,0,0,0.3) ',
             ml:1,mr:1,
             minHeight:'23vh',
             display:'flex',
             flexDirection: 'column',
             justifyContent: 'space-between'
        }}>
            <div>helloo</div>
            <Button variant="outlined" 
            size='small'
             color="secondary" 
             sx={{height:"25px",width:"147px",ml:1,mb:1}}>
                +Nouveau Ordre
                </Button>
            </Paper>
        </Grid>

      
    </Grid>
  )
}

export default MakeNewOrder
