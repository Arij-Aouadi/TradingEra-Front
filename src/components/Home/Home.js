import React from 'react'
import {Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import TradingViewWidget from '../CandlesChart/CandlesChart'
import StockList from '../StockList/StockList';
import MakeNewOrder from '../MakeAnOrder/MakeNewOrder'
import Ordre from '../Ordre/Ordre';
import OrderBook from '../OrderBook/OrderBook';
import { motion } from 'framer-motion';

const Home = () => {
  var theme = useTheme();


  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ x: "-100vh",
    transition: { ease: 'easeInOut' }}}
    >
    <Grid container spacing={1} width="100%" sx={{display:'flex',justifyContent: 'center',mt:0.25}}   >
      
      <Grid item xs={2.5} >
        <Paper sx={{minHeight:"87svh",background: `linear-gradient(135deg,#000000, #1e222d)`}} >
        <StockList></StockList>    </Paper>
      </Grid>

      <Grid item container xs={9.5} spacing={1}>
  <Grid item xs={8.5} sx={{}}>
    <Paper>
      <TradingViewWidget/>    
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{minHeight:"44vh",background: `linear-gradient(135deg,#000000, #1e222d) `,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <OrderBook/>
    </Paper>
  </Grid>

  <Grid item xs={8.5} sx={{mt:1}}>
    <Paper sx={{minHeight:"39.25svh",background: `linear-gradient(135deg,#000000, #1e222d) `}}>
      <MakeNewOrder></MakeNewOrder>
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{height:"41vh",
                background: `linear-gradient(135deg,#000000, #1e222d) `,
                display:'flex',
                justifyContent:'center',
                alignItems:'center'}}>
        <Ordre></Ordre></Paper>
  </Grid>
</Grid>  

    </Grid></motion.div>
  )
}

export default Home
