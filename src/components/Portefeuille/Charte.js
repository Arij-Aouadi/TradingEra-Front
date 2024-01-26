// ThreeChart.js
import React, { useRef, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const ThreeChart = ({ chartData }) => {
  const group = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame(() => {
    // Ajoutez votre logique d'animation ici
    setRotation([rotation[0] + 0.01, rotation[1] + 0.01, rotation[2]]);
  });

  return (
    <group ref={group} rotation={rotation}>
      {/* Créez vos objets 3D ici */}
      <Sphere args={[5, 32, 32]} position={[0, 0, 0]} />
    </group>
  );
};

export default ThreeChart;
