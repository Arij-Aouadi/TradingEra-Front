import React from 'react';
import { Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Competition from '../Competition/competition';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const TradingGame = () => {
  const theme = useTheme();

  // Define itemData before using it in the map function
  const itemData = [
    {
      img: 'https://pro.kraken.com/app/ca18285c0bbcec20.png',
      title: '1st Prize',
      amount: '40,000USD',
    },
    {
      img: 'https://pro.kraken.com/app/c25d1b46f40f0760.png',
      title: '2nd Prize',
      amount: '25,000USD',
    },
    {
      img: 'https://pro.kraken.com/app/8e479c3b2dbd1138.png',
      title: '3rd Prize',
      amount: '14,000USD',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} width="100%" sx={{ display: 'flex', justifyContent: 'center', mt: 1, height: '100vh', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }  }}>
        <Grid item xs={12}>
          <Paper sx={{ minHeight: '50%', background: `linear-gradient(135deg,#000000, #1e222d)` }}>
          <Typography variant="h7" sx={{ color: '#FFFFFF', paddingTop: 2, paddingLeft: 2 }}>
            Leaderboard
           </Typography>
            <Competition />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ height: '300%', background: `linear-gradient(135deg,#000000, #1e222d)` }}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', paddingTop: 2, paddingLeft: 2 }}>
              Prize Structure
            </Typography>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                  {/* Placez le titre en dessous de l'image */}
                  <Typography variant="body2" sx={{ textAlign: 'center', color: '#FFFFFF', padding: 1 }}>
                    {item.title}
                  </Typography>
                  {/* Placez le montant en dessous du titre */}
                  <Typography variant="body2" sx={{ textAlign: 'center', color: '#FFFFFF', padding: 1 }}>
                    {item.amount}
                  </Typography>
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ height: '300%', background: `linear-gradient(135deg,#000000, #1e222d)` }}></Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default TradingGame;
