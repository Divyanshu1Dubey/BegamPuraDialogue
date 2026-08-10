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
// Canvas Earth Texture — vivid continents drawn with Canvas 2D
// ═══════════════════════════════════════════════════════════════
function createEarthTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  const W = 2048, H = 1024;
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  // Vivid high-contrast colors
  const OCEAN   = [30, 110, 220];   // saturated bright blue
  const LAND    = [48, 170, 55];    // vivid green
  const LAND_HI = [78, 215, 86];    // lighter green for highlights
  const LAND_DK = [25, 110, 32];    // darker green for shading
  const ICE     = [230, 245, 255];  // polar ice caps
  const COAST   = [15, 60, 18];     // dark coast outline

  // Ocean background
  ctx.fillStyle = `rgb(${OCEAN[0]},${OCEAN[1]},${OCEAN[2]})`;
  ctx.fillRect(0, 0, W, H);

  // Subtle ocean texture
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    const a = Math.random() * 0.05;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, 3, 3);
  }

  // Convert [lng, lat] → canvas pixels
  const toXY = (lng: number, lat: number): [number, number] => [
    ((lng + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];

  // Continent polygons [lng, lat] — recognizable outlines
  const continents: [number, number][][] = [
    // North America (main)
    [[-130,50],[-125,60],[-115,62],[-100,65],[-85,70],[-65,62],[-55,50],[-65,45],[-75,35],[-82,25],[-90,18],[-100,20],[-105,22],[-110,30],[-118,34],[-122,37],[-125,42],[-130,50]],
    // Alaska
    [[-165,65],[-160,70],[-145,70],[-135,58],[-140,60],[-152,60],[-165,65]],
    // South America
    [[-80,10],[-65,12],[-50,5],[-35,-5],[-35,-15],[-38,-22],[-45,-24],[-48,-28],[-53,-34],[-58,-38],[-65,-48],[-72,-55],[-72,-40],[-70,-18],[-75,-5],[-77,0],[-80,5],[-80,10]],
    // Africa
    [[-15,35],[10,37],[25,32],[35,30],[42,12],[50,12],[50,0],[42,-12],[35,-25],[28,-33],[18,-35],[12,-18],[8,-5],[10,5],[0,5],[-5,5],[-10,8],[-15,10],[-17,15],[-15,20],[-13,28],[-15,35]],
    // Europe (expanded)
    [[-10,36],[-5,43],[-10,44],[0,48],[-5,48],[2,51],[5,48],[8,54],[12,55],[15,58],[25,60],[30,65],[32,70],[40,70],[45,65],[40,55],[30,50],[28,45],[25,40],[20,38],[15,38],[10,36],[5,38],[0,38],[-5,36],[-10,36]],
    // Asia (simplified, larger)
    [[30,65],[40,68],[50,55],[60,50],[68,45],[75,38],[80,30],[88,25],[92,22],[95,18],[100,14],[105,10],[108,2],[105,-2],[100,-5],[95,-2],[90,5],[80,8],[70,18],[60,25],[50,28],[40,38],[30,42],[28,45],[25,40],[20,38],[15,38],[10,36],[5,38],[0,38],[-5,36],[-10,36],[-5,43],[0,48],[5,48],[8,54],[15,58],[25,60],[30,65]],
    // India subcontinent
    [[68,30],[72,25],[75,15],[78,8],[80,12],[82,18],[85,22],[88,23],[90,25],[88,28],[85,30],[78,32],[72,32],[68,30]],
    // Australia
    [[115,-15],[130,-12],[137,-12],[142,-15],[148,-18],[153,-25],[153,-30],[150,-35],[145,-38],[140,-38],[135,-35],[130,-32],[120,-35],[115,-33],[114,-25],[115,-15]],
    // New Zealand
    [[166,-35],[168,-37],[172,-40],[175,-42],[178,-42],[178,-38],[175,-36],[172,-34],[166,-35]],
    // Japan
    [[130,31],[132,33],[135,35],[137,37],[140,40],[142,43],[145,45],[143,42],[140,39],[137,36],[134,34],[130,31]],
    // Indonesia / Borneo
    [[108,2],[112,0],[116,-2],[118,-4],[117,-6],[114,-8],[110,-8],[107,-4],[106,-1],[108,2]],
    // Sri Lanka
    [[80,10],[81,8],[82,7],[82,6],[81,6],[80,8],[80,10]],
    // Madagascar
    [[44,-13],[46,-16],[48,-22],[50,-25],[48,-25],[46,-22],[44,-18],[43,-15],[44,-13]],
    // UK / Ireland
    [[-10,50],[-6,50],[-5,52],[2,52],[2,55],[-1,56],[-3,58],[-5,58],[-6,55],[-3,52],[-6,50],[-10,50]],
    // Scandinavia
    [[5,58],[8,60],[12,62],[15,65],[18,68],[22,70],[25,71],[30,70],[25,65],[18,62],[12,58],[8,56],[5,58]],
    // Greenland
    [[-55,60],[-45,60],[-20,65],[-18,72],[-20,78],[-30,82],[-45,83],[-55,80],[-55,75],[-50,70],[-55,60]],
    // Philippines
    [[118,10],[120,12],[122,15],[124,14],[123,12],[121,10],[119,9],[118,10]],
  ];

  continents.forEach((poly) => {
    const pts = poly.map(([lng, lat]) => toXY(lng, lat));
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;

    let maxDist = 0;
    for (const p of pts) {
      const d = Math.hypot(p[0] - cx, p[1] - cy);
      if (d > maxDist) maxDist = d;
    }
    maxDist = Math.max(maxDist, 1);

    // Polar ice detection
    const avgLat = poly.reduce((s, p) => s + p[1], 0) / poly.length;
    const isPolar = Math.abs(avgLat) > 60;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.clip();

    if (isPolar) {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDist * 1.1);
      grad.addColorStop(0, `rgb(${ICE[0]},${ICE[1]},${ICE[2]})`);
      grad.addColorStop(0.7, `rgb(${ICE[0]},${ICE[1]},${ICE[2]})`);
      grad.addColorStop(1, `rgb(${LAND[0]},${LAND[1]},${LAND[2]})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      const grad = ctx.createRadialGradient(cx, cy, maxDist * 0.02, cx, cy, maxDist * 1.15);
      grad.addColorStop(0, `rgb(${LAND_HI[0]},${LAND_HI[1]},${LAND_HI[2]})`);
      grad.addColorStop(0.3, `rgb(${LAND[0]},${LAND[1]},${LAND[2]})`);
      grad.addColorStop(0.7, `rgb(${LAND_DK[0]},${LAND_DK[1]},${LAND_DK[2]})`);
      grad.addColorStop(1, `rgb(${OCEAN[0]},${OCEAN[1]},${OCEAN[2]})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();

    // Coastline
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.strokeStyle = `rgba(${COAST[0]},${COAST[1]},${COAST[2]},0.6)`;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // Grid lines — subtle
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * H;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  // Equator — slightly brighter
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();

  // Saffron location markers
  LOCATIONS.forEach((loc) => {
    const [x, y] = toXY(loc.lng, loc.lat);

    // Soft glow
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
    glow.addColorStop(0, "rgba(255,153,51,0.35)");
    glow.addColorStop(1, "rgba(255,153,51,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 18, y - 18, 36, 36);

    // Dot
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,153,51,0.95)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,220,150,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

// ═══════════════════════════════════════════════════════════════
// Earth Mesh — canvas texture with MeshBasicMaterial for
// maximum visibility (no shading darkening the colors)
// ═══════════════════════════════════════════════════════════════
function EarthMesh() {
  const texture = useMemo(() => createEarthTexture(), []);
  return (
    <mesh>
      <sphereGeometry args={[R, 128, 96]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// Atmosphere — Fresnel edge glow (saffron)
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
          precision highp float;
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
        blending: THREE.AdditiveBlending,
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
  const positions = useMemo(() => LOCATIONS.map((l) => ll(l.lat, l.lng, R)), []);

  useFrame((_, delta) => {
    if (groupRef.current && hovered === null && flyToId === null) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <EarthMesh />
      <Atmosphere />

      {CONNECTIONS.map(([a, b], i) => (
        <FlightArc key={i} a={positions[a]} b={positions[b]} idx={i} />
      ))}

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

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-5 right-5 z-20 w-72"
            >
              <div className="p-5 rounded-2xl bg-[#0d1b2a]/85 backdrop-blur-xl border border-saffron/30 shadow-2xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-2xl">{selectedLoc.icon}</span>
                    <h4 className="font-display text-lg font-bold text-white leading-tight">{selectedLoc.name}</h4>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-saffron/80 font-medium leading-relaxed">
                  {selectedLoc.significance}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-white/40">
                  <MapPinIcon />
                  <span>{selectedLoc.lat.toFixed(2)}°, {selectedLoc.lng.toFixed(2)}°</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
