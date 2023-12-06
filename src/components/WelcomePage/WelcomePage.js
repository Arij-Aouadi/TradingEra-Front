// WelcomePage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";



const WelcomePage = () => {
    const [typedText, setTypedText] = useState("");
    const [progress, setProgress] = React.useState(0);
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)


    const loadingInstructions = [
      "Welcome to TradingEra! Get ready for an immersive trading experience.",
      "Did you know? Diversifying your investment portfolio can help manage risk.",
      "Pro tip: Stay updated with market trends to make informed trading decisions.",
      "TradingEra Fact: Our AI-driven market analysis provides real-time insights.",
      "Prepare for the market opening. Set your strategies and objectives.",
      "Earning badges in TradingEra unlocks exclusive features. Keep trading!",
      "Stay tuned for in-game events and challenges. Exciting rewards await!",
      "Customize your trading interface in the settings for a personalized experience.",
      "Invite friends to TradingEra and form trading alliances for mutual benefits.",
      "Did you know? The in-game chat allows you to communicate with other traders.",
      "Market volatility is normal. Adjust your trading strategies accordingly.",
      "Explore different trading instruments to diversify your investment portfolio.",
      "Level up your trading skills by completing in-game tutorials and challenges.",
      "Unlock advanced features by reaching higher levels in TradingEra.",
      "Keep an eye on the news feed for important market updates and announcements.",
      "TradingEra Tip: Regularly review your trading performance to refine your strategy.",
      "Join TradingEra communities to connect with fellow traders and share insights.",
      "Discover hidden gems in the market by exploring lesser-known assets.",
      "Stay patient during market fluctuations. Success in trading takes time.",
      "Use technical analysis tools to analyze price charts and make data-driven decisions.",
      "Secure your profits by setting stop-loss orders. Risk management is crucial!",
    ];
    
    // You can access each instruction using indexing, e.g., loadingInstructions[0]
    

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setLoading(true)
          return 0;

        }
        const diff = Math.random() * 3;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

    useEffect(()=>{
      if (loading===true){
      navigate('/Jouer')}
    },[loading])

  useEffect(() => {
    const typeText = (text, index) => {
      if (index < text.length) {
        setTypedText((prevText) => prevText + text.charAt(index));
        setTimeout(() => typeText(text, index + 1), 50); // Adjust typing speed here
      }
    };

    let i = 0;

const typeNextInstruction = () => {
  if (progress < 100 && i < 21) {
    // Clear the previous instruction before typing the next one
    setTypedText("");

    // Type the next instruction
    typeText(loadingInstructions[i], 0);
    i = i + 1;

    // Schedule the next instruction
    setTimeout(typeNextInstruction, 6000); // Adjust the delay as needed
  } else {
    // Reset i to 0 when reaching the end of the instructions or progress is 100
    i = 0;
  }
};

// Call the function to start typing instructions
typeNextInstruction();


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

    <motion.div
        transition={{ duration: 2, delay: 2 }} // Delay before text animation
        style={{
          fontSize: "0.70em",
          fontFamily: "Orbitron",
          color: "#fff", // Text color
          marginBottom: 100,
          textShadow: "0px 0px 1px rgb(255,255,255)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          
        }}
      >
        {typedText}
      </motion.div >

      <Box sx={{ width: '40%',boxShadow: "0px 0px 5px rgb(255,255,255)",
 }}>
      <LinearProgress color="secondary" variant="determinate" value={progress} />
    </Box>

    </motion.div>
  );
};

export default WelcomePage;