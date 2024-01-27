import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BadgeIcon from '@mui/icons-material/EmojiEvents';


function ScorePage() {
  const location = useLocation();
  const scoreFromURL = new URLSearchParams(location.search).get('score');
  const [score, setScore] = useState(null);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    // Mettez à jour le score lorsqu'il est extrait de l'URL
    if (scoreFromURL !== null) {
      setScore(scoreFromURL);

      // Définissez les règles pour attribuer des badges en fonction du score
      if (scoreFromURL >= 8) {
        setBadge({ label: 'Gold Badge', icon: <BadgeIcon sx={{ fontSize: 40, fontWeight: 'bold', color: 'gold' }} /> });
      } else if (scoreFromURL >= 5) {
        setBadge({ label: 'Silver Badge', icon: <BadgeIcon sx={{ fontSize: 40, fontWeight: 'bold', color: 'silver' }} /> });
      } else {
        setBadge({ label: 'Bronze Badge', icon: <BadgeIcon sx={{ fontSize: 40, fontWeight: 'bold', color: '#cd7f32' }} /> });
      }
    }
  }, [scoreFromURL]);

  return (
    <Paper sx={{ height: '90vh', justifyContent: 'center', background: `linear-gradient(135deg,#000000, #1e222d)` }}>
      <Grid item xs={12} md={12} sx={{ mt: 4 }}>
      <Paper sx={{ p: 3.5, background: 'linear-gradient(135deg, deepskyblue, dodgerblue)', color: 'white', width: '100%', textAlign: 'center' }}>
          {/* Condition pour afficher le message "Quiz has been taken" avec le score */}
          {score !== null && (
            <div>
              <h1 style={{ 
       fontFamily: 'Orbitron',
       fontSize :38  }}>LE QUIZ A ÉTÉ PASSÉ</h1>
              <p style={{ 
       fontFamily: 'Orbitron',
       fontSize :25  }}>Votre Score: {score}/10</p>
              {/* Afficher le badge */}
              {badge !== null && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontFamily: 'Orbitron',
       fontSize :35, fontWeight: 'bold' }}>{badge.label}</p>
                  {badge.icon}
                </div>
              )}
              {/* Autres détails ou composants à afficher */}
            </div>
          )}
        </Paper>
      </Grid>
      {/* Ajout d'un autre Paper pour l'icône et le message */}
      <Grid item xs={12} md={12} sx={{ mt: 3}}>
        <Paper sx={{ p: 2, background: `linear-gradient(135deg,#000000, #1e222d)`, borderColor: '#000000', color: 'white', width: '100%', textAlign: 'center' }}>
          {/* Condition pour afficher l'icône et le message */}
          {score !== null && (
            <div>
              <VerifiedIcon sx={{ fontSize: 120, color: '#F72585' }} />
              <p style={{ fontFamily: 'Orbitron',
       fontSize :18, marginTop: '10px', color: 'white' }}>Votre réponse a été soumise</p>
              <p style={{ fontWeight: 'bold',fontFamily: 'Orbitron',
       fontSize :55, marginTop: '10px', color: 'white' }}>Merci d'avoir passé le quiz</p>
            </div>
          )}
        </Paper>
      </Grid>
    </Paper>
  );
}

export default ScorePage;
