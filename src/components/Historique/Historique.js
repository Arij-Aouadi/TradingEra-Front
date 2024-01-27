
// Historique.js
import React, { useState ,useEffect} from 'react';
import { Grid, Paper , Typography} from '@mui/material';
import SimpleGrid from '../../components/Historique/tableauhistorique';
import Calculs from '../../components/Historique/histo';
import CumulativeReturnsChart from  '../../components/Historique/hchart';

const Historique = ({ userId }) => {
  const sampleData = [
    { date: '2022-01-01', cumulativeReturn: 0 },
    { date: '2022-01-02', cumulativeReturn: 0.02 },
  ];
  
  const [calculations, setCalculations] = useState({
    netProfit: 0,
    grossLoss: 0,
    grossProfit: 0,
  });

  const handleCalculationsUpdate = (newCalculations) => {
    setCalculations(newCalculations);
  };

  // Supposons que vous récupérez ces données de votre API ou de votre état global
  const positions = [
    { quantité: 10, prixAchat: 100 },
    { quantité: 5, prixAchat: 150 },
    { quantité: 5, prixAchat: 160 },
    { quantité: 5, prixAchat: 170 },
    { quantité: 5, prixAchat: 180 },
    { quantité: 5, prixAchat: 190 },
    { quantité: 5, prixAchat: 200 },
    { quantité: 5, prixAchat: 210 },

  ];

  const simulatedPrices = [
    110,
    160,
    160,
    210,
    250,
    300,
    350,
    400,

    // Ajoutez d'autres prix simulés au besoin
  ];
  

 
  return (
    <Grid container spacing={5} width="100%" height="100%" sx={{ display: 'flex', justifyContent: 'center', mt: 1, flexGrow: 1, overflow: 1, scrollbarWidth: 'none', '&::-webkit-scrollbar': { width: '0' } }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ minHeight: "25vh", background: `linear-gradient(135deg,#000000, #1e222d)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Calculs positions={positions} simulatedPrices={simulatedPrices} onUpdateCalculations={handleCalculationsUpdate} />
         <div>
         <Typography variant="h6" sx={{ fontWeight: 'bold', paddingBottom: 2, textAlign: 'left', fontFamily: 'Orbitron' }}>

            <p>Gross Profit: {calculations.grossProfit}</p>
            

            <p>Gross Loss: {calculations.grossLoss}</p>
            </Typography>
          </div>
          <div>

          </div>
          <div >
            < analysis ></ analysis>
          </div>
          
        </Paper>  
      </Grid>
          <Grid item xs={12} md={4}>
          <Paper sx={{minHeight:"25svh", background: `linear-gradient(135deg,#000000, #1e222d)`, borderRadius: '10px' }}>
          
          
          </Paper>
          </Grid>
           <Grid item xs={12} md={4}>
           <Paper sx={{ minHeight:"25svh",background: `linear-gradient(135deg,#000000, #1e222d)` }}>
           </Paper>
           </Grid>
           <Grid item xs={12} md={7}>
           <Paper sx={{ minHeight:"25svh",background: `linear-gradient(135deg,#000000, #1e222d)` }}>
           <SimpleGrid userId={userId} >
               </ SimpleGrid>  
           </Paper>
           </Grid>
           <Grid item xs={12} md={5}>
           <Paper sx={{minHeight:"50svh", background: `linear-gradient(135deg,#000000, #1e222d)` }}>
            <CumulativeReturnsChart data={sampleData}> </ CumulativeReturnsChart>

           </Paper>
           </Grid>
           
          
          
        </Grid>


  )
}

export default Historique;
