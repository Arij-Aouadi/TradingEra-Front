import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { AwesomeButton } from 'react-awesome-button';

const balanceData = [
  { value: -300, label: 'Dépenses' }, 
  { value: 700, label: 'Revenus' }, 
];

const dailyGain = 35.6;
const totalGain = 102.2;

const chartSize = {
  width: 400,
  height: 200,
};

const data = [
  { value: 34.32, label: 'Google' },
  { value: 18.68, label: 'Meta' },
  { value: 26.79, label: 'Apple' },
  { value: 20.21, label: 'Amazon' },
];

const size = {
  width: 400,
  height: 200,
};
const total = data.reduce((acc, curr) => acc + curr.value, 0);
const columns = [
  { field: 'symbole', headerName: 'Symbole', width: 130 },
  { field: 'nom', headerName: 'Nom', width: 250 },
  { field: 'quantité', headerName: 'Parts', width: 130 },
  { field: 'valeurActuelle', headerName: 'Valeur Actuelle', width: 180 },
  { field: 'prixAchat', headerName: 'Prix d\'achat', width: 170 },
  { field: 'variation', headerName: 'Variation', width: 150 },
];

function Portefeuille() {
  const [positions, setPositions] = useState([]);
  const [solde, setSolde] = useState([]);
  const [revenuTotal, setRevenuTotal] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkb25pYSIsImlhdCI6MTcwMTYwNDQ1MSwiZXhwIjoxNzAxNjIyODUxfQ.-OHv4SeOnMs0vAUNvLs8NzHJ5H3bqpkiy63vSMXMW3UUFlavg97S1SBwJ2odrySASWLbo8CIokr-_knck2MDHQ'
    const fetchRevenuTotal = async () => {
      try {
        const response = await axiosInstance.get('/calculerRevenuTotal', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setRevenuTotal(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du revenu total :', error);
      }};
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
   
    const fetchPourcentage = async () => {
      try {
        const response= await axiosInstance.get('/pourcentages-revenu', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
      setChartData(response.data);
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
    fetchRevenuTotal();
    fetchPositions();
    fetchPositionsCount();
    fetchPourcentage();
    fetchSolde();


    // Configurer une fonction qui sera appelée toutes les X millisecondes (par exemple, toutes les 10 secondes)
    const intervalId = setInterval(() => {
      fetchRevenuTotal();
      fetchPositions();
      fetchPourcentage();
      fetchPositionsCount();
      fetchSolde();


    }, 10000);

    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 2, ml: 1 }}>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Paper sx={{ minHeight: '10vh', padding: 2 }}>
          <Typography variant="h6">Valeur Totale de portefeuille</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {`${ + revenuTotal}€`} 
          </Typography>
          <Divider sx={{ my: 1 }} />
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
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <strong style={{ marginRight: '10px', fontWeight: 'bold' }}>Nombre total d'actions: </strong>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {positionsCount} 
            </Typography>
          </div>
        </Paper>
        <Paper sx={{ minHeight: "10vh", textAlign: "right" }}>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${((item.value / total) * 100).toFixed(2)}%)`,
                arcLabelMinAngle: 45,
                data:chartData,
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
        </Paper>
      </Grid>
      <Grid item xs={2.5} sx={{}}>
        <Paper sx={{ minHeight: "30vh", padding: 2 }}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Balance</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              
              <Typography variant="body1">Solde Total:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{solde}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={3.5} sx={{}}>
      <Grid container Spacing={0} sx={{}}>
        <Paper>
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
      </Grid>
      <Grid item xs={11.5} sx={{}}>
  <div style={{ height: 400, width: '100%' }}>
    <Paper>
    <Table>
    <tr class="MuiTableRow-root MuiTableRow-head css-11gm959-MuiTableRow-root"><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-l345c8-MuiTableCell-root" scope="col">Symbole</th><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeMedium css-16d9gzc-MuiTableCell-root" scope="col">Nom</th><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeMedium css-16d9gzc-MuiTableCell-root" scope="col">Parts</th><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeMedium css-16d9gzc-MuiTableCell-root" scope="col">valeur Actuelle</th><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeMedium css-16d9gzc-MuiTableCell-root" scope="col">Prix d'achat</th><th class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeMedium css-16d9gzc-MuiTableCell-root" scope="col">Variation</th></tr>
      <TableBody sx={{ border: 'none' }}>
        {positions.map((position) => (
          <TableRow
            key={position.idP}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{ border: 'none', padding: '3px' }} component="th" scope="row">
              {position.symbole}
            </TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px' }}>
              {position.nom}
            </TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px' }}>
              {position.quantité}
            </TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px' }}>
              {position.valeurActuelle}
            </TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px' }}>
              {position.prixAchat}
            </TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px' }}>
              {position.variation}
            </TableCell>
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
