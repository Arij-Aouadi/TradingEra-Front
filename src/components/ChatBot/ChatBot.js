import React, { useState } from 'react';
import { Grid, Paper, OutlinedInput, Button } from '@mui/material';
import Box from '@mui/material/Box';
import axiosInstance from '../../axios';

const ChatBot = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const addMessage = async () => {
    const userMessage = inputMessage.trim(); // Remove leading and trailing whitespace
    setUserMessages([...userMessages, userMessage]);

    try {
      const response = await axiosInstance.get(`/admin/livechat/${encodeURIComponent(userMessage)}`);
      
      if (response && response.data) {
        console.log('Réponse complète du backend :', response.data);
        if (response.data) {
          console.log('Texte de la réponse :', response.data);
          setChatbotMessages([...chatbotMessages, response.data]);
        } else {
          console.error('Propriété "text" manquante dans la réponse du backend :', response.data);
        }
      } else {
        console.error('Réponse du backend non valide :', response.data);
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération de la réponse du backend :', error);
    }

    setInputMessage('');
  };

  return (
    <Paper sx={{ minHeight: "90vh", background: `linear-gradient(135deg,#000000, #1e222d)`, padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ minHeight: "70vh", background: `linear-gradient(135deg,#000000, #1e222d)`, padding: '20px' }}>
            <div className="message-list">
              {userMessages.map((userMessage, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#c2c1b5',
                    color: 'rgb(255, 255, 255)',
                    padding: '20px',
                    fontSize: '17px',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                >
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{userMessage}</p>
                </div>
              ))}
              {chatbotMessages.map((chatbotMessage, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#1eae7a',
                    color: 'white',
                    padding: '20px',
                    fontSize: '17px',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                >
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{chatbotMessage}</p>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ minHeight: "20vh", background: `linear-gradient(135deg,#000000, #1e222d)`, display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <OutlinedInput
                sx={{ padding: '10px' }}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                placeholder="Votre message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && addMessage()}
              />
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="contained"
                onClick={addMessage}
              >
                Envoyer
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatBot;
