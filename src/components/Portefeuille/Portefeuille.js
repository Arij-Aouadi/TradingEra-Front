import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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
  const [revenuTotal, setRevenuTotal] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);


  useEffect(() => {
    const authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkb25pYSIsImlhdCI6MTcwMTE2MDA1MiwiZXhwIjoxNzAxMTc4NDUyfQ.nswb9rg5Menl88Xic8L-j29CzWBtEANG3bm0wckR76-IYNVJRTRrQIYhg9OCjrZK7YRNc3B55G5eb7NwV01u9A';

    const fetchRevenuTotal = async () => {
      try {
        const response = await axiosInstance.get('/calculerRevenuTotal', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        setRevenuTotal(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du revenu total :', error);
      }
    };
    const fetchPositionsCount = async () => {
      try {
        const response = await axiosInstance.get('/count', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
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
            'Authorization': `Bearer ${authToken}`
          }
        });
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setPositions(dataWithIds);
      } catch (err) {
        console.log(err);
      }
    };
    

    fetchRevenuTotal();
    fetchPositions();
    fetchPositionsCount();


    // Configurer une fonction qui sera appelée toutes les X millisecondes (par exemple, toutes les 10 secondes)
    const intervalId = setInterval(() => {
      fetchRevenuTotal();
      fetchPositions();


    }, 10000);

    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 2, ml: 1 }}>
      <Grid item xs={5.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                data,
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
        <Paper sx={{ minHeight: "28vh", padding: 2 }}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Balance</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              
              <Typography variant="body1">Solde Total:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>155</Typography>
            </Box>
          </Box>
        </Paper>
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
