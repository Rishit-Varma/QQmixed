import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 1. This is the actual 3D model part
function Model() {
  const { scene } = useGLTF('/qqlogo.glb'); 
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; // Rotate on Y axis
      modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2; // Float
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} />
    </group>
  );
}

// 2. This is the main component that holds the lights and the Suspense wrapper
export function ParticleRing(props: any) {
  return (
    <group {...props}>
      {/* Lights so the model is visible */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00aa" />

      {/* Suspense stops the website from crashing! 
        It shows 'null' (nothing) for a split second until the Blender file is ready.
      */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </group>
  );
}

useGLTF.preload('/qqlogo.glb');