"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useCursor, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── Location data ────────────────────────────────────────
interface Location {
  name: string;
  lat: number;
  lng: number;
  significance: string;
  icon: string;
}

const LOCATIONS: Location[] = [
  {
    name: "Seer Govardhanpur",
    lat: 25.3,
    lng: 83.01,
    significance: "Janam Asthan — birthplace of Sant Ravidas Ji, Varanasi",
    icon: "🕉️",
  },
  {
    name: "New Delhi",
    lat: 28.61,
    lng: 77.23,
    significance: "Bhashan Shivir — November 2026 national dialogue",
    icon: "🇮🇳",
  },
  {
    name: "Varanasi",
    lat: 25.32,
    lng: 83.01,
    significance: "Spiritual capital — where Guru Ravidas Ji composed His Bani",
    icon: "🛕",
  },
  {
    name: "Amritsar",
    lat: 31.63,
    lng: 74.87,
    significance: "Guru Ravidas Ji's Bani enshrined in Guru Granth Sahib",
    icon: "🕌",
  },
  {
    name: "London",
    lat: 51.51,
    lng: -0.13,
    significance: "BRHF HQ — Houses of Parliament Exhibition, Feb 2027",
    icon: "🇬🇧",
  },
  {
    name: "Birmingham",
    lat: 52.48,
    lng: -1.89,
    significance: "Shri Guru Ravidass Temple — largest outside India",
    icon: "🕌",
  },
  {
    name: "Brussels",
    lat: 50.85,
    lng: 4.35,
    significance: "European Parliament Be-gumpura Dialogue, Jan 2027",
    icon: "🇪🇺",
  },
  {
    name: "Toronto",
    lat: 43.65,
    lng: -79.38,
    significance: "Ravidassia diaspora community & Sikh-Dalit solidarity",
    icon: "🇨🇦",
  },
  {
    name: "New York",
    lat: 40.71,
    lng: -74.01,
    significance: "Global Ravidassia community outreach & media",
    icon: "🗽",
  },
  {
    name: "São Paulo",
    lat: -23.55,
    lng: -46.63,
    significance: "South American Ravidassia community chapter",
    icon: "🇧🇷",
  },
  {
    name: "Frankfurt",
    lat: 50.11,
    lng: 8.68,
    significance: "European Ravidassia community chapter",
    icon: "🇩🇪",
  },
  {
    name: "Bedfordshire",
    lat: 52.13,
    lng: -0.46,
    significance: "BRHF Registered Charity HQ — Biggleswade",
    icon: "🏠",
  },
];

const CONNECTIONS: [number, number][] = [
  [0, 2],
  [2, 3],
  [3, 5],
  [4, 5],
  [4, 7],
  [4, 8],
  [4, 9],
  [4, 10],
  [4, 11],
  [6, 4],
  [6, 10],
  [1, 2],
  [1, 4],
];

// ─── Helpers ──────────────────────────────────────────────
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ─── Arc Line Component ───────────────────────────────────
function ArcLine({ start, end, radius }: { start: THREE.Vector3; end: THREE.Vector3; radius: number }) {
  const points = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(radius + dist * 0.35);
    const curve = new THREE.QuadraticBezierCurve3(
      start.clone().multiplyScalar(1.003),
      mid,
      end.clone().multiplyScalar(1.003)
    );
    return curve.getPoints(48);
  }, [start, end, radius]);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: "#c8860a", transparent: true, opacity: 0.12 });
    return new THREE.Line(geo, mat);
  }, [points]);

  return <primitive object={lineObj} />;
}

// ─── Globe Scene ──────────────────────────────────────────
function GlobeScene({
  onSelect,
}: {
  onSelect: (loc: Location) => void;
}) {
  const globeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const globeRadius = 2;
  const positions = useMemo(
    () => LOCATIONS.map((loc) => latLngToVec3(loc.lat, loc.lng, globeRadius)),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current && hovered === null) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshPhysicalMaterial
          color="#0b0710"
          roughness={0.85}
          metalness={0.1}
          clearcoat={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.012, 64, 64]} />
        <meshBasicMaterial color="#c8860a" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Wireframe grid */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.001, 36, 24]} />
        <meshBasicMaterial color="#c8860a" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Connection arcs */}
      {CONNECTIONS.map(([fromIdx, toIdx]) => (
        <ArcLine
          key={`${fromIdx}-${toIdx}`}
          start={positions[fromIdx]}
          end={positions[toIdx]}
          radius={globeRadius}
        />
      ))}

      {/* Location markers */}
      {LOCATIONS.map((loc, i) => {
        const pos = positions[i];
        const isHovered = hovered === i;

        return (
          <Marker
            key={i}
            position={pos}
            isHovered={isHovered}
            location={loc}
            globeRadius={globeRadius}
            onHover={() => setHovered(i)}
            onUnhover={() => setHovered(null)}
            onClick={() => onSelect(loc)}
          />
        );
      })}
    </group>
  );
}

// ─── Marker ───────────────────────────────────────────────
function Marker({
  position,
  isHovered,
  location,
  globeRadius,
  onHover,
  onUnhover,
  onClick,
}: {
  position: THREE.Vector3;
  isHovered: boolean;
  location: Location;
  globeRadius: number;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [cursorHovered, setCursorHovered] = useState(false);
  useCursor(isHovered || cursorHovered);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const base = isHovered ? 1.4 : 1;
      const pulse = 1 + Math.sin(t * 2.5 + position.x * 3) * 0.2;
      meshRef.current.scale.setScalar(base * pulse);
    }
  });

  const normal = position.clone().normalize();

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover();
          setCursorHovered(true);
        }}
        onPointerOut={() => {
          onUnhover();
          setCursorHovered(false);
        }}
      >
        <sphereGeometry args={[isHovered ? 0.035 : 0.022, 16, 16]} />
        <meshBasicMaterial color="#ff9d2f" transparent opacity={isHovered ? 1 : 0.85} />
      </mesh>

      {/* Pulse ring */}
      <mesh rotation={new THREE.Euler(Math.PI / 2, 0, 0)}>
        <ringGeometry args={[0.04, 0.07, 32]} />
        <meshBasicMaterial
          color="#ff9d2f"
          transparent
          opacity={isHovered ? 0.5 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label */}
      {(isHovered || cursorHovered) && (
        <Html position={[0, 0.18, 0]} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-bg/90 backdrop-blur-md border border-saffron/40 text-[11px] font-semibold text-ink shadow-xl shadow-saffron/10">
            <span className="mr-1">{location.icon}</span>
            {location.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────
export function ConnectGlobe() {
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);

  return (
    <div>
      {/* Globe Canvas */}
      <div className="w-full h-125 md:h-145 rounded-3xl overflow-hidden border border-saffron/20 card-glass relative">
        <Canvas
          camera={{ position: [0, 1.2, 5.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#0b0710"]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 3, 5]} intensity={0.8} color="#ff9d2f" />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#6366f1" />
          <Stars radius={120} depth={60} count={2000} factor={3} saturation={0} fade speed={0.3} />
          <GlobeScene onSelect={setSelectedLoc} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3.2}
            maxDistance={9}
            dampingFactor={0.06}
            rotateSpeed={0.4}
            zoomSpeed={0.6}
          />
        </Canvas>

        {/* Overlay */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <p className="text-[10px] font-bold text-saffron/60 uppercase tracking-[0.25em] mb-1">
            Global Network
          </p>
          <h3 className="font-display text-lg md:text-xl font-bold text-gradient-saffron">
            Be-gumpura Across the World
          </h3>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[10px] text-saffron/40 uppercase tracking-widest">
            Drag to rotate · Scroll to zoom · Click markers to explore
          </p>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 p-5 md:p-6 rounded-2xl card-glass card-saffron-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{selectedLoc.icon}</div>
                <div>
                  <h4 className="font-display text-base font-bold text-ink">
                    {selectedLoc.name}
                  </h4>
                  <p className="text-xs text-saffron font-semibold mt-0.5 uppercase tracking-wider">
                    Significance
                  </p>
                  <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                    {selectedLoc.significance}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLoc(null)}
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
