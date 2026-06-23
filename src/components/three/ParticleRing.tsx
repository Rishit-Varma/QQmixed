import { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { useGLTF, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Generate a dense circular boundary on the frontal XY plane
function generateFrontalRingPoints(count = 4500, radius = 3.2) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2;
    
    // XY Plane keeps it flat from the front view
    points[i * 3] = Math.cos(theta) * radius;
    points[i * 3 + 1] = Math.sin(theta) * radius;
    // A tiny bit of randomized Z variance fills out the thickness of the ring
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }
  return points;
}

function InnerScene() {
  const { scene } = useGLTF('/qqlogo.glb');
  const modelRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Points>(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPos(window.scrollY / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4,500 points creates a much heavier, solid look
  const [pointsArray] = useState(() => generateFrontalRingPoints(4500, 3.2));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Constant slow idle rotation for the central logo
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
      modelRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }

    // Scroll-linked Z-axis rotation (turns like a dial on scroll)
    if (ringRef.current) {
      ringRef.current.rotation.x = 0;
      ringRef.current.rotation.y = 0;
      ringRef.current.rotation.z = scrollPos * Math.PI * 1.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Boosted illumination for your custom model */}
      <ambientLight intensity={2.0} />
      <directionalLight position={[10, 10, 5]} intensity={3.0} color="#0066ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ff00aa" />

      {/* Central Logo - Scale bumped up to 3.5 to make it significantly bigger */}
      <group ref={modelRef} position={[0, 0, 0]}>
        <primitive object={scene} scale={3.5} />
      </group>

      {/* Thick, Dense, Neon Blue Particle Ring */}
      <Points ref={ringRef} positions={pointsArray} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0066ff"       // Vibrant, clean blue hue
          size={0.055}          // Increased particle size to make the ring feel thicker and filled out
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // Enhances the bright neon glow look against dark panels
        />
      </Points>
    </group>
  );
}

export function ParticleRing() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: 0, 
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <InnerScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/qqlogo.glb');