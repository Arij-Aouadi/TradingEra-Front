import React from 'react'
import {Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import TradingViewWidget from '../CandlesChart/CandlesChart'
import StockList from '../StockList/StockList';
import MakeNewOrder from '../MakeAnOrder/MakeNewOrder'
import Ordre from '../Ordre/Ordre';

const Home = () => {
  var theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={1} width="100%" sx={{display:'flex',justifyContent: 'center',mt:0.25}}   >
      
      <Grid item xs={2.5} >
        <Paper sx={{minHeight:"86svh",background: `linear-gradient(135deg,#000000, #1e222d) `}} >
        <StockList></StockList>    </Paper>
      </Grid>

      <Grid item container xs={9.5} spacing={1}>
  <Grid item xs={8.5} sx={{}}>
    <Paper>
      <TradingViewWidget/>    
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{minHeight:"44vh",background: `linear-gradient(135deg,#000000, #1e222d) `}}>
    <Typography>Order Book here</Typography></Paper>
  </Grid>

  <Grid item xs={8.5} sx={{mt:1}}>
    <Paper sx={{minHeight:"39.25svh",background: `linear-gradient(135deg,#000000, #1e222d) `}}>
      <MakeNewOrder></MakeNewOrder>
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{height:"40vh",background: `linear-gradient(135deg,#000000, #1e222d) `}}>
        <Ordre></Ordre></Paper>
  </Grid>
</Grid>  

    </Grid></ThemeProvider>
  )
}

export default Home
