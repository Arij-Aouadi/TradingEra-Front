import "./assets/style.css";
import { Suspense, useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { StarIcon } from "./StarIcon";
import { Paper } from "@mui/material";
import Confetti from "../Confetti/Confetti";
import axiosInstance from "../../axios";

// Ported from https://codepen.io/popmotion/pen/oNGxjpr?editors=1111
export default function Niveau() {
  const [isHover, setIsHover] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [levelUp,setLevelUp] = useState(false);
  //const [prevLevel, setPrevLevel] = useState(localStorage.getItem('niveau'));
  const [prevLevel, setPrevLevel] = useState("0");



  useEffect(()=>{
   /*const intervalId = setInterval(() => {
    axiosInstance.get('/NiveauUser',{
      headers: {
       Authorization : `Bearer ${localStorage.getItem('access_token')}`,
      },
   }).then(res=>{
    if (parseInt(res.data, 10) !== parseInt(prevLevel, 10)) {
      setLevelUp(true);
    }
    localStorage.setItem('niveau', res.data);

    setPrevLevel(prevLevel => localStorage.getItem('niveau'));
  }).catch(err => {
    console.log(err);
  });
}, 10000);

return () => clearInterval(intervalId);*/
setPrevLevel("1")
setLevelUp(true)
//}, [prevLevel,levelUp]);
}, []);


  useEffect(()=>{
    if (levelUp) {
      setIsLiked(true);
      setTimeout(()=>{setIsLiked(false);setLevelUp(false)},2000)
    }
  },[levelUp]);

  useEffect(() => {
    console.log(prevLevel,localStorage.getItem('niveau'), levelUp);
  }, [prevLevel, levelUp]);

  

  return (
    <motion.button
      initial={false}
      animate={[isLiked ? "liked" : "unliked", isHover ? "hover" : "rest"]}
      whileTap="press"
      variants={buttonVariants}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={() => {}}
    >
      <Confetti fireConfetti={levelUp} ></Confetti>
      <motion.div
        className="icon"
        variants={{
          liked: { opacity: 0, transition: iconFadeTransition },
          hover: isLiked
            ? { opacity: 0, transition: iconFadeTransition }
            : { opacity: 1 }
        }}
      >
        <Suspense fallback={null}>
          <StarIcon isHover={isHover} isLiked={isLiked} />
        </Suspense>
      </motion.div>
      <div className="label">
        <motion.span variants={labelTextVariants} className="default">
          Niveau
          
        </motion.span>
      </div>
      <div className="number">
        <motion.span variants={currentCountVariants} className="current">
          {prevLevel}
        </motion.span>
        <motion.span variants={newCountVariants} className="new">
          {prevLevel}
        </motion.span>
      </div>
    </motion.button>
  );
}

const iconFadeTransition= { duration: 0.2, delay: 0.3 };

const buttonVariants= {
  rest: {
    "--button-star-greyscale": "0%",
    "--button-star-contrast": "100%",
    transition: { duration: 0.7 }
  },
  hover: {
    "--button-star-greyscale": "0%",
    "--button-star-contrast": "100%",
  },
};

const labelTextVariants= {
  unliked: { x: 24 },
  liked: { x: -46 }
};

const successTextVariants= {
  unliked: { opacity: 0 },
  liked: { opacity: 0 }
};

const likedTransition= {
  duration: 0.65,
  delay: 0.3
};

const currentCountVariants= {
  unliked: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  liked: { opacity: 0, y: -40, transition: likedTransition }
};

const newCountVariants= {
  unliked: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  liked: { opacity: 1, y: 0, transition: likedTransition }
};
