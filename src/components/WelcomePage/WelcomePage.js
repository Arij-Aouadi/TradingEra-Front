// WelcomePage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import axios from "axios";




const WelcomePage = () => {
    const [typedText, setTypedText] = useState("");
    const [progress, setProgress] = React.useState(0);
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)


    const loadingInstructions = [
      "Bienvenue dans TradingEra ! Préparez-vous pour une expérience immersive de trading.",
      "Le saviez-vous ? Diversifier votre portefeuille d'investissement peut vous aider à gérer le risque.",
      "Conseil professionnel : Restez informé des tendances du marché pour prendre des décisions éclairées en matière de trading.",
      "Fait TradingEra : Notre analyse de marché pilotée par l'IA fournit des informations en temps réel.",
      "Préparez-vous à l'ouverture du marché. Définissez vos stratégies et objectifs.",
      "Gagner des badges dans TradingEra débloque des fonctionnalités exclusives. Continuez à trader !",
      "Restez à l'écoute pour les événements et défis en jeu. Des récompenses passionnantes vous attendent !",
      "Personnalisez votre interface de trading dans les paramètres pour une expérience personnalisée.",
      "Invitez des amis à TradingEra et formez des alliances de trading pour des avantages mutuels.",
      "Le saviez-vous ? Le chat en jeu vous permet de communiquer avec d'autres traders.",
      "La volatilité du marché est normale. Ajustez vos stratégies de trading en conséquence.",
      "Explorez différents instruments de trading pour diversifier votre portefeuille d'investissement.",
      "Améliorez vos compétences en trading en suivant des tutoriels et des défis en jeu.",
      "Débloquez des fonctionnalités avancées en atteignant des niveaux supérieurs dans TradingEra.",
      "Gardez un œil sur le fil d'actualité pour des mises à jour importantes du marché et des annonces.",
      "Conseil TradingEra : Revoyez régulièrement vos performances en trading pour affiner votre stratégie.",
      "Rejoignez les communautés TradingEra pour vous connecter avec d'autres traders et partager des idées.",
      "Découvrez des pépites cachées sur le marché en explorant des actifs moins connus.",
      "Soyez patient pendant les fluctuations du marché. Le succès en trading prend du temps.",
      "Utilisez des outils d'analyse technique pour analyser les graphiques de prix et prendre des décisions basées sur les données.",
      "Sécurisez vos profits en définissant des ordres stop-loss. La gestion des risques est cruciale !",
    ];

    // You can access each instruction using indexing, e.g., loadingInstructions[0]
    

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setLoading(true)
          return 0;

        }
        const diff = Math.random() * 5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

    useEffect(()=>{
      if (loading===true){
      axios.post('http://localhost:5000/control_simulation',
      {"order":"start"}).then(res=>console.log(res.data)).catch(err=>console.log(err))
      navigate('/Waiting')
    }
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