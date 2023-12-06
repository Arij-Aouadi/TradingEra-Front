import { motion } from "framer-motion/three";
import { degreesToRadians } from "popmotion";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function StarIcon({ isLiked, isHover }) {
  const { nodes } = useGLTF("/star-icon.glb");

  return (
    <Canvas
      resize={{ offsetSize: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {lights.map(([x, y, z, intensity], i) => (
        <pointLight
          key={i}
          intensity={intensity}
          position={[x / 8, y / 8, z / 8]}
          color="#fff"
        />
      ))}
      <group dispose={null}>
        <motion.mesh
          geometry={nodes.Star.geometry}
          rotation={[Math.PI / 2, 0, degreesToRadians(360)]}
          scale={1}
          animate={[isLiked ? "liked" : "unliked", isHover ? "hover" : ""]}
          variants={{
            unliked: {
                rotateZ: 0,
              rotateY: 0.3,
              scale: 0.9,
              transition: {
                rotateZ: { duration: 1.5, ease: "linear", repeat: Infinity }
              }
                          },
            liked: {
              x: 4,
              y: [0,-0.5, -1,-1.5,-1.75,-1.5,-1.5,-1,-0.5, 3],
              scale: 1.0,
              transition: { duration: 0.3 }
            },
            hover: {
                }
          }}
        >
          <meshPhongMaterial
            color="#F72585"
            emissive="#f603fa"
            specular="#fff"
            shininess="100"
          />
        </motion.mesh>
      </group>
    </Canvas>
  );
}

const lights = [
  [2, 1, 4, 1],
  [8, 0, 4, 1]
];
