import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { AwesomeButton } from 'react-awesome-button';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import Ordre from '../Ordre/Ordre';
import { FaAirbnb, FaAmazon, FaAndroid, FaApple, FaBuilding, FaEtsy, FaFacebook, FaGoogle, FaInstagram, FaMicrosoft, FaPaypal, FaSnapchat, FaSquare, FaTwitter, FaUber } from 'react-icons/fa';
import MuiChartsLegend from '@mui/x-charts/PieChart';
import Switch from '@mui/material/Switch';

const dailyGain = 35.6;
const totalGain = 102.2;




const size = {
  width: 570,
  height: 420,
};


function Portefeuille() {
  const [positions, setPositions] = useState([]);
  const [solde, setSolde] = useState([]);
  const [revenuTotal, setRevenuTotal] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [simulatedPrices, setSimulatedPrices] = useState([]);
  const [dailyGain, setDailyGain] = useState(0);  
  const [showPositionsOfActions,setShowPositionsOfActions]=useState(true)
  const [showPositionsOfOptions,setShowPositionsOfOptions]=useState(false)
  const [whatToShow,setWhatToShow]=useState('1')
  const handleShowActions= () => {
    setShowPositionsOfActions(true)
    setShowPositionsOfOptions(false)
    setWhatToShow("1")
  }

  const handleShowOptions= () => {
    setShowPositionsOfActions(false)
    setShowPositionsOfOptions(true)
    setWhatToShow("2")

  }
  const formatDate= (dateString)=> {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC', // You might want to adjust the timezone
    };
    return date.toLocaleString('en-US', options);
  }
  const getIconForCompany = (companyName) => {
    if (companyName === 'google') {
      console.log('Google Condition Met');
      return <FaGoogle style={{ fontSize: '20px' }} />;}
      else if (companyName === 'apple') {
        return <FaApple style={{ fontSize: '20px' }} />;
      } else if (companyName === 'COMP1') {
        return <FaBuilding style={{ fontSize: '20px' }} />;
      } else if (companyName === 'microsoft') {
        return <FaMicrosoft style={{ fontSize: '20px' }} />;
      } else if (companyName === 'amazon') {
        return <FaAmazon style={{ fontSize: '20px' }} />;
      } else if (companyName === 'facebook') {
        return <FaFacebook style={{ fontSize: '20px' }} />;
      } else if (companyName === 'android') {
        return <FaAndroid style={{ fontSize: '20px' }} />;
      } else if (companyName === 'twitter') {
        return <FaTwitter style={{ fontSize: '20px' }} />;
      }
      else if (companyName === 'instagram') {
        return <FaInstagram style={{ fontSize: '20px' }} />;
      } else if (companyName === 'Airbnb') {
        return <FaAirbnb style={{ fontSize: '20px' }} />;
      } 
      else if (companyName === 'snapchat') {
        return <FaSnapchat style={{ fontSize: '20px' }} />;
      }  else if (companyName === 'uber') {
        return <FaUber style={{ fontSize: '20px' }} />;
      } else if (companyName === 'paypal') {
        return <FaPaypal style={{ fontSize: '20px' }} />;
      }
      else if (companyName === 'eatsy') {
        return <FaEtsy style={{ fontSize: '20px' }} />;
      }
      else if (companyName === 'square') {
        return <FaSquare style={{ fontSize: '20px' }} />;
      } 
    }

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

const calculateDailyGain = (positions, simulatedPrices) => {
    const dailyGain = positions.reduce((acc, position, index) => {
      const simulatedPrice = simulatedPrices[index];
      const currentMarketValue = position.quantité * simulatedPrice;
      const dailyGainForPosition = currentMarketValue - position.prixAchat;
      return acc + dailyGainForPosition;
    }, 0);

    return dailyGain.toFixed(2);
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
   
    const dailyGain = calculateDailyGain(positions, data.data);
      setDailyGain(dailyGain);
    const percentages = calculatePercentageFromSimulatedPrices(positions, data.data);
    setChartData(percentages);
    console.log("Percentages:", percentages);
    setChartData(percentages);
  });


  return () => {
    socket.disconnect();
  };
}, [positions, setSimulatedPrices, setRevenuTotal, setChartData,setDailyGain]);




  return (
    <Grid container spacing={1} width="100%" height="100%" sx={{ }} >

              <Grid item xs={12} sx={{mt:2,display:'flex',justifyContent:'space-around',alignItems:'flex-start'}}>
                <Paper sx={{display:'flex',justifyContent:'space-around',alignItems:'center',minWidth:'70vw',height:'55vh'}}>
              <div>
          <Typography variant="h6"  sx={{ fontSize: '25px',fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron'}}>Valeur Totale de portefeuille</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold',fontSize: '25px',fontFamily:'Orbitron' }}>
          {`${ + revenuTotal}€`}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <div style={{ display: 'flex', alignItems: 'center',fontSize: '20px',fontWeight: 'bold',fontFamily:'Orbitron',color:'#7df2f0' }}>
            <strong>Gain du jour: </strong>
            {dailyGain >= 0 ? (
              <TrendingUpIcon sx={{ color: '#f72585' }} />
            ) : (
              <TrendingDownIcon sx={{ color: '#f72585' }} />
            )}
            <Typography variant="body2" sx={{ color:'#f72585',fontSize: '20px',fontWeight: 'bold' ,fontFamily:'Orbitron' }}>
            {`${dailyGain} €`}
                        </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center',fontSize: '20px',fontWeight: 'bold' ,fontFamily:'Orbitron',color:'#7df2f0'}}>
            <strong>Gain Total: </strong>
            {totalGain >= 0 ? (
              <TrendingUpIcon sx={{ color: '#f72585' }} />
            ) : (
              <TrendingDownIcon sx={{ color: '#f72585' }} />
            )}
            <Typography variant="body2" sx={{ color:'#f72585' ,fontSize: '20px',fontWeight: 'bold' ,fontFamily:'Orbitron'}}>
              {totalGain} €
            </Typography>
          </div>
          <Divider sx={{ my: 2.5 }} />

          <div sx={{ Height: "30vh", padding: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
             
              <Typography variant="body1" sx={{ fontSize: '25px',fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron'}}>Solde Total:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold',fontFamily:'Orbitron',fontSize: '20px'  }}>{solde} €</Typography>
            </Box>
          </Box>
        </div>
        <Divider sx={{ my: 2.5 }} />

          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <strong style={{ marginRight: '10px', fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '20px',color:'#7df2f0'}}>Nombre total d'actions: </strong>
            <Typography variant="body2" sx={{ fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '20px' }}>
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
                fontSize: '18px',
                fontFamily:'Orbitron',

              },
            }}
            {...size}
          />
            </div>
            </Paper>
            <Paper sx={{ height: "55vh", minWidth: '25vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <Stack direction="row" spacing={5}>

        <AwesomeButton type="primary" className="aws-btn"><Typography sx={{fontFamily:'Orbitron',fontSize: '20px'}}>Vendre</Typography></AwesomeButton>
        <AwesomeButton type="secondary" className="aws-btn"><Typography sx={{fontFamily:'Orbitron',fontSize: '20px'}}>Acheter</Typography></AwesomeButton>
        </Stack>
        </Grid>


        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <FormControl size='small' sx={{ m: 1, minWidth: 190 }}>
        <Typography sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px' }}>Type ordre</Typography>
        <Select
          value='buy'//{typeOrdre}
          onChange=''//{handleChangeTypeOrdre}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'50px',fontFamily:'Orbitron',fontSize:'12px',justifyContent:'space-around',alignItems:'center'}}
        >
          <MenuItem value={10} sx={{fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Limite</MenuItem>
          <MenuItem value={20} sx={{fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Marché</MenuItem>
          <MenuItem value={30} sx={{fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Stop</MenuItem>
        </Select>
      </FormControl>


      <FormControl size='small' sx={{ m: 1, width: 190 }} variant="outlined">
      <Typography sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Quantité</Typography>


          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            sx={{height:'50px',fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}
          />
       
        </FormControl>
       
        </Grid>


        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>


        <FormControl size='small' sx={{ m: 1, width: 190,justifyContent:'space-around',alignItems:'center' }} variant="outlined">
            <Typography sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Prix du marché</Typography>


                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    sx={{height:'50px',fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}
                />
        </FormControl>
     
        <FormControl size='small' sx={{ m: 1, minWidth: 190 }}>
        <Typography sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>Validité d'Ordre</Typography>
        <Select
          value=''//{validite}
          onChange=''//{handleChangeValidite}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'50px',fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}
        >
          <MenuItem value={10} sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>un jour</MenuItem>
          <MenuItem value={20} sx={{mb:0.25,fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}>jusqu'à l'annulation</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', ml: 3, mr: 5,my:-5 }}>
           <FormControlLabel control={<Checkbox defaultChecked size='small' />}  label={<Typography sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '15px' }}>Stop-Loss</Typography>}/>
           <FormControlLabel control={<Checkbox defaultChecked size='small' />} labelPlacement="start" label={<Typography sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '15px' }}>Take-Profit</Typography>} />
       </Grid>





        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>


        <FormControl size='small' sx={{ m: 1, width: 190 }} variant="outlined">
       
                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    placeholder='prix du stop'
                    sx={{height:'50px',fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}
                />
        </FormControl>
     
        <FormControl size='small' sx={{ m: 1, width: 190 }} variant="outlined">
          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='prix limite'
            sx={{height:'50px',fontWeight: 'bold' ,fontFamily:'Orbitron',fontSize: '15px'}}
          />
        </FormControl>
        
        </Grid>
        </Paper>
</Grid>

<Grid container spacing={0.5} sx={{mt:3,ml:2,display:'flex',justifyContent:'space-around',alignItems:'flex-start'}}>
<Paper sx={{justifyContent:'space-around',alignItems:'center',minWidth:'70vw',height:'61vh'}}>
<Grid item xs={12} sx={{mt:2.5}}>
        <div>
            <Stack direction="row" spacing={2.5}>

            <Button variant="outlined" color="primary" onClick={handleShowActions}>
  <Typography sx={{ fontFamily: 'Orbitron', fontSize: '15px' ,color: '#f72585'}}>
    Actions
  </Typography>
</Button>
<Button variant="outlined" color="primary" onClick={handleShowOptions}>
  <Typography sx={{ fontFamily: 'Orbitron', fontSize: '15px' ,color: '#f72585'}}>
    Options
  </Typography>
</Button>


            </Stack>
        </div>

        </Grid>
<Grid item xs={12} sx={{
  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflowY: 'auto', // Utiliser 'overflowY' pour le défilement vertical uniquement
  maxHeight: '300px', // Ajustez la hauteur maximale selon vos besoins
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  marginTop:'20px',
}}><div style={{minHeight: "100vh", minWidth: '97.5vw'}}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ borderBottom: 'none', padding: '3px' ,fontSize: '18px',fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron'}}>Symbole</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px',fontSize: '18px',fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron' }}>Nom</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' ,fontSize: '18px',fontWeight: 'bold',color:'#7df2f0' ,fontFamily:'Orbitron'}}>Quantité</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px',fontSize: '18px',fontWeight: 'bold' ,color:'#7df2f0',fontFamily:'Orbitron' }}>Valeur Actuelle</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px',fontSize: '18px',fontWeight: 'bold',color:'#7df2f0' ,fontFamily:'Orbitron' }}>Prix d'achat</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' ,fontSize: '18px',fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron' }}>Variation</TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px',fontSize: '18px' ,fontWeight: 'bold',color:'#7df2f0',fontFamily:'Orbitron' }}>Date d'achat</TableCell>

          </TableRow>
        </TableHead>
        <TableBody sx={{ border: 'none' }}>
                {whatToShow === '1' && showPositionsOfActions ? (
                  // Affiche le tableau des positions d'actions
                  positions.map((position, index) => (
                    <TableRow
                      key={position.idP}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
              <TableCell align="left" sx={{ borderBottom: 'none', padding: '3px',fontSize: '15px' ,fontFamily:'Orbitron'}}>{getIconForCompany(position.nom)}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px', fontSize: '15px' ,fontFamily:'Orbitron'}}>{position.nom}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px', fontSize: '15px',fontFamily:'Orbitron' }}>{position.quantité}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px', fontSize: '15px',fontFamily:'Orbitron' }}>{simulatedPrices[index]}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px', fontSize: '15px' ,fontFamily:'Orbitron'}}>{position.prixAchat}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px', fontSize: '15px',fontFamily:'Orbitron' }}>{position.variation}</TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none', padding: '3px' , fontSize: '15px',fontFamily:'Orbitron'}}>{formatDate(position.dateAchatVente)}</TableCell>

            </TableRow>
        ))
        ): null}
        {whatToShow === '2' && showPositionsOfOptions ? (
          // Affiche le tableau des positions d'options
          // Ici, vous pouvez ajouter le contenu pour les positions d'options
          <TableRow>
            {/* Ajoutez ici le contenu pour les positions d'options */}
          </TableRow>
        ) : null}
      </TableBody>
      </Table>
  </div>
</Grid>
</Paper>
</Grid>
</Grid>

     
    );
}


export default Portefeuille;
