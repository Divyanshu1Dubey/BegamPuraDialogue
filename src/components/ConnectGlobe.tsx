"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
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
// Canvas 2D Earth Texture — vivid, always works, no external assets
// ═══════════════════════════════════════════════════════════════
function createEarthTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  const W = 2048, H = 1024;
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  // Color palette
  const OCEAN   = [25, 100, 210];
  const LAND    = [34, 160, 45];
  const LAND_HI = [65, 200, 72];
  const LAND_DK = [18, 90, 28];
  const ICE     = [225, 240, 255];
  const COAST   = [10, 50, 12];

  // Ocean base
  ctx.fillStyle = `rgb(${OCEAN[0]},${OCEAN[1]},${OCEAN[2]})`;
  ctx.fillRect(0, 0, W, H);

  // Lat/lng → pixel coords (equirectangular)
  const toXY = (lng: number, lat: number): [number, number] => {
    const x = ((lng + 180) / 360) * W;
    const y = ((90 - lat) / 180) * H;
    return [x, y];
  };

  // Draw a filled ellipse (continent blob) at (lng, lat) center
  // rx = half-width in degrees → pixels; ry = half-height → pixels
  function continent(cx: number, cy: number, rx: number, ry: number, color: string, highlight = false) {
    const [px, py] = toXY(cx, cy);
    const prx = (rx / 360) * W;
    const pry = (ry / 180) * H;

    // Radial gradient for depth
    const g = ctx.createRadialGradient(px, py, 0, px, py, Math.max(prx, pry));
    if (highlight) {
      const c = LAND_HI.map(v => Math.min(255, v + 40)).map(v => Math.round(v));
      g.addColorStop(0, `rgb(${c[0]},${c[1]},${c[2]})`);
      g.addColorStop(0.6, color);
      const d = LAND_DK.map(v => Math.round(v));
      g.addColorStop(1, `rgb(${d[0]},${d[1]},${d[2]})`);
    } else {
      const lh = LAND_HI.map(v => Math.round(v));
      g.addColorStop(0, `rgb(${lh[0]},${lh[1]},${lh[2]})`);
      g.addColorStop(0.55, color);
      const ld = LAND_DK.map(v => Math.round(v));
      g.addColorStop(1, `rgb(${ld[0]},${ld[1]},${ld[2]})`);
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(px, py, prx, pry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ══════════════════════════════════════════════════
  // Continent definitions: [center_lng, center_lat, rx_deg, ry_deg]
  // ══════════════════════════════════════════════════

  // ── North America (main body) ────────────────────
  continent(-100, 45, 30, 22, `rgb(${LAND.join(",")})`);
  // Alaska
  continent(-152, 63, 12, 8, `rgb(${LAND.join(",")})`);
  // Canada shield (more land up north)
  continent(-95, 58, 35, 15, `rgb(${LAND_DK.join(",")})`, true);
  // Mexico / Central America
  continent(-100, 22, 10, 8, `rgb(${LAND.join(",")})`);
  continent(-85, 15, 5, 5, `rgb(${LAND_DK.join(",")})`, true);

  // ── South America ────────────────────────────────
  continent(-60, -10, 15, 25, `rgb(${LAND.join(",")})`);
  continent(-55, -20, 12, 18, `rgb(${LAND_DK.join(",")})`, true);
  // Brazil bulge
  continent(-48, -5, 12, 10, `rgb(${LAND_HI.join(",")})`);

  // ── Europe ───────────────────────────────────────
  continent(10, 48, 22, 14, `rgb(${LAND.join(",")})`);
  // Scandinavia
  continent(15, 62, 10, 8, `rgb(${LAND.join(",")})`);
  // UK & Ireland
  continent(-3, 54, 4, 4, `rgb(${LAND.join(",")})`);
  // Iberian Peninsula
  continent(-5, 40, 6, 6, `rgb(${LAND.join(",")})`);
  // Italy boot
  continent(12, 42, 3, 7, `rgb(${LAND.join(",")})`);

  // ── Africa ───────────────────────────────────────
  continent(20, 5, 22, 28, `rgb(${LAND_DK.join(",")})`, true);
  continent(20, -5, 18, 22, `rgb(${LAND.join(",")})`);
  // West Africa bulge
  continent(-5, 12, 10, 10, `rgb(${LAND_HI.join(",")})`);
  // East Africa / horn
  continent(40, 5, 8, 12, `rgb(${LAND.join(",")})`);
  // Southern Africa
  continent(25, -25, 8, 10, `rgb(${LAND.join(",")})`);
  // Madagascar
  continent(47, -20, 2, 5, `rgb(${LAND.join(",")})`);

  // ── Asia (main body) ─────────────────────────────
  continent(80, 42, 40, 22, `rgb(${LAND.join(",")})`);
  // Siberia / Central Asia
  continent(90, 55, 35, 18, `rgb(${LAND_DK.join(",")})`, true);
  // Middle East
  continent(45, 30, 15, 10, `rgb(${LAND_DK.join(",")})`, true);
  // Arabian Peninsula
  continent(48, 22, 8, 10, `rgb(${LAND.join(",")})`);
  // South-east Asia / Indochina
  continent(105, 15, 12, 12, `rgb(${LAND.join(",")})`);
  // China / East Asia
  continent(110, 35, 18, 15, `rgb(${LAND_HI.join(",")})`);
  // Japan islands
  continent(138, 36, 3, 6, `rgb(${LAND.join(",")})`);
  continent(132, 33, 2, 4, `rgb(${LAND.join(",")})`);

  // ── Indian subcontinent ───────────────────────────
  continent(78, 22, 10, 14, `rgb(${LAND_HI.join(",")})`);
  // India southern tip
  continent(78, 12, 8, 8, `rgb(${LAND.join(",")})`);
  // Sri Lanka
  continent(81, 8, 1.5, 3, `rgb(${LAND.join(",")})`);

  // ── Australia ────────────────────────────────────
  continent(134, -25, 16, 12, `rgb(${LAND_DK.join(",")})`, true);
  continent(134, -20, 14, 10, `rgb(${LAND.join(",")})`);

  // ── Indonesia / Philippines ──────────────────────
  continent(110, -2, 15, 4, `rgb(${LAND.join(",")})`);
  continent(120, -3, 6, 4, `rgb(${LAND.join(",")})`);
  continent(125, 10, 4, 3, `rgb(${LAND.join(",")})`);

  // ── New Zealand ──────────────────────────────────
  continent(173, -42, 1.5, 5, `rgb(${LAND.join(",")})`);

  // ══════════════════════════════════════════════════
  // Ice Caps
  // ══════════════════════════════════════════════════
  // North pole
  const nGrad = ctx.createLinearGradient(0, 0, 0, 80);
  nGrad.addColorStop(0, `rgb(${ICE.join(",")})`);
  nGrad.addColorStop(1, `rgb(${ICE.join(",")})`);
  ctx.fillStyle = nGrad;
  ctx.beginPath();
  ctx.ellipse(W / 2, 0, W / 2, 60, 0, 0, Math.PI * 2);
  ctx.fill();

  // South pole
  const sGrad = ctx.createLinearGradient(0, H, 0, H - 70);
  sGrad.addColorStop(0, `rgb(${ICE.join(",")})`);
  sGrad.addColorStop(1, `rgb(${ICE.join(",")})`);
  ctx.fillStyle = sGrad;
  ctx.beginPath();
  ctx.ellipse(W / 2, H, W / 2, 55, 0, 0, Math.PI * 2);
  ctx.fill();

  // ══════════════════════════════════════════════════
  // Coast outlines — draw darker stroke around each blob
  // ══════════════════════════════════════════════════
  ctx.strokeStyle = `rgb(${COAST.join(",")})`;
  ctx.lineWidth = 1.2;

  // Simplified coast polygons (fewer points = still recognizable)
  function coastOutline(points: [number, number][]) {
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = toXY(points[i][0], points[i][1]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // North America outline
  coastOutline([
    [-130,55],[-125,60],[-120,65],[-115,70],[-100,72],[-85,70],
    [-75,62],[-65,60],[-55,48],[-65,44],[-70,42],[-75,35],
    [-80,25],[-85,20],[-90,18],[-95,16],[-100,18],[-105,22],
    [-110,30],[-115,32],[-120,35],[-122,38],[-125,42],[-128,48],[-130,55]
  ]);

  // South America outline
  coastOutline([
    [-80,10],[-75,12],[-60,10],[-50,5],[-35,-5],[-35,-15],
    [-38,-22],[-42,-23],[-48,-28],[-50,-30],[-55,-35],[-58,-40],
    [-65,-45],[-68,-50],[-70,-55],[-75,-50],[-72,-40],[-70,-35],
    [-70,-20],[-75,-10],[-78,-2],[-80,5],[-80,10]
  ]);

  // Africa outline
  coastOutline([
    [-15,15],[-17,20],[-15,28],[-10,35],[10,37],[12,33],
    [25,32],[33,30],[37,28],[42,15],[50,12],[50,2],
    [42,-5],[40,-12],[36,-20],[33,-27],[28,-33],[20,-35],
    [15,-30],[12,-22],[10,-5],[5,5],[-5,5],[-10,8],[-15,15]
  ]);

  // Europe outline
  coastOutline([
    [-10,36],[-5,38],[0,43],[5,44],[8,48],[5,52],
    [10,55],[15,58],[20,60],[30,65],[40,65],[50,58],
    [55,55],[45,50],[40,48],[30,45],[25,42],[20,40],
    [15,38],[10,36],[5,36],[-5,37],[-10,36]
  ]);

  // Asia outline (very simplified)
  coastOutline([
    [30,42],[40,42],[50,40],[55,42],[60,40],[70,38],
    [75,35],[80,30],[85,28],[90,22],[95,20],[100,15],
    [105,10],[110,5],[115,5],[120,10],[122,20],[125,25],
    [130,30],[135,35],[140,40],[145,45],[140,50],[135,55],
    [130,60],[120,65],[100,70],[80,72],[60,68],[50,60],
    [40,55],[35,50],[30,45],[30,42]
  ]);

  // India outline
  coastOutline([
    [68,25],[72,22],[75,18],[77,12],[78,8],[80,10],
    [82,15],[85,20],[88,22],[90,22],[92,20],[88,18],
    [85,15],[82,12],[80,8],[78,5],[76,8],[74,12],
    [72,18],[70,22],[68,25]
  ]);

  // Australia outline
  coastOutline([
    [115,-15],[120,-14],[130,-12],[135,-15],[140,-18],
    [145,-20],[150,-25],[153,-28],[152,-33],[148,-38],
    [145,-40],[138,-35],[130,-32],[120,-35],[115,-33],
    [115,-25],[114,-22],[115,-15]
  ]);

  // ══════════════════════════════════════════════════
  // Location markers — saffron dots with glow
  // ══════════════════════════════════════════════════
  LOCATIONS.forEach((loc) => {
    const [x, y] = toXY(loc.lng, loc.lat);

    // Glow
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 16);
    glow.addColorStop(0, "rgba(255,153,51,0.4)");
    glow.addColorStop(1, "rgba(255,153,51,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 16, y - 16, 32, 32);

    // Dot
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,170,60,0.95)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff5cc";
    ctx.fill();
  });

  // ══════════════════════════════════════════════════
  // Grid lines — subtle longitude/latitude
  // ══════════════════════════════════════════════════
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let lng = -180; lng < 180; lng += 30) {
    const [x] = toXY(lng, 0);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let lat = -60; lat <= 90; lat += 30) {
    const [, y] = toXY(0, lat);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // ══════════════════════════════════════════════════
  // Create texture
  // ══════════════════════════════════════════════════
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

// ═══════════════════════════════════════════════════════════════
// Earth Mesh — Canvas 2D procedural texture
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
// Marker — custom HTML markers on globe surface
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

  const arcsData = useMemo(() =>
    CONNECTIONS.map(([a, b]) => ({
      startLat: LOCATIONS[a].lat,
      startLng: LOCATIONS[a].lng,
      endLat: LOCATIONS[b].lat,
      endLng: LOCATIONS[b].lng,
      color: "#ff9d2f",
    }))
  , []);

  const markersData = useMemo(() =>
    LOCATIONS.map((loc) => ({
      lat: loc.lat,
      lng: loc.lng,
      size: 0.08,
      color: "#ffb347",
    }))
  , []);

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
        {/* Globe temporarily hidden for presentation */}
        <div
          className="w-full flex items-center justify-center rounded-3xl relative card-saffron-glow"
          style={{ height: "clamp(420px, 55vh, 640px)", border: "1px solid rgba(200,134,10,0.18)" }}
        >
          <div className="text-center">
            <p className="text-saffron/40 text-sm tracking-wide">Interactive Globe</p>
            <p className="text-white/15 text-xs mt-1">Coming soon — under development</p>
          </div>
        </div>

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
