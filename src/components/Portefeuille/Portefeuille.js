import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axiosInstance from '../../axios';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const balanceData = [
  { value: -300, label: 'Dépenses' }, 
  { value: 700, label: 'Revenus' }, 
];

const totalBalance = balanceData.reduce((acc, curr) => acc + curr.value, 0);
const totalPortfolioValue = 725.85;
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
  { field: 'dateAchatVente', headerName: 'Date d\'achat/Vente', width: 180 },
  { field: 'prixAchat', headerName: 'Prix d\'achat', width: 170 },
  { field: 'plusOuMoinsValue', headerName: 'Plus ou moins-value', width: 190 },
  { field: 'variation', headerName: 'Variation', width: 150 },
];


function Portefeuille () {
  
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    axiosInstance.get('/Position/showall').then((res) => {
      const dataWithIds = res.data.map((item, index) => ({ id: index + 1, ...item }));
      setPositions(dataWithIds);
    })
    .catch((err) => {
      console.log(err)
    });
  
    }, []);
  return (
    <Grid container spacing={3} sx={{ mt: 2, ml: 1 }}>
      <Grid item xs={5.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Paper sx={{ minHeight: '10vh', padding: 2 }}>
      <Typography variant="h6">Valeur Totale de portefeuille</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {totalPortfolioValue} €
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
    155 
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
      <Grid item xs={3} sx={{}}>
      <Paper sx={{ minHeight: "28vh", padding: 2 }}>
        <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Balance</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
          {balanceData.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <Typography variant="body1">{item.label}:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{`${item.value}€`}</Typography>
            </Box>
          ))}
          <Divider sx={{ margin: '8px 0', backgroundColor: '#ccc' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Total:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{`${totalBalance}€`}</Typography>
          </Box>
        </Box>
      </Paper>
      </Grid>
      <Grid item xs={11} sx={{}}>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={positions}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default Portefeuille;

