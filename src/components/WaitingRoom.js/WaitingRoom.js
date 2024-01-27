import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTimerContext } from "./TimerContext";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from "axios";


function WaitingRoom() {
  const { onStartTimer, isTimerOn } = useTimerContext(); // Use useTimerContext to access values
  const [open, setOpen] = React.useState(false);
  const [daysPerSimulation, setDaysPerSimulation] = React.useState(1); // Initial value is set to 1 day
  const [timePerDay, setTimePerDay] = React.useState(30); // Initial value is set to 30 minutes


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDaysChange = (event, newValue) => {
    setDaysPerSimulation(newValue);
  };

  const handleTimeChange = (event) => {
    setTimePerDay(event.target.value);
  };

    
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{transition: { ease: 'easeInOut' }}}
     style={{width:"100%",
     height:"100%",
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center'}} >
      <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration:0.5,delay:0.5}}
      >
        <Link to="/Jouer">
            <Button 
            sx={{
            mb:4,
            height:'7vh', 
            width:'30vw',
            textShadow: "0px 0px 0px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
            borderRadius: '22px',
            fontFamily:'Orbitron',
            fontSize:'19px'
          }} variant="outlined" onClick={()=>{onStartTimer(true)}} >
          Nouvelle Simulation</Button>
      </Link></motion.div>
      
      <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration:0.5,delay:0.6}}
      >
      <Link to="/base">
            <Button sx={{
            mb:4,
            height:'7vh', 
            width:'30vw',
            textShadow: "0px 0px 0px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
            borderRadius: '22px',
            fontFamily:'Orbitron',
            fontSize:'19px'
          }} variant="outlined">
          Rejoindre une simulation</Button>
      </Link></motion.div>
          
      
      <React.Fragment sx={{}}>
        <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration:0.5,delay:0.7}}
      >
      
      <Button onClick={handleClickOpen} sx={{
            height:'7vh',
            width:'30vw', 
            textShadow: "0px 0px 0px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
            borderRadius: '22px',
            fontFamily:'Orbitron',
            fontSize:'19px'
          }} variant="outlined">
          Paramétres</Button>
       </motion.div>
      <Dialog
        open={open}
        maxWidth="xl"
        sx={{
        }}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const numberOfDays = formJson.numberOfDays;
            const timePerDay = formJson.timePerDay;
            console.log('Number of Days:', numberOfDays);
            localStorage.setItem('numberOfDays',numberOfDays)
            localStorage.setItem('timePerDay',timePerDay)
            console.log('Time per Day:', timePerDay);
            // Create an object with the data to be sent
    const postData = {
      numberOfSimulatedDays: numberOfDays,
      numberOfSimulatedPricesPerSec: timePerDay,
      numberOfSimulatedOptionStrikesPerDate: 0,  // Modify this as needed
      numberOfsimulatedOptionDates: 0,  // Modify this as needed
    };

    // Make a POST request using Axios
    axios.post('http://127.0.0.1:5000/update_variables', postData)
      .then(response => {
        console.log('Success:', response.data);
        handleClose();
      })
      .catch(error => {
        console.error('Error:', error);
      });
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{textShadow: "0px 0px 2px rgb(255,255,255)",
            fontFamily:'Orbitron',
            fontSize:'19px'}}>Paramétres</DialogTitle>
        <DialogContent sx={{height:"200vh",background:`linear-gradient(135deg,#f72585, #4CC9F0)`,mt:2,mb:2}}>
        <DialogContentText sx={{mt:5,fontFamily:'Orbitron',
            fontSize:'13px',color:'white'}}>
        Une fois que vous cliquez sur « Nouvelle simulation », vous entrerez dans une simulation en temps réel de la bourse. 
          </DialogContentText>

        <DialogContentText sx={{mt:5,color:'white',fontFamily:'Orbitron',
            fontSize:'15px',textShadow: "0px 0px 2px rgb(255,255,255)"}}>
        Choisissez le nombre de jours de trading          </DialogContentText>
          <Box sx={{ minWidth:'100vh', margin: 'auto' }}>
            <Slider
              name="numberOfDays"
              sx={{color:'white',textShadow: "0px 0px 8px rgb(255,255,255)",mt:1}}
              defaultValue={1}
              min={1}
              max={25}
              step={1}
              marks
              value={daysPerSimulation}
              onChange={handleDaysChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} day(s)`}
            />
          </Box>
          <DialogContentText sx={{mt:3,color:'white',fontFamily:'Orbitron',
            fontSize:'15px',textShadow: "0px 0px 2px rgb(255,255,255)"}}>
        Choisissez le temps à consacrer à une journée de simulation en minutes </DialogContentText>
        <TextField
          sx={{mt:5}}
            InputLabelProps={{
              sx: {color:'white',fontFamily:'Orbitron',
           textShadow: "0px 0px 2px rgb(255,255,255)",fontSize:'20px'},

            }}
            InputProps={{sx:{'& input': {
              color:'white',fontFamily:'Orbitron',
           textShadow: "0px 0px 2px rgb(255,255,255)",fontSize:'18px'
            },}}}
            required
            margin="dense"
            id="time"
            name="timePerDay"
            label="Temps par jour de trading (en minutes)"
            type="number"
            fullWidth
            variant="standard"
            value={timePerDay}
            onChange={handleTimeChange}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>


      
    </motion.div>
  );
}

export default WaitingRoom;