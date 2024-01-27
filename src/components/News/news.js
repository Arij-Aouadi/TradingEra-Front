// Akhbar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Paper } from '@mui/material';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = 'sk_9a80ec67971940108fe008b5528d1192';
    const apiUrl = `https://api.iex.cloud/v1/data/core/news/aapl?range=last-week&token=${apiKey}`;

    const fetchNews = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log('Données complètes de l\'API :', response.data);

        // Utiliser un ensemble pour éliminer les doublons
        setNews(Array.from(new Set(response.data.slice(0, 6))));
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités :', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Grid container sx={{ height: '100%', width: '100%' }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ fontSize: '25px', fontWeight: 'bold', color: '#7df2f0', fontFamily: 'Orbitron', textAlign: 'center', mb: 2 }}>
          Actualités du Marché
        </Typography>
      </Grid>
      {news.map((item, index) => (
        <Grid item xs={6} key={index}>
          <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" mb={1}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.headline}
              </a>
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default News;
