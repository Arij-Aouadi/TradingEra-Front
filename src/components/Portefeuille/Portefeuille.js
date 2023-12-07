import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { AwesomeButton } from 'react-awesome-button';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import { ChartComponent } from './Charte';
import Ordre from '../Ordre/Ordre';


const dailyGain = 35.6;
const totalGain = 102.2;


const size = {
  width: 520,
  height: 370,
};

function Portefeuille() {
  const [positions, setPositions] = useState([]);
  const [solde, setSolde] = useState([]);
  const [revenuTotal, setRevenuTotal] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [simulatedPrices, setSimulatedPrices] = useState([]);

  useEffect(() => {   
    const fetchPositionsCount = async () => {
      try {
        const response = await axiosInstance.get('/count', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setPositionsCount(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de positions :', error);
      }
    };
    const fetchPositions = async () => {
      try {
        const response = await axiosInstance.get('/current-user-positions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setPositions(dataWithIds);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSolde = async () => {
      try {
        const response = await axiosInstance.get('/current-user-solde', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
         if (response.data !== null && response.data !== undefined) {
          setSolde(response.data);
        } else {
          console.error('Réponse invalide:', response);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du solde:', err);
      }
    };
    fetchPositions();
    fetchPositionsCount();
    fetchSolde();
// Configurer une fonction qui sera appelée toutes les X millisecondes (par exemple, toutes les 10 secondes)
 const intervalId = setInterval(() => {
      fetchPositions();
      fetchPositionsCount();
      fetchSolde();
}, 10000);
  return () => clearInterval(intervalId);
  }, []);

  const calculatePercentageFromSimulatedPrices = (positions, simulatedPrices) => {
    console.log('Positions:', positions);
    console.log('Simulated Prices:', simulatedPrices);
  
    const totalRevenu = calculateTotalRevenu(positions, simulatedPrices);
  
    console.log('Total Revenu:', totalRevenu);
  
    const percentages = positions
      .filter(position => position.statusPosition.toLowerCase() !== 'archivé')
      .map(position => {
        const simulatedPrice = simulatedPrices.find((price, index) => index === positions.indexOf(position));
        const revenu = position.quantité * (simulatedPrice - position.prixAchat);
        const pourcentageRevenu = (revenu / totalRevenu) * 100;
  
        return {
          label: position.nom,
          value: pourcentageRevenu.toFixed(2),
        };
      });
console.log('Percentages:', percentages);
  
    return percentages;
  };
  
 
   const calculateTotalRevenu = (positions, simulatedPrices) => {
    const totalRevenu = positions.reduce((acc, position, index) => {
      const revenuPartiel = position.quantité * (simulatedPrices[index] - position.prixAchat);
      console.log(`Position ${index + 1}: ${position.quantité} * (${simulatedPrices[index]} - ${position.prixAchat}) = ${revenuPartiel}`);
      return acc + revenuPartiel;
    }, 0);
  
    console.log(`Total Revenu: ${totalRevenu}`);
    return totalRevenu;
  };

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/');

  socket.on('connect', () => {
    console.log('Connected to Flask server');
  });

  socket.on('my_response', (data) => {
    console.log(`Received simulated prices: ${data.data}`);
    setSimulatedPrices(data.data);

    console.log("Positions:", positions);
    const totalRevenu = calculateTotalRevenu(positions, data.data);
    setRevenuTotal(totalRevenu);
    
    const percentages = calculatePercentageFromSimulatedPrices(positions, data.data);
    setChartData(percentages);
    console.log("Percentages:", percentages);
    setChartData(percentages);
  });

  return () => {
    socket.disconnect();
  };
}, [positions, setSimulatedPrices, setRevenuTotal, setChartData]);


  return (
    <Grid container spacing={1} width="100%" height="100%" sx={{}}>
              <Grid item xs={12} sx={{mt:2,display:'flex',justifyContent:'space-around',alignItems:'flex-start'}}>
                <Paper sx={{display:'flex',justifyContent:'space-around',alignItems:'center',minWidth:'70vw',minHeight:'50vh'}}>
              <div>
          <Typography variant="h6">Valeur Totale de portefeuille</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {`${ + revenuTotal}€`} 
          </Typography>
          <Divider sx={{ my: 3 }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Gain du jour: </strong>
            {dailyGain >= 0 ? (
              <TrendingUpIcon sx={{ color: 'green' }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'red' }} />
            )}
            <Typography variant="body2" sx={{ color: dailyGain >= 0 ? 'green' : 'red' }}>
              {dailyGain} €
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Gain Total: </strong>
            {totalGain >= 0 ? (
              <TrendingUpIcon sx={{ color: 'green' }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'red' }} />
            )}
            <Typography variant="body2" sx={{ color: totalGain >= 0 ? 'green' : 'red' }}>
              {totalGain} €
            </Typography>
          </div>
          <div sx={{ minHeight: "30vh", padding: 2 }}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Balance</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              
              <Typography variant="body1">Solde Total:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{solde}</Typography>
            </Box>
          </Box>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <strong style={{ marginRight: '10px', fontWeight: 'bold' }}>Nombre total d'actions: </strong>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {positionsCount} 
            </Typography>
          </div>
              </div>
              <div>
  {console.log('Rendering Chart with Data:', chartData)}
  <PieChart
            series={[
              {
                arcLabel: (item) => {
                  const labelParts = item.label.split(' ');
                  return labelParts.join('\n') + `\n(${item.value}%)`;
                },
                arcLabelMinAngle: 30,
                data: chartData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            {...size}
          />
            </div>
            </Paper>
            <Paper sx={{ minHeight: "50vh", minWidth: '25vw'}}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-evenly'}}>
        <AwesomeButton type="primary" className="aws-btn"><Typography sx={{fontFamily:'Orbitron',fontSize:'12px'}}>Sell</Typography></AwesomeButton>
        <AwesomeButton type="secondary" className="aws-btn"><Typography sx={{fontFamily:'Orbitron',fontSize:'12px'}}>Buy</Typography></AwesomeButton>
        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>
        <FormControl size='small' sx={{ m: 1, minWidth: 135 }}>
        <Typography sx={{fontSize: '9px',mb:0.25,fontFamily:'Orbitron'}}>Type ordre</Typography>
        <Select
          value='buy'//{typeOrdre}
          onChange=''//{handleChangeTypeOrdre}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'30px',fontFamily:'Orbitron',fontSize:'12px'}}
        >
          <MenuItem value={10} sx={{fontFamily:'Orbitron'}}>Limite</MenuItem>
          <MenuItem value={20} sx={{fontFamily:'Orbitron'}}>Marché</MenuItem>
          <MenuItem value={30} sx={{fontFamily:'Orbitron'}}>Stop</MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
      <Typography sx={{fontSize: '9px',mb:0.25,fontFamily:'Orbitron'}}>Quantité</Typography>

          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            sx={{height:'30px',fontFamily:'Orbitron',fontSize:'12px'}}
          />
        
        </FormControl>
        
        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>

        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
            <Typography sx={{fontSize: '9px',mb:0.25,fontFamily:'Orbitron'}}>{ /*a completer */}</Typography>

                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    sx={{height:'30px',fontFamily:'Orbitron'}}
                />
        </FormControl>
      
        <FormControl size='small' sx={{ m: 1, minWidth: 135 }}>
        <Typography sx={{fontSize: '9px',mb:0.25,fontFamily:'Orbitron'}}>Validité d'Ordre</Typography>
        <Select
          value=''//{validite}
          onChange=''//{handleChangeValidite}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'30px',fontFamily:'Orbitron',fontSize:'12px'}}
        >
          <MenuItem value={10} sx={{fontFamily:'Orbitron',fontSize:'12px'}}>un jour</MenuItem>
          <MenuItem value={20} sx={{fontFamily:'Orbitron',fontSize:'12px'}}>jusqu'à l'annulation</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between',ml:2,mr:2,fontSize:'8px'}}>
        <FormControlLabel sx={{fontSize:'8px',fontFamily:'Orbitron'}}  control={<Checkbox defaultChecked size='small' />} label="Stop-Loss"  />
        <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Take-Profit" labelPlacement="start" />
        </Grid>


        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>

        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
       
                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    placeholder='prix du stop'
                    sx={{height:'30px',fontFamily:'Orbitron',fontSize:"12px"}}
                />
        </FormControl>
      
        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='prix limite'
            sx={{height:'30px',fontFamily:'Orbitron',fontSize:"12px"}}
          />
        </FormControl>
        
        </Grid>
        </Paper>

</Grid>
<Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'flex-start'}}>
<div style={{minHeight: "100vh", minWidth: '97.5vw'}}>
    <Paper>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ borderBottom: 'none', padding: '3px' }}>Symbole</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>Nom</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>Quantité</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>Valeur Actuelle</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>Prix d'achat</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>Variation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ border: 'none' }}>
          {positions.map((position, index) => (
            <TableRow
              key={position.idP}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" sx={{ borderBottom: 'none', padding: '3px' }}>{position.symbole}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>{position.nom}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>{position.quantité}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>{simulatedPrices[index]}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>{position.prixAchat}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' }}>{position.variation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
</Grid>


       <Grid item xs={12}></Grid>
  </Grid>

     
    );
}

export default Portefeuille;
