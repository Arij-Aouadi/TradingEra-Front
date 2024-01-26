import React, { useState,useEffect } from 'react'
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
import io from 'socket.io-client'; 


const Home = () => {
  var theme = useTheme();
  const [confetti,setConfetti]=useState(false);
  const [symbolOnHome,setSymbolOnHome]=useState("AAPL");
  const [simulatedPrices, setSimulatedPrices] = useState([]);
  const symbols = ["GOOGL", "AAPL", "MSFT", "AMZN", "Meta","PYPL","NVDA","TSLA","ORCL","SHEL"] ;


  const findIndexInList = (list, searchString) => {
    const index = list.indexOf(searchString);
  
    return index;
  }


  const textAnimationVariants = {
    initial: { opacity: 1,},
    animate: { opacity: 0,},
    exit: { opacity: 0, },
  };
  const handleSymbolInHomePage= (data) =>{
    setSymbolOnHome(data);
  }
  const handleSimulatedPrices= (data) =>{
    setSimulatedPrices(data);
  }
  useEffect(() => {
    console.log(symbolOnHome)
  }, [symbolOnHome]);

  React.useEffect(()=>{
    const socket = io('http://127.0.0.1:5000/'); 

    socket.on('my_response', (data) => {
      setSimulatedPrices(data.data)
      });

  },[]);



  return (
    <motion.div
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
        <StockList handleSymbol={handleSymbolInHomePage} handlePrices={handleSimulatedPrices} Prices={simulatedPrices}></StockList>    </Paper>
        </Grid>

        <Grid item container xs={9.5} spacing={1}>
  <Grid item xs={8.5} sx={{}}>
    <Paper id="tradingview_a361e" sx={{height:'44vh',width:'100%'}}>
      <TradingViewWidget chartSymbol={symbolOnHome}/>    
      </Paper>
  </Grid>

  <Grid item xs={3.5}>
    <Paper sx={{minHeight:"44vh",background: `linear-gradient(135deg,#000000, #1e222d) `,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <OrderBook symbolOfOrders={symbolOnHome} coursActuel={simulatedPrices[findIndexInList(symbols,symbolOnHome)]}/>
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
        <Ordre symbolOfOrders={symbolOnHome} coursActuel={simulatedPrices[findIndexInList(symbols,symbolOnHome)]} idAction={findIndexInList(symbols,symbolOnHome)+1}></Ordre></Paper>
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
        transition={{ delay: 1 , duration: 1.6 }}>
        <SchoolPride control={false}></SchoolPride>
        </motion.div>
    
    </motion.div>
  )
}

export default Home