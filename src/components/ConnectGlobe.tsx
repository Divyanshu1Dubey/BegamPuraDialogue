"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
// Earth Texture — visible continents, blue ocean, 3D shading
// ═══════════════════════════════════════════════════════════════
function createEarthTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  const W = 1024, H = 512;
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(W, H);
  const d = img.data;

  // Ocean base: deep blue #0d1b2a
  const OCEAN_R = 0x0d, OCEAN_G = 0x1b, OCEAN_B = 0x2a;
  // Land base: muted green-blue #1e3a32
  const LAND_R = 0x2e, LAND_G = 0x5a, LAND_B = 0x4a;
  // Highlight: warm amber-tinted land #c8860a → rgb(200,134,10)
  const HILITE_R = 0xc8, HILITE_G = 0x86, HILITE_B = 0x0a;
  // Grid line color: subtle saffron
  const GRID_R = 0x55, GRID_G = 0x44, GRID_B = 0x66;

  // [latCenter, lngCenter, latHalfSpan, lngHalfSpan]
  const landAreas: [number, number, number, number][] = [
    [22, 80, 14, 11],      // India
    [27, 66, 8, 8],        // Pakistan / Indus
    [50, 18, 12, 28],      // Europe
    [5, 22, 28, 18],       // Africa
    [45, -100, 25, 30],    // North America
    [-15, -55, 22, 14],    // South America
    [10, 108, 8, 18],      // SE Asia / Indonesia
    [-25, 134, 11, 14],    // Australia
    [62, 100, 14, 70],     // Russia / Siberia
    [30, 50, 7, 7],        // Middle East / Iran
    [55, 50, 10, 25],      // Central Asia / steppe
    [15, -10, 6, 8],       // West Africa bulge
    [35, -90, 5, 10],      // Central America
    [0, 20, 10, 10],       // Central Africa
    [70, 40, 8, 20],       // Scandinavia / Arctic
  ];

  for (let py = 0; py < H; py++) {
    const lat = 90 - (py / H) * 180;
    // Hemisphere shading: lighter near the prime meridian center, darker at edges
    const shadeBase = 1.0;

    for (let px = 0; px < W; px++) {
      const lng = (px / W) * 360 - 180;
      const idx = (py * W + px) * 4;

      // Hemisphere shading (lighter near center of view, darker at wrap edges)
      const shade = shadeBase;

      // Check land
      let landIntensity = 0;
      for (const [clat, clng, cLatS, cLngS] of landAreas) {
        const dy = (lat - clat) / cLatS;
        const dx = (lng - clng) / cLngS;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 1) {
          landIntensity = Math.max(landIntensity, (1 - dist2));
        }
      }

      if (landIntensity > 0) {
        // Mix land color with highlight based on intensity
        const t = landIntensity;
        // Edge of continents → darker, center → lighter with warm tint
        const warm = t > 0.6 ? (t - 0.6) / 0.4 : 0; // 0 to 1 at center
        d[idx]     = Math.min(255, Math.round((LAND_R * 0.6 + HILITE_R * 0.1 + warm * 0.08) * shade * 255 / 100));
        d[idx + 1] = Math.min(255, Math.round((LAND_G * 0.5 + HILITE_G * 0.1 + warm * 0.05) * shade * 255 / 100));
        d[idx + 2] = Math.min(255, Math.round((LAND_B * 0.6 + HILITE_B * 0.15) * shade * 255 / 100));
      } else {
        d[idx]     = Math.round(OCEAN_R * shade);
        d[idx + 1] = Math.round(OCEAN_G * shade);
        d[idx + 2] = Math.round(OCEAN_B * shade);
      }

      // Grid lines every 30 degrees — visible saffron
      const latMod = Math.abs(((lat % 30) + 30) % 30);
      const lngMod = Math.abs(((lng % 30) + 180) % 30 - 15);
      const onLatGrid = latMod < 0.6;
      const onLngGrid = lngMod < 0.5;
      if (onLatGrid || onLngGrid) {
        d[idx]     = Math.min(255, d[idx] + 35);
        d[idx + 1] = Math.min(255, d[idx + 1] + 28);
        d[idx + 2] = Math.min(255, d[idx + 2] + 45);
      }

      // Equator highlight
      if (Math.abs(lat) < 0.5) {
        d[idx]     = Math.min(255, d[idx] + 20);
        d[idx + 1] = Math.min(255, d[idx + 1] + 18);
        d[idx + 2] = Math.min(255, d[idx + 2] + 25);
      }
    }
  }

  ctx.putImageData(img, 0, 0);

  // Glow at each location
  LOCATIONS.forEach((loc) => {
    const px = ((loc.lng + 180) / 360) * W;
    const py = ((90 - loc.lat) / 180) * H;
    const grad = ctx.createRadialGradient(px, py, 0, px, py, 14);
    grad.addColorStop(0, "rgba(255,157,47,0.8)");
    grad.addColorStop(0.3, "rgba(255,157,47,0.35)");
    grad.addColorStop(1, "rgba(255,157,47,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, 14, 0, Math.PI * 2);
    ctx.fill();
  });

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ═══════════════════════════════════════════════════════════════
// Atmosphere — Fresnel edge glow
// ═══════════════════════════════════════════════════════════════
function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: /* glsl */ `
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;
          void main() {
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float f = 1.0 - dot(viewDir, vWorldNormal);
            f = pow(f, 3.5);
            gl_FragColor = vec4(0.784, 0.525, 0.039, f * 0.45);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );
  return <mesh geometry={new THREE.SphereGeometry(R * 1.15, 64, 64)} material={mat} />;
}

// ═══════════════════════════════════════════════════════════════
// Flight Arc
// ═══════════════════════════════════════════════════════════════
function FlightArc({ a, b, idx }: { a: THREE.Vector3; b: THREE.Vector3; idx: number }) {
  const { curve } = useMemo(() => {
    const s = a.clone().normalize().multiplyScalar(R + 0.006);
    const e = b.clone().normalize().multiplyScalar(R + 0.006);
    const m = s.clone().add(e).multiplyScalar(0.5);
    m.normalize().multiplyScalar(R + s.distanceTo(e) * 0.32);
    return { curve: new THREE.QuadraticBezierCurve3(s, m, e) };
  }, [a, b]);

  const pts = useMemo(() => curve.getPoints(48), [curve]);
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
      <primitive
        object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: "#c8860a", transparent: true, opacity: 0.08, depthWrite: false })
        )}
      />
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
// Marker
// ═══════════════════════════════════════════════════════════════
function Marker({
  pos, loc, selected, hovered, onHover, onUnhover, onClick,
}: {
  pos: THREE.Vector3; loc: Location; selected: boolean; hovered: boolean;
  onHover: () => void; onUnhover: () => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = selected ? 1.7 : hovered ? 1.35 : 1;
    ref.current.scale.setScalar(s * (1 + Math.sin(clock.elapsedTime * 3 + loc.id) * 0.15));
  });

  return (
    <group position={pos}>
      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.09, 32]} />
        <meshBasicMaterial color="#ff9d2f" transparent opacity={selected ? 0.4 : 0.15} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Dot */}
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
        onPointerOut={() => onUnhover()}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <sphereGeometry args={[selected ? 0.032 : hovered ? 0.026 : 0.02, 16, 16]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={selected ? 1 : 0.9} />
      </mesh>

      {/* Label */}
      {(hovered || selected) && (
        <Html position={[0, 0.16, 0]} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0d1b2a]/90 backdrop-blur-md border border-saffron/50 text-[11px] font-semibold text-white shadow-xl shadow-black/40">
            <span className="mr-1">{loc.icon}</span>
            {loc.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Camera Controller — smooth fly-to animation
// ═══════════════════════════════════════════════════════════════
function CameraRig({ targetId, onDone }: { targetId: number | null; onDone: () => void }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1.2, 5.5));
  const animating = useRef(false);
  const startPos = useRef(camera.position.clone());
  const progress = useRef(0);

  useEffect(() => {
    if (targetId === null) {
      targetPos.current.set(0, 1.2, 5.5);
    } else if (targetId >= 0 && targetId < LOCATIONS.length) {
      const loc = LOCATIONS[targetId];
      const surface = ll(loc.lat, loc.lng, R);
      const dir = surface.clone().normalize();
      const camPos = dir.multiplyScalar(R + 2.4);
      camPos.y += 0.8;
      targetPos.current.copy(camPos);
    }
    animating.current = true;
    startPos.current.copy(camera.position);
    progress.current = 0;
  }, [targetId, camera]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    progress.current += delta * 0.7;
    const t = Math.min(progress.current, 1);
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
  const positions = useMemo(() => LOCATIONS.map((l) => ll(l.lat, l.lng, R)), []);

  useFrame((_, delta) => {
    if (groupRef.current && hovered === null && flyToId === null) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere — meshBasicMaterial shows texture exactly as painted */}
      <mesh>
        <sphereGeometry args={[R, 96, 72]} />
        <meshBasicMaterial map={earthTex} />
      </mesh>

      {/* Atmosphere glow */}
      <Atmosphere />

      {/* Connection arcs */}
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
  const selectedLoc = selectedId !== null ? LOCATIONS[selectedId] : null;

  const handleSelect = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
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
          <color attach="background" args={["#020510"]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 3, 5]} intensity={0.8} color="#ff9d2f" />
          <pointLight position={[-5, -2, -5]} intensity={0.25} color="#6366f1" />
          <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.2} />

          <CameraRig targetId={selectedId} onDone={() => {}} />
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
          <p className="text-[10px] font-bold text-saffron/60 uppercase tracking-[0.3em] mb-1">
            Global Network
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            Be-gumpura Across the World
          </h3>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[10px] text-white/25 uppercase tracking-widest">
            Drag to rotate · Scroll to zoom · Click markers to explore
          </p>
        </div>

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
