import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/system';
import axios from 'axios';
import io from 'socket.io-client';


const TimerComponent = ({isTimerOn,handleTimer}) => {
  const [days, setDays] = useState(1);
  const [timePerDay, setTimePerDay] = useState(5); // 15 minutes in seconds
  const [currentTime, setCurrentTime] = useState(timePerDay);
  const [isFrozen,setIsFrozen] = useState(false);
  const [startOrFinish,setStartOrFinish] = useState('');

  React.useEffect(()=>{
    const socket = io('http://127.0.0.1:5000/'); 

    const handleControlSimulation = (order) => {
        socket.emit('control_simulation', { order });
      };

    if (isFrozen) {
        console.log('isFrozen', isFrozen)
        handleControlSimulation('freeze');
      }
    else {
        handleControlSimulation('continue')
    } 
    if (startOrFinish=='finish'){
        console.log('stop simulation')
        handleControlSimulation('stop')
    }
  
    
  },[isFrozen]);


  useEffect(() => {
    let interval;

    // Start the timer when isTimerOn is true
    if (isTimerOn) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime === 0) {
            // If time is up for the day, move to the next day
            setDays((prevDays) => prevDays + 1);

            if (days === 3) {
              // Stop the timer when all days are completed
              clearInterval(interval);
              handleTimer(false);
              setStartOrFinish('finish')
              localStorage.setItem('GameOn','false')
              window.location.href = '/waiting'; 
              setStartOrFinish('')
              return 0;
            }

            // Reset time for the next day
            return timePerDay;
          }

          // Continue counting down
          if (isFrozen){
            return prevTime}
          else {
          return prevTime - 1;}
        });
      }, 1000);
    }

    // Cleanup interval on component unmount or when isTimerOn is false
    return () => clearInterval(interval);
  }, [days, timePerDay, isTimerOn,isFrozen]);

  const handleToggleTimer = () => {
    setIsFrozen(!isFrozen);
    
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    // Conditionally render the timer component based on isTimerOn
    isTimerOn && (
      <Box sx={{ mb: 2.5, mr: 1 }}>
        <motion.button
          onClick={handleToggleTimer}
          style={{ background: isFrozen? 'grey' : '#f72585', textAlign: 'start', padding: 6, color: 'white', fontSize: '13px' }}
        >
          {`Jour ${days} : ${formatTime(currentTime)}`}
        </motion.button>
      </Box>
    )
  );
};

export default TimerComponent;
