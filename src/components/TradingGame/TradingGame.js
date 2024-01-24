import React, { useState, useEffect } from 'react';
import { Grid, Paper, ThemeProvider, Typography, Button ,Divider} from '@mui/material';
import { useTheme } from '@emotion/react';
import ImageListItem from '@mui/material/ImageListItem';
import CustomizedAccordions from '../accordion/accordion';
import Competition from '../Competition/competition';
import image1 from '../../image/image1.webp';
import ImageList from '@mui/material/ImageList';

import axiosInstance from '../../axios';


const TradingGame = () => {
    const theme = useTheme();
    const [data, setItemData] = useState([]);
    const itemData = [
      {
        img: 'https://pro.kraken.com/app/ca18285c0bbcec20.png',
        title: '1st Prize',
        amount: '40,000EUR',
        username :'', 
      },
      {
        img: 'https://pro.kraken.com/app/c25d1b46f40f0760.png',
        title: '2nd Prize',
        amount: '25,000EUR',
        username :'', 
      },
      {
        img: 'https://pro.kraken.com/app/8e479c3b2dbd1138.png',
        title: '3rd Prize',
        amount: '14,000EUR',
        username:'', 
      },
    ];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/ranku', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          const rankedPlayers = response.data;
  
          // Update the itemData array with the names of the top 3 players
          setItemData((prevData) => [
            {
              ...prevData[0],
              username: rankedPlayers[0]?.username, // Use the player name if available, or an empty string
            },
            {
              ...prevData[1],
              username : rankedPlayers[1]?.username , // Use the player name if available, or an empty string
            },
            {
              ...prevData[2],
              username: rankedPlayers[2]?.username || '', // Use the player name if available, or an empty string
            },
          ]);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
  
      fetchData();
    }, []); 
  
    return (
      <ThemeProvider theme={theme}>
<Grid
        container
        spacing={2}
        width=" 100%"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 1,
          height: 'calc(100vh - 64px)', // Hauteur ajustée pour tenir compte de la hauteur de la barre d'application
          overflow: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
      <Grid item xs={12}>
  <Paper sx={{ minHeight: '50%', mt: 0.5, background: `linear-gradient(135deg,#000000, #1e222d)`, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px' }}>
    <div style={{ flex: 1 }}>
      <Typography variant="h4" sx={{ color:'rgba(255,255,194)',fontWeight: 'bold', paddingBottom: 2, textAlign: 'left', fontFamily: 'Orbitron' }}>
        Explorez les marchés, gagnez des récompenses !
      </Typography>

      <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2, textAlign: 'left' }}>
        Rejoignez la compétition dès maintenant et démarquez-vous
      </Typography>
      <Button size="large" variant="filled" sx={{ border: '2px solid WHITE', color: 'WHITE', fontWeight: 'bold', marginTop: 2, fontFamily: 'Orbitron' }}>
        Participer
      </Button>
    </div>
    <img src={image1} alt="" style={{ width: '200px', height: 'auto', marginLeft: '20px' }} />
  </Paper>
</Grid>
      
      
      
  






<Grid item xs={12} md={7}>
  <Paper sx={{ background: `linear-gradient(135deg,#000000, #1e222d)`, mt: 0.5, padding: 2, overflow: 1 , minHeight: '300px'}}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop: 2, paddingBottom: 2, textAlign: 'left' }}>
      Prize Structure
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {itemData.map((item, index) => (
        <div key={item.img} style={{ flex: '0 0 30%', margin: '10px', padding: '10px', textAlign: 'center', position: 'relative' }}>
          <ImageList sx={{ width: '100%', height: '100%' }} rowHeight={150}>
            <ImageListItem key={item.img} sx={{ margin: '0.01px', padding: '20px', textAlign: 'center', position: 'absolute', top:0, left: 20 }}>
              {/* Ajustez la hauteur ci-dessus selon vos besoins */}
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>
          </ImageList>
          <div style={{ position: 'absolute', top:50, left: 100, width: '100%', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'WHITE', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '0.8rem' , marginTop: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              {item.amount}
            </Typography>
            <Typography variant="body2" sx={{ color: '#EEC4C9', fontSize: ' 1 rem' , marginTop: '8px', fontFamily: 'Orbitron',fontWeight: 'bold', lineHeight: '1.5'  }}>
            {data[index]?.username}              
            </Typography>
          </div>
        </div>
      ))}
    </div>
  </Paper>
</Grid>






<Grid item xs={12} md={5} sx={{ marginBottom:0.5}}>
  <Paper sx={{ minHeight: '100%', background: `linear-gradient(135deg,#000000, #1e222d)`, mt: 0.5, padding: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', paddingTop: 1, paddingBottom: 1, textAlign: 'left' }}>
      Découvrez la Compétition de Trading
    </Typography>
    <Divider sx={{ backgroundColor: '#FFFFFF', marginY: 2 }} />
    <CustomizedAccordions />
  </Paper>
</Grid>


  
          <Grid item xs={12} md={7}>
            <Paper sx={{ background: `linear-gradient(135deg,#000000, #1e222d)`, padding: 2, mt: 0.5, overflow: 1 }}>
            <Typography variant="h6" sx={{fontWeight: 'bold', paddingTop: 2, paddingBottom: 2, textAlign: 'left' }}>
                Leaderboard
            </Typography>
            <Competition />

          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>

        </Grid>
      </Grid>
        </ThemeProvider>

     )  ; };
export default TradingGame;
