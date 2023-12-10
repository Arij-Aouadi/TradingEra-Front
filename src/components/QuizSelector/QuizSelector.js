import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import YourImg from './images/rah.jpg';
import YourImage from './images/ah.jpg';


import { ArrowBack, ArrowForward, Filter1Sharp, Filter1TwoTone, Filter2TwoTone, Filter3TwoTone, Filter4TwoTone, Filter5TwoTone, Filter6TwoTone, Filter7TwoTone, Filter8TwoTone, Filter9TwoTone, Looks3Rounded, Looks4Rounded, Looks5Rounded, Looks6Rounded, LooksOne, LooksOneOutlined, LooksOneRounded, LooksTwoRounded, OneKkSharp } from '@mui/icons-material';


const QuizSelector = () => {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState('');

  const handleRadioChange = (event) => {
    setSelectedQuiz(event.target.value);
  };

  const handleStartQuiz = () => {
    console.log('Selected Quiz:', selectedQuiz);

    if (selectedQuiz) {
      navigate(`/quiz/${selectedQuiz}`);
    }
  };

  return (
    <Paper
    sx={{
      height: '93vh',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
       fontFamily: 'Orbitron',
       fontSize :16 
    }}
  >
    
<h1 style={{ color: 'white'}}>Sélectionnez le niveau du quiz</h1>
              <RadioGroup value={selectedQuiz} onChange={handleRadioChange} row >
              <Card sx={{ maxWidth: 200, mr: 20  }}>
  <CardMedia
    component="img"
    src={YourImg}
    alt="YourImg"
    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px' }}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1, fontSize: '0.9rem', textAlign: 'center', color: 'white', fontFamily: 'Orbitron', fontSize: 16 }}>
      THE AMATEUR
    </Typography>
  </CardContent>
  <CardActions>
    <FormControlLabel value="1" control={<Radio />} />
  </CardActions>
</Card>

<Card sx={{ maxWidth: 200 }}>
  <CardMedia
    component="img"
    src={YourImage}
    alt="Your Image"
    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px', fontFamily: 'Orbitron' }}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1, fontSize: '0.9rem', textAlign: 'center', color: 'white', fontFamily: 'Orbitron', fontSize: 16 }}>
      THE PROFESSIONAL
    </Typography>
  </CardContent>
  <CardActions>
    <FormControlLabel value="2" control={<Radio />} />
  </CardActions>
</Card>

</RadioGroup>
<Paper sx={{ p: 1, background: `#F72585`, color: '#F72585', width: '100%', textAlign: 'center' , mt: 4}}>
  <h1 style={{ fontSize: '16px', fontFamily: 'Orbitron',color: 'white' }}>
    Commencez à jouer sans aucun risque supplémentaire. Vous maîtriserez les techniques de trading Forex d’une manière amusante, facile et sûre.
  </h1>
</Paper>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 6, mb: 2 , backgroundColor: '#4CC9F0' , color: 'black', width: '200px' ,fontSize: '12px',
        fontFamily: 'Orbitron'}}
        onClick={handleStartQuiz}
        style={{ marginTop: 16 }}
      >
        Start Quiz
      </Button>
      
    </Paper>
  );
};

export default QuizSelector;
