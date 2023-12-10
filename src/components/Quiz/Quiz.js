import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { ArrowBack, ArrowForward, Filter1Sharp, Filter1TwoTone, Filter2TwoTone, Filter3TwoTone, Filter4TwoTone, Filter5TwoTone, Filter6TwoTone, Filter7TwoTone, Filter8TwoTone, Filter9TwoTone, Looks3Rounded, Looks4Rounded, Looks5Rounded, Looks6Rounded, LooksOne, LooksOneOutlined, LooksOneRounded, LooksTwoRounded, OneKkSharp } from '@mui/icons-material';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import backgroundImage from './images/we.jpg';
import YourImage from './images/question.jpg';
import { useNavigate } from 'react-router-dom';
import ScorePage from '../ScorePage/ScorePage';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useParams } from 'react-router-dom';
// ... (autres imports)



const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#700af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#1976d2',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#1976d2',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));
function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Filter1TwoTone  />,
    2: <Filter2TwoTone  />,
    3: <Filter3TwoTone  />,
    4: <Filter4TwoTone  />,
    5: <Filter5TwoTone  />,
    6: <Filter6TwoTone  />,
    7: <Filter7TwoTone  />,
    8: <Filter8TwoTone />,
    9: <Filter9TwoTone  />,
    10: <OneKkSharp  />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};


ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const CountdownTimer = ({ remainingTime, setTimerKey }) => {
  return (
    <div style={{ position: 'fixed', bottom: '500px', left: '1100px', zIndex: 9999, border: '2px solid dodgerblue', borderRadius: '50%' }}>
      <CountdownCircleTimer
        key={setTimerKey}
        isPlaying
        duration={remainingTime}
        colors={[['#004777', 0.33], ['dodgerblue', 0.33], ['#A30000']]}
        size={90}
        strokeWidth={8}
        onComplete={() => {
          setTimerKey((prevKey) => prevKey + 1);
        }}
      >
        {({ remainingTime }) => (
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'dodgerblue' }}>
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};



const steps = ['', '', '', '', '', '', '', '', '', ''];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loadingUserAnswers, setLoadingUserAnswers] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  //const [quizId, setQuizId] = useState(1); // Définissez l'ID du quiz par défaut, par exemple 1
  const [userResponses, setUserResponses] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // Initialisez avec la valeur du temps limite
  const [timerKey, setTimerKey] = useState(0);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const { quizId } = useParams();





  /*useEffect(() => {
    // Remplacez l'URL par l'URL de votre backend
    axios.get(`http://localhost:1010/api/quizzes/1/time`)
      .then(response => {
        setRemainingTime(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du temps restant', error);
      });
  }, [quizId]);*/
  

  useEffect(() => {
    const timer = setInterval(() => {
      // Mettez à jour le temps restant chaque seconde
      setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    // Nettoyez le timer lorsque le composant est démonté
    return () => {
      clearInterval(timer);
    };
  }, [setRemainingTime]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsResponse = await axios.get(`http://localhost:1010/api/quizzes/${quizId}/questions`);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    fetchQuestions();
  }, [quizId]);
  


  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const userAnswersData = await Promise.all(
          questions.map(async (question) => {
            const response = await axios.get(
              `http://localhost:1010/api/useranswer/question/${question.id}/useranswers`
            );
            console.log('User Answers Response for Question', question.id, ':', response.data);
            return {
              questionId: question.id,
              userAnswers: response.data,
            };
          })
        );
  
        const flattenedUserAnswers = userAnswersData
          .flatMap((data) => data.userAnswers.map((answer) => ({ ...answer, questionId: data.questionId })));
  
        setUserAnswers(flattenedUserAnswers);
      } catch (error) {
        console.error('Error fetching user answers:', error);
      } finally {
        setLoadingUserAnswers(false);
      }
    };
  
    if (questions.length > 0) {
      fetchUserAnswers();
    }
  }, [questions]);
  
  const getCorrectAnswers = async (quizId) => {
    try {
      const response = await axios.get(`http://localhost:1010/api/quizzes/${quizId}/questions`);
      const questions = response.data;
  
      console.log('Questions from the server:', questions);
  
      // À ajuster en fonction de la structure de vos données
      const correctAnswers = questions
        .filter(question => question.correctAnswers !== undefined)
        .map(question => question.correctAnswers);
  
      return correctAnswers;
    } catch (error) {
      console.error('Error fetching correct answers:', error);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };
  
  
  
  // ...
  const navigate = useNavigate();
  const handleOptionClick = async (userAnswer) => {
    try {
      // Remplacez la variable quizId par la valeur 1
      const quizId = 1;
  
      // Récupérez les réponses correctes du serveur
      const correctAnswers = await getCorrectAnswers(quizId);
  
      // Comparez la réponse de l'utilisateur avec les réponses correctes ici
      const isCorrect = correctAnswers
        .flat() // À utiliser si les réponses correctes peuvent être des tableaux
        .map(answer => answer.trim().toLowerCase())
        .includes(userAnswer.userResponse.trim().toLowerCase());
      console.log('Is Correct:', isCorrect);
  
      // Mettez à jour les états
      setSelectedOption(userAnswer.id);
      setIsAnswered(true);
  
      // Mettez à jour le score si la réponse est correcte
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
  
      // Maintenant, vous pouvez mettre en œuvre la logique pour changer la couleur, etc.
      // ...
  
    } catch (error) {
      console.error('Error finishing quiz:', error);
    }
  };
  
  // ...
 // À la fin du quiz (par exemple, après la question 10), affichez le score
 if (currentQuestionIndex === questions.length - 1) {
  // Affichez un message à l'utilisateur avec le score final
  console.log('Votre score final est :', score);
}

  
  
const handleNextQuestion = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  } else {
    // Si c'est la dernière question, déclencher la redirection vers la page du score
    setQuizComplete(true);
    navigate(`/score?score=${score}`);  // Utilisez navigate sans .push
  }
};

  // ...

  // À la fin du quiz (par exemple, après la question 10), affichez le score
  if (currentQuestionIndex === questions.length - 1) {
    // Affichez un message à l'utilisateur avec le score final
    console.log('Votre score final est :', score);
  }



  const handleLastQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loadingUserAnswers && userAnswers.length === 0) {
    return <p>Loading...</p>;
  }
  
  const currentQuestionId = questions[currentQuestionIndex]?.id;
  const currentQuestionUserAnswers = userAnswers
    .filter((userAnswer) => userAnswer.questionId === currentQuestionId)
    .map((userAnswer, index) => (
      <div key={userAnswer.id}>
        {`${String.fromCharCode(65 + index)}. ${userAnswer.userResponse}`}
      </div>
    ));


   
  return (
    <Paper sx={{ height: "100vh",  // Remplacez par le chemin réel de votre image
    backgroundSize: 'cover',  // Ajuste la taille de l'image pour couvrir complètement le Paper
    backgroundPosition: 'center',  // Centre l'image dans le Paper
    backgroundRepeat: 'no-repeat',display: 'flex',
    flexDirection: 'column',  // Ajuste la disposition de l'intérieur du Paper
    alignItems: 'center',  // Centre le contenu horizontalement
    justifyContent: 'center',fontSize: '17px',
    fontFamily: 'Orbitron' }} >
      <Grid container>
        {/* Stepper */}
        <Grid item xs={12} md={9} sx={{ mt: -4 }}> {/* Augmentez la valeur de mt selon vos besoins */}
          <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper activeStep={currentQuestionIndex} connector={<ColorlibConnector />}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </Grid>
  
        {/* Question */}
       {/* Question */}
       <Grid container>
  <Grid item xs={12} md={9} sx={{ mt: 2, ml: 20, mr: 2, display: 'flex', alignItems: 'center' }}>
    {/* Conteneur de l'image */}
    <div style={{ marginRight: '10px', marginLeft: '-70px' }}>
  <img src={YourImage} alt="Question" style={{ width: '250px', height: '250px', marginLeft: '0.1px' }} />
</div>


    {/* Conteneur de la question */}
    <Paper sx={{ p: 3, background: `#F72585`, color: 'white', display: 'flex', alignItems: 'center', width: '80%',marginRight: '150px' ,marginLeft: '3px'}}>
      {/* Affichez la question actuelle */}
      <div key={questions[currentQuestionIndex]?.id} style={{ marginRight: '50px', flex: 1 }}>
        <p>{questions[currentQuestionIndex]?.content}</p>
      </div>
    </Paper>
  </Grid>
</Grid>







<Grid item xs={12} md={9} sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'linear-gradient(135deg,#000000, #1e222d)' }}>
<Box sx={{ width: '100%', ml: 40, mt: -11 }}> {/* Ajoutez mt: -4 pour réduire l'espace */}
    <Stack spacing={2}>
      {userAnswers
        .filter((userAnswer) => {
          const currentQuestion = questions[currentQuestionIndex];
          return (
            currentQuestion &&
            userAnswer.questionId === currentQuestion.id
          );
        })
        .map((userAnswer) => {
          const index = userAnswers.findIndex((ua) => ua.id === userAnswer.id);

          return (
            <Item
              key={userAnswer.id}
              sx={{
                height: '55px',
                backgroundColor: isAnswered && selectedOption === userAnswer.id ? '#F72585' : '',
                color: isAnswered && selectedOption === userAnswer.id ? 'white' : '',
                cursor: 'pointer',
              }}
              onClick={() => handleOptionClick(userAnswer)}
            >
              {`${String.fromCharCode(65 + index)}. ${userAnswer.userResponse}`}
            </Item>
          );
        })}
    </Stack>
  </Box>
</Grid>
        {/* Buttons */}
        <Grid container justifyContent="space-between">
        <Grid item xs={3.5}>
  <Button
    fullWidth
    variant="contained"
    size="large"
    startIcon={<ArrowBack />}
    sx={{ mt: 3, mb: 2 , backgroundColor: 'dodgerblue'  ,color : 'white' ,fontSize: '15px',
    fontFamily: 'Orbitron' }}  // Utilisez royalblue comme couleur de fond
    onClick={handleLastQuestion} 
    disabled={currentQuestionIndex === 0}
  >
      LAST QUESTION
    </Button>
  </Grid>
  <Grid item xs={3.5}>
    <Button
      fullWidth
      variant="contained"
      size="large"
      endIcon={<ArrowForward />}
      sx={{ mt: 3, mb: 2 ,backgroundColor: 'dodgerblue' ,color : 'white' ,fontSize: '15px',
      fontFamily: 'Orbitron' }}  // Utilisez royalblue comme couleur de fond
      onClick={handleNextQuestion}
    >
          {currentQuestionIndex === questions.length - 1 ? 'FINISH' : 'NEXT QUESTION'}
    </Button>
    
  </Grid>
</Grid>
</Grid>
 {/* Afficher le score final après la dernière question */}
 {currentQuestionIndex === questions.length - 1 && (
      <div style={{ position: 'fixed', top: '10px', right: '10px', padding: '10px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>
      </div>
    )}

<div style={{ position: 'fixed', top: '10px', right: '15px', zIndex: 9999 }}>
<CountdownTimer remainingTime={remainingTime} setTimerKey={setTimerKey} />
      </div>
     
    </Paper>
  );
  
  
  
  
};

export default Quiz;