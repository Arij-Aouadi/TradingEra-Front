import React, { useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

const customOptions = {
  angle: -90,
  className: "canvas",
  colors: [
    '#26ccff',
    '#a25afd',
    '#ff36ff'
  ],
  decay: 0.8,
  drift: 0,
  gravity: 0.5,
  particleCount: 450,
  scalar: 0.6,
  shapes: [
    'circle',
    'square', 'star'
  ],
  spread: 360,
  startVelocity: 25,
  ticks: 50,
}

export default function Confetti({ fireConfetti }) {
  const refAnimationInstance = useRef(null);

  useEffect(() => {
    const getInstance = (instance) => {
      refAnimationInstance.current = instance;
    };

    const makeShot = (particleRatio, opts) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...opts,
          origin: { x: 0.85, y: 0 },
          particleCount: Math.floor(200 * particleRatio)
        });
    };

    const fire = () => {
      makeShot(0.25, customOptions);
      makeShot(0.2, customOptions);
    };

    if (fireConfetti) {
      setTimeout(() => {
        fire();
        setTimeout(fire, 500); // Fire again after a 2-second delay
      }, 0);
    }
  }, [fireConfetti]);

  return (
    <ReactCanvasConfetti refConfetti={(instance) => refAnimationInstance.current = instance} style={canvasStyles} />
  );
}
