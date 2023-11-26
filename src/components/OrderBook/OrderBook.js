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
    <Grid container sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>

    <Grid item xs={12} sx={{minWidth:'100%',minHeight:'45%',display:'flex',justifyContent:'center',alignItems:'flex-end'}} >
        <Paper sx={{minWidth:'100%',minHeight:'100%',background: `linear-gradient(135deg,#000000, #1e222d)`}}>
        {sellers.map((seller)=>{ return(
            <Paper sx={{
              ml:1,
              mr:1,
              display:'flex',
            justifyContent:'space-between',
            background:`linear-gradient(90deg,transparent ${100-seller.volume}% ,#590d2e ${seller.volume}%)`,
             fontFamily:'Orbitron',
             fontSize:'13.5px'}}>
            <div>
            {seller.prix}
            </div>
            <div>{seller.volume}K</div>
            </Paper>)    

        })}
        </Paper>
    </Grid>

    <Grid item xs={12} sx={{minWidth:'100%',minHeight:'10%'}} >
        <Paper sx={{background: `linear-gradient(135deg,#000000, #1e222d)`,
        minHeight:'3vh',
        display:'flex',
        justifyContent:'center'
        }}>
            <span>Cours Actuel 214.56 - +3%</span>
        </Paper>

    </Grid>

    <Grid item xs={12}  sx={{minWidth:'100%',minHeight:'45%',display:'flex',justifyContent:'center',alignItems:'flex-start'}} >
    <Paper sx={{minWidth:'100%',minHeight:'100%',background: `linear-gradient(135deg,#000000, #1e222d)`}}>
    {buyers.map((buyer)=>{ return(
            <Paper sx={{ml:1,mr:1,display:'flex',
            justifyContent:'space-between',
            background:`linear-gradient(90deg, transparent ${100-buyer.volume}% , #133039 ${buyer.volume}%)`,
            fontFamily:'Orbitron',
            fontSize:'13.5px'
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
