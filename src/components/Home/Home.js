import React from 'react'
import {Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
<<<<<<< HEAD
import CandlesChart from '../CandlesChart/CandlesChart'
import StockList from '../StockList/StockList';
=======
import TradingViewWidget from '../CandlesChart/CandlesChart'
import MakeNewOrder from '../MakeAnOrder/MakeNewOrder'

>>>>>>> 05b1817398a41dd4d527298e44409a47f46be315

const Home = () => {
  var theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={1} width="100%" sx={{mt:2,ml:1}}   >
      
      <Grid item xs={2} >
        <Paper sx={{minHeight:"83svh"}} >
        <StockList></StockList>    </Paper>
      </Grid>

      <Grid item container xs={10} rowSpacing={1} columnSpacing={1}>
  <Grid item xs={9} sx={{}}>
    <Paper>
      <TradingViewWidget/>    
      </Paper>
  </Grid>

  <Grid item xs={3}>
    <Paper sx={{minHeight:"49vh"}}>
    <Typography>Order Book here</Typography></Paper>
  </Grid>

  <Grid item xs={9} sx={{mt:1}}>
    <Paper sx={{minHeight:"32svh"}}>
      <MakeNewOrder></MakeNewOrder>
      </Paper>
  </Grid>

  <Grid item xs={3}>
    <Paper sx={{minHeight:"32svh"}}>
    <Typography>Positions: orders that went through</Typography></Paper>
  </Grid>
</Grid>  

    </Grid></ThemeProvider>
  )
}

export default Home
