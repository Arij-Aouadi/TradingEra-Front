import React, { useState } from 'react'
import {Grid, Paper, ThemeProvider} from '@mui/material'
import { useTheme } from '@emotion/react'
import TradingViewWidget from '../CandlesChart/CandlesChart'
import StockList from '../StockList/StockList';
import MakeNewOrder from '../MakeAnOrder/MakeNewOrder'
import Ordre from '../Ordre/Ordre';
import OrderBook from '../OrderBook/OrderBook';
import { motion } from 'framer-motion';
import CustomSelect from '../Footer/Footer'
import SchoolPride from '../Confetti/SchoolPride';

const Home = () => {
  var theme = useTheme();
  const [confetti,setConfetti]=useState(false);
  const textAnimationVariants = {
    initial: { opacity: 1,},
    animate: { opacity: 0,},
    exit: { opacity: 0, },
  };



  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ x: "-100vh",
    transition: { ease: 'easeInOut' }}}
    style={{}}
    >
    <Grid container spacing={0.5} width="100%" height="100%" sx={{display:'flex',justifyContent: 'center',mt:0.25,flexGrow:1,
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      }}}   >

      <Grid item container xs={12} spacing={1} height="90%" sx={{
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      }}}>

        <Grid item xs={2.5} >
        <Paper sx={{minHeight:"86svh",background: `linear-gradient(135deg,#000000, #1e222d)`}} >
        <StockList></StockList>    </Paper>
        </Grid>

        <Grid item container xs={9.5} spacing={1}>
  <Grid item xs={8.5} sx={{}}>
    <Paper id="tradingview_a361e" sx={{height:'44vh',width:'100%'}}>
      <TradingViewWidget/>    
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{minHeight:"44vh",background: `linear-gradient(135deg,#000000, #1e222d) `,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <OrderBook/>
    </Paper>
  </Grid>

  <Grid item xs={8.5} sx={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
    <Paper sx={{minHeight:"41svh",background: `linear-gradient(135deg,#000000, #1e222d) `}}>
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

      </Grid> 

      <Grid item xs={12} height="10%">
        <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d) `}}>
          <CustomSelect> </CustomSelect>  </Paper>
      </Grid>

    </Grid>
    <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textAnimationVariants}
          transition={{ delay: 1 , duration: 1.6 }}
          style={{
            minWidth:'40%',
            minHeight:'35%',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000, // Make sure it's above other components
            textAlign: 'center',
            fontSize: '9rem',
            color: '#ffffff', // Change color as needed
            fontFamily: 'Orbitron',
            borderRadius: '40px',
            background:`linear-gradient(135deg,#000000, #1e222d)`,
            textShadow: "0px 0px 5px rgb(255,255,255)"
          }}
        >
          Day 1
        </motion.div>
        <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={textAnimationVariants}
        transition={{ delay: 1 , duration: 1.6 }}>
        <SchoolPride control={false}></SchoolPride>
        </motion.div>
    
    </motion.div>
  )
}

export default Home