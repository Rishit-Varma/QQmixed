import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSectionBeat } from '../../hooks/useSectionBeat';

/**
 * Aurora particle sphere + torus ring.
 * Restricted purely to a high-fidelity Cyan and Dark Blue color cycle.
 */

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

const SPHERE_COUNT = IS_MOBILE ? 18000 : 36000;
const SPHERE_R     = 1.95;
const SPHERE_THICK = 0.035;

const RING_COUNT   = IS_MOBILE ? 5500 : 10000;
const RING_MAJOR   = 2.65;
const RING_MINOR   = 0.075;

const INTRO_DURATION = 2.6;
const RING_TURN_PER_SECTION = Math.PI;

// ====== Shaders updated for Cyan + Dark Blue only ======

const sphereVertex = /* glsl */ `
  attribute vec3 seed;
  attribute vec3 aStartPos;
  uniform float uTime;
  uniform vec3  uMouse;
  uniform float uMouseInfluence;
  uniform float uPixelRatio;
  uniform vec2  uTilt;
  uniform float uIntroT;
  uniform float uHeat;
  uniform float uExtraRotation;
  uniform float uTint;
  uniform float uOpacity;
  uniform float uExplode;
  varying vec3  vColor;
  varying float vAlpha;

  vec3 rotateY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
  vec3 rotateX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }

  // SHADER COLOR TARGETS (Cyan to Dark Blue)
  const vec3 AURORA_CYAN  = vec3(0.25, 0.85, 1.00);
  const vec3 DARK_BLUE    = vec3(0.02, 0.12, 0.55);
  const vec3 DEEP_INDIGO  = vec3(0.01, 0.04, 0.25);

  void main(){
    float introEase = 1.0 - pow(1.0 - clamp(uIntroT,0.0,1.0), 3.0);
    vec3 pos = mix(aStartPos, position, introEase);
    pos = rotateY(pos, uTilt.x * 0.22);
    pos = rotateX(pos, uTilt.y * 0.22);
    float ang = uTime * 0.06 + uExtraRotation;
    float c = cos(ang), s = sin(ang);
    vec3 rotated = vec3(c*pos.x + s*pos.z, pos.y, -s*pos.x + c*pos.z);
    pos = rotated;
    pos += normalize(pos) * sin(uTime*0.7 + seed.x*6.28) * 0.012;

    float shellGlow = 0.0;
    vec3 toCursor = uMouse - pos;
    float d = length(toCursor);
    float SIGMA = 0.55;
    float r2 = (d*d)/(SIGMA*SIGMA);
    if (r2 < 16.0 && d > 0.001) {
      vec3 outward = normalize(pos);
      float dent  = exp(-r2 * 2.5);
      float bulge = r2 * exp(-r2 * 1.4);
      float DENT_AMP = 0.32;
      float BULGE_AMP = 0.95;
      float disp = -dent*DENT_AMP + bulge*BULGE_AMP;
      pos += outward * disp * uMouseInfluence;
      shellGlow = (bulge*2.0 - dent*0.45) * uMouseInfluence;
    }

    float n1 = sin(pos.x*1.4 + pos.y*0.7 + uTime*0.5)*0.5 + 0.5;
    float n2 = sin(pos.y*1.1 - pos.z*1.3 + uTime*0.4 + 1.7)*0.5 + 0.5;
    float mixFactor = (n1+n2)*0.5;
    mixFactor += (seed.x - 0.5) * 0.15;
    mixFactor = clamp(mixFactor, 0.0, 1.0);

    // Dynamic Cyan to Dark Blue wave configuration
    vec3 col = mix(AURORA_CYAN, DARK_BLUE, mixFactor);
    
    // Core structural shadow using deep indigo highlights
    float highlightBoost = 1.0 - abs(mixFactor - 0.5)*2.0;
    col = mix(col, DEEP_INDIGO, highlightBoost*0.25);
    
    float curtain = sin(pos.y*0.9 + uTime*0.6 + seed.y*6.28)*0.5 + 0.5;
    col *= 0.55 + curtain*0.85;
    col = mix(col, vec3(0.85,0.95,1.00), max(shellGlow,0.0)*0.60);

    vColor = col;

    float bulgeFactor = max(0.0, shellGlow);
    float dentFactor  = max(0.0, -shellGlow);
    vAlpha = (0.55 + seed.y*0.4) * (1.0 + bulgeFactor*1.4 - dentFactor*0.45) * uOpacity;
    float burst = uExplode * (4.0 + seed.x*3.0);
    pos *= 1.0 + burst;
    vAlpha *= 1.0 - smoothstep(0.0, 0.7, uExplode);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float sizeAtten = clamp(8.0 / -mvPosition.z, 0.55, 1.4);
    float sizeBoost = 1.0 + bulgeFactor * 0.9;
    gl_PointSize = (0.55 + seed.y * 0.85) * uPixelRatio * sizeAtten * sizeBoost;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sharedFragment = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    vec3 col = vColor + vec3(smoothstep(0.18, 0.0, d) * 0.45);
    gl_FragColor = vec4(col, a);
  }
`;

const ringVertex = /* glsl */ `
  attribute vec3 seed;
  attribute vec3 aStartPos;
  uniform float uTime;
  uniform vec3  uMouse;
  uniform float uMouseInfluence;
  uniform float uPixelRatio;
  uniform vec2  uTilt;
  uniform float uIntroT;
  uniform float uHeat;
  uniform float uExtraRotation;
  uniform float uRingFlip;
  uniform float uTint;
  uniform float uOpacity;
  uniform float uExplode;
  varying vec3  vColor;
  varying float vAlpha;

  const vec3 RING_CYAN   = vec3(0.35, 0.85, 1.00);
  const vec3 RING_BLUE   = vec3(0.05, 0.20, 0.75);
  const vec3 RING_GLOW   = vec3(0.75, 0.93, 1.00);

  vec3 rotateY(vec3 p, float a){ float c=cos(a),s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
  vec3 rotateX(vec3 p, float a){ float c=cos(a),s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }

  void main(){
    float introEase = 1.0 - pow(1.0 - clamp(uIntroT,0.0,1.0), 3.0);
    vec3 pos = mix(aStartPos, position, introEase);
    pos = rotateY(pos, uTilt.x*0.32);
    pos = rotateX(pos, uTilt.y*0.32);
    float globalRot = uTime*0.07 + uExtraRotation;
    float gc = cos(globalRot), gs = sin(globalRot);
    pos = vec3(gc*pos.x - gs*pos.y, gs*pos.x + gc*pos.y, pos.z);
    pos = rotateX(pos, uRingFlip);

    float REACH_RING = 1.5;
    float distToCursor = length(pos - uMouse);
    float proximity = (1.0 - smoothstep(0.0, REACH_RING, distToCursor)) * uMouseInfluence;
    proximity = pow(proximity, 0.7);

    vec3 outFromCenter = normalize(vec3(pos.x, pos.y, 0.001));
    pos += outFromCenter * proximity * 0.18;
    pos.z += proximity * 0.06;

    // Linear space translation across Cyan and Dark Blue paths
    float gradient = sin(seed.x * 6.28318 + uTime * 0.5) * 0.5 + 0.5;
    vec3 col = mix(RING_CYAN, RING_BLUE, gradient);
    
    // Inject luminous bright cyan edge tones at structural peaks
    float midAcc = 1.0 - abs(gradient - 0.5) * 2.0;
    col = mix(col, RING_GLOW, midAcc * 0.25);

    float pulse = 0.75 + sin(seed.x*12.566 + uTime*0.7 + seed.z*3.0)*0.25;
    col *= pulse;
    col *= 1.0 + proximity*0.6;

    vColor = col;
    vAlpha = (0.8 + seed.y*0.2) * (1.0 + proximity*0.6) * uOpacity;
    float ringBurst = uExplode * (4.0 + seed.x*3.0);
    pos *= 1.0 + ringBurst;
    vAlpha *= 1.0 - smoothstep(0.0, 0.7, uExplode);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float sizeAtten = clamp(8.0 / -mvPosition.z, 0.55, 1.4);
    float sizeBoost = 1.0 + proximity*0.7;
    gl_PointSize = (0.7 + seed.y*0.75) * uPixelRatio * sizeAtten * sizeBoost;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ====== Geometry builders ======

function buildSphereGeometry(): THREE.BufferGeometry {
  const e = new Float32Array(SPHERE_COUNT * 3);
  const t = new Float32Array(SPHERE_COUNT * 3);
  const n = new Float32Array(SPHERE_COUNT * 3);
  for (let r = 0; r < SPHERE_COUNT; r++) {
    const i = r * 3;
    const a = Math.random();
    const o = Math.random();
    const sAng = a * Math.PI * 2;
    const cAng = Math.acos(2 * o - 1);
    const l = SPHERE_R + (Math.random() - 0.5) * SPHERE_THICK;
    const u = l * Math.sin(cAng) * Math.cos(sAng);
    const d = l * Math.sin(cAng) * Math.sin(sAng);
    const f = l * Math.cos(cAng);
    e[i] = u; e[i + 1] = d; e[i + 2] = f;
    const p = 9 + Math.random() * 6;
    const m = 1.6 + Math.random() * 1.2;
    t[i]     = u * m + (Math.random() - 0.5) * 0.6;
    t[i + 1] = d * m + (Math.random() - 0.5) * 0.6 + 0.4;
    t[i + 2] = f + p;
    n[i] = Math.random(); n[i + 1] = Math.random(); n[i + 2] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(e, 3));
  geo.setAttribute('aStartPos', new THREE.BufferAttribute(t, 3));
  geo.setAttribute('seed', new THREE.BufferAttribute(n, 3));
  return geo;
}

function buildRingGeometry(): THREE.BufferGeometry {
  const e = new Float32Array(RING_COUNT * 3);
  const t = new Float32Array(RING_COUNT * 3);
  const n = new Float32Array(RING_COUNT * 3);
  for (let r = 0; r < RING_COUNT; r++) {
    const i = r * 3;
    const a = Math.random() * Math.PI * 2;
    const o = Math.random() * Math.PI * 2;
    const s = RING_MINOR * (0.85 + Math.random() * 0.3);
    const cc = (RING_MAJOR + s * Math.cos(o)) * Math.cos(a);
    const l = (RING_MAJOR + s * Math.cos(o)) * Math.sin(a);
    const u = s * Math.sin(o);
    e[i] = cc; e[i + 1] = l; e[i + 2] = u;
    const d = 12 + Math.random() * 6;
    const f = 1.4 + Math.random() * 1;
    t[i]     = cc * f + (Math.random() - 0.5) * 0.5;
    t[i + 1] = l * f + (Math.random() - 0.5) * 0.5 + 0.4;
    t[i + 2] = u + d;
    n[i] = a / (Math.PI * 2);
    n[i + 1] = Math.random();
    n[i + 2] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(e, 3));
  geo.setAttribute('aStartPos', new THREE.BufferAttribute(t, 3));
  geo.setAttribute('seed', new THREE.BufferAttribute(n, 3));
  return geo;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function baseUniforms() {
  return {
    uTime:            { value: 0 },
    uMouse:           { value: new THREE.Vector3(999, 999, 999) },
    uMouseInfluence:  { value: 0 },
    uPixelRatio:      { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5) },
    uTilt:            { value: new THREE.Vector2(0, 0) },
    uIntroT:          { value: 0 },
    uHeat:            { value: 0 },
    uExtraRotation:   { value: 0 },
    uTint:            { value: 0 },
    uOpacity:         { value: 1 },
    uExplode:         { value: 0 },
  };
}

function BorealisField() {
  const logoAsset = useGLTF('/qqlogo.glb');
  const logoRef = useRef<THREE.Group>(null);

  const sphere = useRef<THREE.Points>(null);
  const ring = useRef<THREE.Points>(null);
  const sphereMat = useRef<THREE.ShaderMaterial>(null);
  const ringMat = useRef<THREE.ShaderMaterial>(null);
  const reduced = usePrefersReducedMotion();
  const { beat, count } = useSectionBeat();
  const { pointer, viewport } = useThree();

  const sphereGeo = useMemo(buildSphereGeometry, []);
  const ringGeo = useMemo(buildRingGeometry, []);

  const sphereUniforms = useMemo(baseUniforms, []);
  const ringUniforms = useMemo(() => ({ ...baseUniforms(), uRingFlip: { value: 0 } }), []);

  const intro = useRef(0);
  const mouse = useRef(new THREE.Vector3(999, 999, 999));
  const influence = useRef(0);
  const smoothBeat = useRef(0);   
  const smoothNorm = useRef(0);   

  useFrame((state, delta) => {
    const sm = sphereMat.current;
    const rm = ringMat.current;
    
    if (logoRef.current) {
      logoRef.current.rotation.set(0, 0, 0); 
    }

    if (!sm || !rm) return;

    const t = reduced ? 0 : state.clock.elapsedTime;
    intro.current = Math.min(1, intro.current + delta / INTRO_DURATION);

    const targetX = pointer.x * 2.4;
    const targetY = pointer.y * 2.4;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x === 999 ? targetX : mouse.current.x, targetX, 0.32);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y === 999 ? targetY : mouse.current.y, targetY, 0.32);
    mouse.current.z = 0;
    influence.current = THREE.MathUtils.lerp(influence.current, 1, 0.12);

    smoothBeat.current = THREE.MathUtils.lerp(smoothBeat.current, beat.current, 0.10);
    const sb = smoothBeat.current;
    const sections = Math.max(2, count.current);
    const norm = Math.min(1, sb / (sections - 1));
    smoothNorm.current = THREE.MathUtils.lerp(smoothNorm.current, norm, 0.07);
    const sn = smoothNorm.current;

    const heat  = THREE.MathUtils.smoothstep(sb, 0.12, 1.0) * 0.98;
    const tint  = sn * 4;
    const extra = sn * Math.PI * 0.35;
    const flip = sb * RING_TURN_PER_SECTION;

   for (const u of [sm.uniforms, rm.uniforms]) {
      u.uTime.value = t;
      u.uIntroT.value = intro.current;
      u.uMouse.value.copy(mouse.current);
      u.uMouseInfluence.value = influence.current;
      u.uHeat.value = heat;
      u.uTint.value = tint;
      u.uExtraRotation.value = extra;
    }
    rm.uniforms.uRingFlip.value = flip;
  });

  const responsiveScale = Math.min(1, viewport.width / 6.5);

  return (
    <>
      <ambientLight intensity={2.0} />
      <directionalLight position={[10, 10, 5]} intensity={3.0} color="#25e5ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#0d3df2" />

      <group scale={responsiveScale}>
        <group ref={logoRef} position={[0, 0, 0]}>
          <primitive object={logoAsset.scene} scale={4.8} />
        </group>

        <points ref={sphere} geometry={sphereGeo}>
          <shaderMaterial
            ref={sphereMat}
            uniforms={sphereUniforms}
            vertexShader={sphereVertex}
            fragmentShader={sharedFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </points>
        <points ref={ring} geometry={ringGeo}>
          <shaderMaterial
            ref={ringMat}
            uniforms={ringUniforms}
            vertexShader={ringVertex}
            fragmentShader={sharedFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </points>
      </group>
    </>
  );
}

type RingProps = { active?: boolean };

export function ParticleRing({ active = true }: RingProps) {
  const mobile = IS_MOBILE;
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#000000' }}
    >
      <Canvas
        flat
        frameloop={active ? 'always' : 'never'}
        dpr={mobile ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 75, near: 0.1, far: 1000 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      >
        <Suspense fallback={null}>
          <BorealisField />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/qqlogo.glb');
