import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";



function WaitingRoom() {
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
          }} variant="outlined" >
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
          
      <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration:0.5,delay:0.7}}
      >
      <Link to="/base">
            <Button sx={{
            height:'7vh',
            width:'30vw', 
            textShadow: "0px 0px 0px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
            borderRadius: '22px',
            fontFamily:'Orbitron',
            fontSize:'19px'
          }} variant="outlined">
          Paramétres</Button>
      </Link></motion.div>


      
    </motion.div>
  );
}

export default WaitingRoom;