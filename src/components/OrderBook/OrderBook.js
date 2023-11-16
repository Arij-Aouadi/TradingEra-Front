import React from 'react'
import {Grid, Paper, ThemeProvider, Typography,Stack } from '@mui/material'

function createData(prix, volume) {
    return { prix, volume};
  }
  const sellers = [
    createData(215.14, 93.5),
    createData(215.12, 54.3),
    createData(215.01, 10.58),
    createData(214.99, 89.65),
    createData(214.98, 36.78),
    createData(214.60, 24.78),
    createData(214.57, 7.78),
  ];
  const buyers = [
    createData(214.55, 94.5),
    createData(214.53, 54.3),
    createData(214.50, 10.58),
    createData(214.49, 95.65),
    createData(214.48, 8.78),
    createData(214.45, 6.78),

  ];

  
  
const OrderBook = () => {
  return (
    <Grid container direction="column" >
    <Grid item xs={12} >
        <Paper sx={{minHeight:'20vh'}}>
        {sellers.map((seller)=>{ return(
            <Paper sx={{ml:1,mr:1,display:'flex',
            justifyContent:'space-between',
            background:`linear-gradient(90deg, transparent ${100-seller.volume}% , #a42630 ${seller.volume}%)`}}>
            <div>
            {seller.prix}
            </div>
            <div>{seller.volume}K</div>
            </Paper>)    

        })}
        </Paper>
    </Grid>

    <Grid item xs={12} >
        <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d)`,
        minHeight:'3vh',
        display:'flex',
        justifyContent:'center'
        }}>
            <span>Cours Actuel 214.56 - +3%</span>
        </Paper>

    </Grid>

    <Grid item xs={12}  >
    <Paper sx={{minHeight:'20vh'}}>
    {buyers.map((buyer)=>{ return(
            <Paper sx={{ml:1,mr:1,display:'flex',
            justifyContent:'space-between',
            background:`linear-gradient(90deg, transparent ${100-buyer.volume}% , #066656 ${buyer.volume}%)`
            }}>
            <div>
            {buyer.prix}
            </div>
            <div>{buyer.volume}K</div>
            </Paper>)    

        })}</Paper>
    </Grid>
    
      
    </Grid>
  )
}

export default OrderBook
