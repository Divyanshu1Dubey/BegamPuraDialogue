"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// Types & Data
// ═══════════════════════════════════════════════════════════════
interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  significance: string;
  icon: string;
}

const LOCATIONS: Location[] = [
  { id: 0, name: "Seer Govardhanpur", lat: 25.3, lng: 83.01, significance: "Janam Asthan — birthplace of Sant Ravidas Ji, Varanasi, UP", icon: "🕉️" },
  { id: 1, name: "New Delhi", lat: 28.61, lng: 77.23, significance: "Bhashan Shivir — National Dialogue, November 2026", icon: "🇮🇳" },
  { id: 2, name: "Varanasi", lat: 25.32, lng: 83.01, significance: "Spiritual capital — where Sant Ravidas Ji composed His Bani", icon: "🛕" },
  { id: 3, name: "Amritsar", lat: 31.63, lng: 74.87, significance: "Guru Ravidas Ji's Bani enshrined in Sri Guru Granth Sahib Ji", icon: "🕍" },
  { id: 4, name: "London", lat: 51.51, lng: -0.13, significance: "BRHF HQ — Houses of Parliament Exhibition, February 2027", icon: "🇬🇧" },
  { id: 5, name: "Birmingham", lat: 52.48, lng: -1.89, significance: "Shri Guru Ravidass Temple — largest outside India", icon: "🕌" },
  { id: 6, name: "Brussels", lat: 50.85, lng: 4.35, significance: "European Parliament Be-gumpura Dialogue, January 2027", icon: "🇪🇺" },
  { id: 7, name: "Toronto", lat: 43.65, lng: -79.38, significance: "Ravidassia diaspora community & Sikh-Dalit solidarity", icon: "🇨🇦" },
  { id: 8, name: "New York", lat: 40.71, lng: -74.01, significance: "Global Ravidassia community outreach & media presence", icon: "🗽" },
  { id: 9, name: "São Paulo", lat: -23.55, lng: -46.63, significance: "South American Ravidassia community chapter", icon: "🇧🇷" },
  { id: 10, name: "Frankfurt", lat: 50.11, lng: 8.68, significance: "European Ravidassia community chapter, Germany", icon: "🇩🇪" },
  { id: 11, name: "Bedfordshire", lat: 52.13, lng: -0.46, significance: "BRHF Registered Charity HQ — Biggleswade, UK", icon: "🏠" },
];

const CONNECTIONS: [number, number][] = [
  [0, 2], [2, 3], [3, 5], [4, 5], [4, 7],
  [4, 8], [4, 9], [4, 10], [4, 11], [6, 4],
  [6, 10], [1, 2], [1, 4],
];

const R = 2;
const EPS = 0.0001;

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════
function ll(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// ═══════════════════════════════════════════════════════════════
// Procedural earth texture
// ═══════════════════════════════════════════════════════════════
function createEarthTexture() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 512;
  const ctx = c.getContext("2d")!;

  // Deep space ocean
  const bg = ctx.createRadialGradient(460, 200, 0, 512, 256, 560);
  bg.addColorStop(0, "#0d0a1a");
  bg.addColorStop(1, "#04020a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 512);

  // Continents as soft gradient blobs
  const land: [number, number, number, number][] = [
    [22,80,14,11],[27,66,8,8],[50,18,12,28],[5,22,28,18],
    [45,-100,25,30],[-15,-55,22,14],[10,108,8,18],
    [-25,134,11,14],[62,100,14,70],[30,50,7,7],
    [55,50,10,25],[15,-10,6,8],
  ];

  const img = ctx.getImageData(0, 0, 1024, 512);
  const d = img.data;
  for (let y = 0; y < 512; y++) {
    const lat = 90 - (y / 512) * 180;
    for (let x = 0; x < 1024; x++) {
      const lng = (x / 1024) * 360 - 180;
      let intensity = 0;
      for (const [cl, clng, ls, lgs] of land) {
        const dy = (lat - cl) / ls, dx = (lng - clng) / lgs;
        const dd = dx * dx + dy * dy;
        if (dd < 1) intensity = Math.max(intensity, (1 - dd) * 0.22);
      }
      if (intensity > 0) {
        const i = (y * 1024 + x) * 4;
        d[i] = Math.min(255, d[i] + intensity * 40);
        d[i+1] = Math.min(255, d[i+1] + intensity * 28);
        d[i+2] = Math.min(255, d[i+2] + intensity * 50);
      }
      // subtle grid
      const lm = Math.abs(((lat % 30) + 30) % 30);
      const gm = Math.abs(((lng % 30) + 180) % 30 - 15);
      if (lm < 0.8 || gm < 0.6) {
        const i = (y * 1024 + x) * 4;
        d[i] += 4; d[i+1] += 3; d[i+2] += 8;
      }
    }
  }
  ctx.putImageData(img, 0, 0);

  // marker glows
  LOCATIONS.forEach(loc => {
    const px = ((loc.lng + 180) / 360) * 1024;
    const py = ((90 - loc.lat) / 180) * 512;
    const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
    g.addColorStop(0, "rgba(255,157,47,0.45)");
    g.addColorStop(1, "rgba(255,157,47,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
  });

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}

// ═══════════════════════════════════════════════════════════════
// Atmosphere — Fresnel shader
// ═══════════════════════════════════════════════════════════════
const atmoVS = `varying vec3 vN; varying vec3 vP;
void main(){
  vec4 wp=modelMatrix*vec4(position,1.);
  vP=wp.xyz; vN=normalize(mat3(modelMatrix)*normal);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}`;
const atmoFS = `varying vec3 vN; varying vec3 vP;
void main(){
  float f=1.-dot(normalize(cameraPosition-vP),vN);
  f=pow(f,3.8);
  gl_FragColor=vec4(0.78,0.52,0.04,f*0.45);
}`;

function Atmosphere() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: atmoVS, fragmentShader: atmoFS,
    transparent: true, side: THREE.BackSide, depthWrite: false,
  }), []);
  return <mesh geometry={new THREE.SphereGeometry(R * 1.2, 64, 64)} material={mat} />;
}

// ═══════════════════════════════════════════════════════════════
// Flight Arc — dotted animated connection
// ═══════════════════════════════════════════════════════════════
function FlightArc({ a, b, idx }: { a: THREE.Vector3; b: THREE.Vector3; idx: number }) {
  const { curve } = useMemo(() => {
    const s = a.clone().normalize().multiplyScalar(R + 0.005);
    const e = b.clone().normalize().multiplyScalar(R + 0.005);
    const m = s.clone().add(e).multiplyScalar(0.5);
    m.normalize().multiplyScalar(R + s.distanceTo(e) * 0.32);
    return { curve: new THREE.QuadraticBezierCurve3(s, m, e) };
  }, [a, b]);

  const pts = useMemo(() => curve.getPoints(40), [curve]);
  const dotsRef = useRef<THREE.Group>(null);
  const N = 5;
  const spd = 0.06 + (idx % 6) * 0.015;

  useFrame((st) => {
    if (!dotsRef.current) return;
    const t0 = st.clock.elapsedTime * spd;
    for (let i = 0; i < N; i++) {
      const t = ((t0 + i / N) % 1);
      const p = curve.getPoint(t);
      const child = dotsRef.current!.children[i] as THREE.Mesh;
      child.position.copy(p);
      const fade = Math.sin(t * Math.PI);
      (child.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
      child.scale.setScalar(0.4 + fade * 0.6);
    }
  });

  const dotGeo = useMemo(() => new THREE.SphereGeometry(EPS + 0.012, 6, 6), []);

  return (
    <group>
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: "#c8860a", transparent: true, opacity: 0.06, depthWrite: false })
      )} />
      <group ref={dotsRef}>
        {Array.from({ length: N }).map((_, i) => (
          <mesh key={i} geometry={dotGeo}>
            <meshBasicMaterial color="#ffb347" transparent opacity={0.9} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Marker — glowing dot + hover label
// ═══════════════════════════════════════════════════════════════
function Marker({
  pos, loc, selected, hovered, onHover, onUnhover, onClick,
}: {
  pos: THREE.Vector3; loc: Location; selected: boolean; hovered: boolean;
  onHover: () => void; onUnhover: () => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [showLabel, setShowLabel] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = selected ? 1.7 : hovered ? 1.35 : 1;
    ref.current.scale.setScalar(s * (1 + Math.sin(clock.elapsedTime * 3 + loc.id) * 0.15));
  });

  return (
    <group position={pos}>
      {/* Soft glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.09, 32]} />
        <meshBasicMaterial color="#ff9d2f" transparent opacity={selected ? 0.4 : 0.15} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Dot */}
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); onHover(); setShowLabel(true); }}
        onPointerOut={() => { onUnhover(); setShowLabel(false); }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <sphereGeometry args={[selected ? 0.032 : hovered ? 0.026 : 0.02, 16, 16]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={selected ? 1 : 0.9} />
      </mesh>

      {/* Hover / selected label */}
      {(hovered || selected) && (
        <Html position={[0, 0.16, 0]} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0b0710]/90 backdrop-blur-md border border-saffron/50 text-[11px] font-semibold text-white shadow-xl shadow-black/40">
            <span className="mr-1">{loc.icon}</span>
            {loc.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Camera controller — smooth fly-to animation
// ═══════════════════════════════════════════════════════════════
function CameraRig({ targetId, onDone }: { targetId: number | null; onDone: () => void }) {
  const { camera } = useThree();
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 5.5));
  const targetLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const animating = useRef(false);
  const startPos = useRef<THREE.Vector3>(camera.position.clone());
  const startTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const progress = useRef(0);

  useEffect(() => {
    if (targetId === null) {
      // Reset to overview
      targetPos.current.set(0, 1.2, 5.5);
      targetLook.current.set(0, 0, 0);
      animating.current = true;
      startPos.current.copy(camera.position);
      startTarget.current.set(0, 0, 0);
      progress.current = 0;
    } else if (targetId >= 0 && targetId < LOCATIONS.length) {
      const loc = LOCATIONS[targetId];
      const surface = ll(loc.lat, loc.lng, R);
      const dir = surface.clone().normalize();
      // Camera position: offset from surface outward
      const camPos = dir.multiplyScalar(R + 2.2);
      // Slight upward angle for better view
      camPos.y += 1.0;
      targetPos.current.copy(camPos);
      targetLook.current.copy(surface);
      animating.current = true;
      startPos.current.copy(camera.position);
      startTarget.current.set(0, 0, 0);
      progress.current = 0;
    }
  }, [targetId, camera]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    progress.current += delta * 0.8;
    const t = Math.min(progress.current, 1);
    // easeInOutCubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(startPos.current, targetPos.current, ease);
    if (t >= 1) {
      animating.current = false;
      onDone();
    }
  });

  return null;
}

// ═══════════════════════════════════════════════════════════════
// Globe Scene
// ═══════════════════════════════════════════════════════════════
function GlobeScene({
  onSelect,
  flyToId,
}: {
  onSelect: (id: number) => void;
  flyToId: number | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const earthTex = useMemo(() => createEarthTexture(), []);

  const positions = useMemo(
    () => LOCATIONS.map((l) => ll(l.lat, l.lng, R)),
    []
  );

  // connectionPairs available for future use

  // Slow rotation when not interacting
  useFrame((_, delta) => {
    if (groupRef.current && hovered === null && flyToId === null) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[R, 96, 72]} />
        <meshStandardMaterial
          map={earthTex}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Atmosphere */}
      <Atmosphere />

      {/* Flight arcs */}
      {CONNECTIONS.map(([a, b], i) => (
        <FlightArc key={i} a={positions[a]} b={positions[b]} idx={i} />
      ))}

      {/* Markers */}
      {LOCATIONS.map((loc, i) => (
        <Marker
          key={loc.id}
          pos={positions[i]}
          loc={loc}
          selected={flyToId === loc.id}
          hovered={hovered === i}
          onHover={() => setHovered(i)}
          onUnhover={() => setHovered(null)}
          onClick={() => onSelect(loc.id)}
        />
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════
export function ConnectGlobe() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const selectedLoc = selectedId !== null ? LOCATIONS[selectedId] : null;

  const handleSelect = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleFlyDone = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <div>
      <div
        className="w-full rounded-3xl overflow-hidden relative card-saffron-glow"
        style={{ height: "clamp(420px, 55vh, 640px)", border: "1px solid rgba(200,134,10,0.18)" }}
      >
        <Canvas
          camera={{ position: [0, 1.2, 5.5], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#04020a"]} />
          <ambientLight intensity={0.12} />
          <pointLight position={[5, 3, 5]} intensity={0.6} color="#ff9d2f" />
          <pointLight position={[-5, -2, -5]} intensity={0.2} color="#6366f1" />
          <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.2} />

          <CameraRig targetId={selectedId} onDone={handleFlyDone} />
          <GlobeScene onSelect={handleSelect} flyToId={selectedId} />
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={2.8}
            maxDistance={8}
            dampingFactor={0.06}
            rotateSpeed={0.35}
            zoomSpeed={0.5}
          />
        </Canvas>

        {/* Overlay UI */}
        <div className="absolute top-5 left-5 z-10 pointer-events-none">
          <p className="text-[10px] font-bold text-saffron/50 uppercase tracking-[0.3em] mb-1">
            Global Network
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            Be-gumpura Across the World
          </h3>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[10px] text-white/25 uppercase tracking-widest">
            Drag to rotate &middot; Scroll to zoom &middot; Click markers to explore
          </p>
        </div>

        {/* Location counter badge */}
        <div className="absolute top-5 right-5 z-10 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              {LOCATIONS.length} Locations
            </span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-4 p-5 md:p-6 rounded-2xl card-glass card-saffron-glow"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl shrink-0">{selectedLoc.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-base font-bold text-ink">{selectedLoc.name}</h4>
                <p className="text-[10px] text-saffron font-bold uppercase tracking-[0.2em] mt-0.5">
                  Significance
                </p>
                <p className="text-sm text-ink-soft mt-1 leading-relaxed">{selectedLoc.significance}</p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="shrink-0 p-1.5 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="h-4 w-4 text-ink-soft" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
