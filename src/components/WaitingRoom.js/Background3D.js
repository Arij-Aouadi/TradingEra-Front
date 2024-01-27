import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";
import { motion } from "framer-motion";
import { AwesomeButton } from 'react-awesome-button';
import WaitingRoom from "./WaitingRoom";
import { TimerProvider } from "./TimerContext";



const CarShow= React.memo(() => {
  return (
    <>
      <OrbitControls 
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
      />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      
      <spotLight
        color={[0.97, 0.15, 0.52]}
        intensity={150}
        angle={10}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.3, 0.79, 0.94]}
        intensity={150}
        angle={10}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Boxes></Boxes>
       
     </>
  );
  })

function Background3D({elements,onStartTimer,isTimerOn}) {
  return (
    <TimerProvider onStartTimer={onStartTimer} isTimerOn={isTimerOn}>
    <motion.div className="waiting-room-container">
      <motion.div className="canvas-overlay">
        <Canvas className="canvas" shadows>
          <CarShow />
        </Canvas>
      </motion.div>
      <motion.div className="content">
        {elements}
      </motion.div>
    </motion.div>
    </TimerProvider>
  );
}

export default Background3D;