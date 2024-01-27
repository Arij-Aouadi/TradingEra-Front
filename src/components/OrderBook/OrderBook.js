import React from 'react'
import {Grid, Paper, ThemeProvider, Typography,Stack } from '@mui/material'
import io from 'socket.io-client';

function createData(prix, volume) {
  return { prix, volume };
}


const generateBuyersAndSellers = (coursActuel) => {
  const margin = 0.1;
  const buyers = [];
  const sellers = [];
  const mean = coursActuel;

  for (let i = 1; i <= 7; i++) {
    buyers.push(createData((mean - i * 0.1).toFixed(2), (Math.random() * 100).toFixed(2)));
    sellers.push(createData((mean + i * 0.1).toFixed(2), (Math.random() * 100).toFixed(2)));
  }
  sellers.reverse();
  return { buyers,sellers };
};

  
const OrderBook = ({symbolOfOrders,coursActuel}) => {
  //React.useEffect(()=>{
  //console.log(coursActuel,symbolOfOrders)

 // },[coursActuel,symbolOfOrders]);
 const { buyers, sellers } = generateBuyersAndSellers(coursActuel);

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
        justifyContent:'center',
        fontFamily:'Orbitron',
        fontSize:'13.5px'
       
        }}>
            <span>Cours Actuel {symbolOfOrders}  {coursActuel}</span>
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
