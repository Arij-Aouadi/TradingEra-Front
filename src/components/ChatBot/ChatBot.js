import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    try {
      const result = await axios.get(`http://localhost:1010/bot/chat?prompt=${userInput}`);
      setResponse(result.data);
    } catch (error) {
      console.error('Erreur lors de l\'appel au service Spring Boot :', error);
    }
  };

  return (
    <Paper>
      <Typography variant="h4" sx={{ fontFamily: 'Orbitron', fontSize: 40, textAlign: 'center', color: 'white' }}>
        ChatBot
      </Typography>

      {/* Partie de la question de l'utilisateur */}
      <TextField
        label="Posez votre question"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        sx={{ textAlign: 'center', fontFamily: 'Orbitron', fontSize: 28 }}
      />

      {/* Bouton pour commencer le chat */}
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: 'dodgerblue', marginTop: 2, fontSize: '1rem', color: 'black', fontFamily: 'Orbitron', fontSize: 15 }}
        onClick={handleChat}
      >
        Commencer le chat
      </Button>

      {/* Partie de la réponse */}
      {response && (
        <Paper
          elevation={3}
          style={{
            backgroundColor: '#F72585',
            marginTop: '35px',
            padding: '16px',
            color: 'white',
            fontFamily: 'Orbitron',
            fontSize: 16,
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: 'Orbitron', fontSize: 28 }}>
            Réponse :
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Orbitron', fontSize: 12 }}>
            {response}
          </Typography>
        </Paper>
      )}

      {/* Image */}
      
    </Paper>
  );
};

export default ChatBot;