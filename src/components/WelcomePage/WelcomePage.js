// WelcomePage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WelcomePage = () => {
    const [typedText, setTypedText] = useState("");
    
  const targetText = "Welcome to the future of trading";

  useEffect(() => {
    const typeText = (text, index) => {
      if (index < text.length) {
        setTypedText((prevText) => prevText + text.charAt(index));
        setTimeout(() => typeText(text, index + 1), 50); // Adjust typing speed here
      }
    };

    typeText(targetText, 0);
  }, []);

   
  
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #000000, #1e222d)", // Gradient background
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 0.40, ease: "easeOut" }}
        style={{
          fontSize: "5em",
          marginBottom: "20px",
          fontFamily: "Orbitron, sans-serif",
          color: "#fff", // Text color
          textShadow: "0px 0px 5px rgb(255,255,255)",
          minHeight:"50%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        TradingEra
      </motion.div>
      <motion.svg height="500" width="600" 
      style={{minHeight:"40%",display:"flex",justifyContent:"center"}}
       initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 1, ease: "easeOut",delay:5 }}
        >
      <motion.path d="M10 80 L30 5 L50 150 L70 30 L90 120 L110 5 L130 80 L150 15 L170 150 L190 20 L210 110 L230 10 L250 135 L270 2 L290 150 L310 45 L330 120 L350 6 L370 135 L390 10 L410 150 L430 80 L450 165 L470 20 L490 130 L510 40 L530 145 L550 3 L570 100 L590 30 L610 80 " 
      fill="transparent" stroke="white" strokeWidth="1" style={{filter: "drop-shadow(0px 0px 2px rgb(255,255,255))"}}/>
      {/*<motion.path d="M10 80 L30 5 L50 150 L70 30 L90 120 L110 5 L130 80 L150 15 L170 150 L190 20 L210 110 L230 10 L250 135 L270 2 L290 150 L310 45 L330 120 L350 6 L370 135 L390 10 L410 150 L430 80 L450 165 L470 20 L490 130 L510 40 L530 145 L550 3 L570 100 L590 30 L610 80 " 
      fill="transparent" stroke="white" strokeWidth="1" />*/}

    </motion.svg>
    <motion.div
        transition={{ duration: 2, delay: 2 }} // Delay before text animation
        style={{
          fontSize: "0.75em",
          fontFamily: "Roboto, sans-serif",
          color: "#fff", // Text color
          marginBottom: 100,
          textShadow: "0px 0px 1px rgb(255,255,255)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        {typedText}
      </motion.div >
    </motion.div>
  );
};

export default WelcomePage;