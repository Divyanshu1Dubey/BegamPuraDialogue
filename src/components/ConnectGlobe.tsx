"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, MapPin, Compass, RotateCcw, Search, Sparkles, Navigation } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// Types & India Gurudwara & Sacred Sites Database
// ═══════════════════════════════════════════════════════════════
export interface Location {
  id: number;
  name: string;
  category: "Janam Asthan" | "Historic Gurudwara" | "Holy Tapp Asthan" | "Spiritual Center" | "Sacred Takht";
  city: string;
  state: string;
  lat: number;
  lng: number;
  significance: string;
  icon: string;
}

const INDIA_GURUDWARA_LOCATIONS: Location[] = [
  {
    id: 0,
    name: "Sri Harmandir Sahib (Golden Temple)",
    category: "Historic Gurudwara",
    city: "Amritsar",
    state: "Punjab",
    lat: 31.6200,
    lng: 74.8765,
    significance: "Golden Temple, Amritsar — Supreme spiritual center where 41 sacred Shabads (hymns) of Sant Ravidas Ji are enshrined in Sri Guru Granth Sahib Ji.",
    icon: "🛕",
  },
  {
    id: 1,
    name: "Shri Guru Ravidas Janam Asthan Mandir",
    category: "Janam Asthan",
    city: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.2677,
    lng: 83.0062,
    significance: "Janam Asthan — Sacred birthplace of Sant Ravidas Ji Maharaj at Seer Govardhanpur, Varanasi. Primary pilgrimage destination for millions of devotees globally.",
    icon: "🕉️",
  },
  {
    id: 2,
    name: "Gurudwara Sis Ganj Sahib",
    category: "Historic Gurudwara",
    city: "Chandni Chowk",
    state: "Delhi",
    lat: 28.6558,
    lng: 77.2323,
    significance: "Historic Sikh shrine in Chandni Chowk, Old Delhi, marking the supreme martyrdom site of Ninth Sikh Guru Sri Guru Tegh Bahadur Ji.",
    icon: "🕌",
  },
  {
    id: 3,
    name: "Gurudwara Bangla Sahib",
    category: "Historic Gurudwara",
    city: "Connaught Place",
    state: "Delhi",
    lat: 28.6264,
    lng: 77.2091,
    significance: "Prominent Sikh Gurudwara in New Delhi famous for its holy healing Sarovar, golden dome, and round-the-clock Langar seva.",
    icon: "🕍",
  },
  {
    id: 4,
    name: "Gurudwara Shri Guru Ravidas Asthan",
    category: "Holy Tapp Asthan",
    city: "Tughlaqabad",
    state: "Delhi",
    lat: 28.5155,
    lng: 77.2644,
    significance: "Historic sacred land in Tughlaqabad, New Delhi, visited by Sant Ravidas Ji during His spiritual travels across northern India.",
    icon: "🛕",
  },
  {
    id: 5,
    name: "Gurudwara Sri Khuralgarh Sahib (Charan Chho Ganga)",
    category: "Holy Tapp Asthan",
    city: "Garhshankar, Hoshiarpur",
    state: "Punjab",
    lat: 31.2588,
    lng: 76.1772,
    significance: "Tapp Asthan & Charan Chho Ganga — Holy site where Sant Ravidas Ji stayed for 4 years and struck His foot to manifest a holy spring.",
    icon: "🌊",
  },
  {
    id: 6,
    name: "Dera Sachkhand Ballan",
    category: "Spiritual Center",
    city: "Jalandhar",
    state: "Punjab",
    lat: 31.4050,
    lng: 75.6472,
    significance: "Global spiritual headquarters near Jalandhar, Punjab, dedicated to spreading the teachings, Bani, and equality message of Sant Ravidas Ji.",
    icon: "🚩",
  },
  {
    id: 7,
    name: "Takht Sri Keshgarh Sahib",
    category: "Sacred Takht",
    city: "Anandpur Sahib",
    state: "Punjab",
    lat: 31.2359,
    lng: 76.4988,
    significance: "Birthplace of the Khalsa at Anandpur Sahib, Punjab, upholding the ideals of universal brotherhood and social justice.",
    icon: "⚔️",
  },
  {
    id: 8,
    name: "Takht Sri Patna Sahib",
    category: "Sacred Takht",
    city: "Patna Sahib",
    state: "Bihar",
    lat: 25.6146,
    lng: 85.2268,
    significance: "Historic Takht in Patna, Bihar, celebrating the rich interfaith heritage of northern and eastern India.",
    icon: "🕍",
  },
  {
    id: 9,
    name: "Takht Sachkhand Sri Hazur Abchalnagar Sahib",
    category: "Sacred Takht",
    city: "Nanded",
    state: "Maharashtra",
    lat: 19.1526,
    lng: 77.3188,
    significance: "Sacred Takht in Nanded, Maharashtra, where Sri Guru Granth Sahib Ji was eternalized as the perpetual Guru.",
    icon: "🚩",
  },
  {
    id: 10,
    name: "Gurudwara Shri Guru Ravidas Mandir",
    category: "Holy Tapp Asthan",
    city: "Haridwar",
    state: "Uttarakhand",
    lat: 29.9457,
    lng: 78.1642,
    significance: "Historic site along the holy Ganges in Haridwar visited by Sant Ravidas Ji during His discourses.",
    icon: "🕉️",
  },
  {
    id: 11,
    name: "Gurudwara Shri Guru Ravidas Ji",
    category: "Holy Tapp Asthan",
    city: "Kurukshetra",
    state: "Haryana",
    lat: 29.9695,
    lng: 76.8783,
    significance: "Sacred land in Kurukshetra, Haryana, commemorating the spiritual discourses of Sant Ravidas Ji during the Solar Eclipse gathering.",
    icon: "🛕",
  },
];

// Connection network linking Amritsar & Varanasi across India
const CONNECTIONS: [number, number][] = [
  [0, 1], // Amritsar - Varanasi
  [0, 2], // Amritsar - Delhi Sis Ganj
  [0, 3], // Amritsar - Delhi Bangla Sahib
  [0, 5], // Amritsar - Khuralgarh Sahib
  [0, 6], // Amritsar - Dera Ballan
  [0, 7], // Amritsar - Anandpur Sahib
  [1, 4], // Varanasi - Delhi Tughlaqabad
  [1, 8], // Varanasi - Patna Sahib
  [1, 9], // Varanasi - Nanded
  [1, 10], // Varanasi - Haridwar
  [0, 11], // Amritsar - Kurukshetra
];

const R = 2.2;

// ═══════════════════════════════════════════════════════════════
// Helpers & Responsive Camera Target Calculation
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

// Target Camera Vector centered on India (Lat: 22° N, Lng: 78.5° E)
function getIndiaCameraPosition(dist: number): THREE.Vector3 {
  return ll(22, 78.5, dist);
}

// ═══════════════════════════════════════════════════════════════
// Procedural Earth Texture Fallback
// ═══════════════════════════════════════════════════════════════
function createProceduralEarthTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  const W = 2048, H = 1024;
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0, "#07192f");
  oceanGrad.addColorStop(0.5, "#0e335d");
  oceanGrad.addColorStop(1, "#07192f");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  const toXY = (lng: number, lat: number): [number, number] => [
    ((lng + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];

  function continent(cx: number, cy: number, rx: number, ry: number, baseColor: string, detailColor: string) {
    const [px, py] = toXY(cx, cy);
    const prx = (rx / 360) * W;
    const pry = (ry / 180) * H;
    const g = ctx.createRadialGradient(px, py, 0, px, py, Math.max(prx, pry));
    g.addColorStop(0, detailColor);
    g.addColorStop(0.7, baseColor);
    g.addColorStop(1, "#0a2410");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(px, py, prx, pry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  continent(-100, 45, 32, 24, "#245422", "#3a8535"); // North America
  continent(-60, -15, 18, 28, "#1c4a1b", "#2e732c"); // South America
  continent(15, 50, 24, 16, "#2d5e23", "#478c3a"); // Europe
  continent(20, 5, 24, 30, "#4a4c1c", "#6e702c"); // Africa
  continent(85, 40, 42, 24, "#245422", "#478c3a"); // Asia
  continent(78, 22, 14, 18, "#3b7a2a", "#5fb843"); // India
  continent(134, -25, 18, 14, "#5e4a1e", "#8c6e2d"); // Australia

  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath(); ctx.ellipse(W / 2, 0, W / 2, 50, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(W / 2, H, W / 2, 45, 0, 0, Math.PI * 2); ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ═══════════════════════════════════════════════════════════════
// Photorealistic Earth Satellite Mesh
// ═══════════════════════════════════════════════════════════════
function RealEarthMesh() {
  const [earthTex, setEarthTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://unpkg.com/three-globe@2.45.2/example/img/earth-blue-marble.jpg",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        setEarthTex(tex);
      },
      undefined,
      () => {
        setEarthTex(createProceduralEarthTexture());
      }
    );
  }, []);

  const fallback = useMemo(() => createProceduralEarthTexture(), []);
  const activeTex = earthTex || fallback;

  return (
    <mesh>
      <sphereGeometry args={[R, 128, 96]} />
      <meshPhongMaterial
        map={activeTex}
        shininess={25}
        specular={new THREE.Color("#1a365d")}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// Animated Clouds Layer
// ═══════════════════════════════════════════════════════════════
function CloudsMesh() {
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [cloudsTex, setCloudsTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://unpkg.com/three-globe@2.45.2/example/img/clouds.png",
      (tex) => {
        setCloudsTex(tex);
      },
      undefined,
      () => {}
    );
  }, []);

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.008;
    }
  });

  if (!cloudsTex) return null;

  return (
    <mesh ref={cloudsRef}>
      <sphereGeometry args={[R * 1.015, 64, 64]} />
      <meshStandardMaterial
        map={cloudsTex}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════
// Flight Arcs across India
// ═══════════════════════════════════════════════════════════════
function FlightArc({ a, b, idx }: { a: THREE.Vector3; b: THREE.Vector3; idx: number }) {
  const { curve } = useMemo(() => {
    const s = a.clone().normalize().multiplyScalar(R + 0.008);
    const e = b.clone().normalize().multiplyScalar(R + 0.008);
    const m = s.clone().add(e).multiplyScalar(0.5);
    m.normalize().multiplyScalar(R + s.distanceTo(e) * 0.35);
    return { curve: new THREE.QuadraticBezierCurve3(s, m, e) };
  }, [a, b]);

  const pts = useMemo(() => curve.getPoints(50), [curve]);
  const dotsRef = useRef<THREE.Group>(null);
  const N = 4;
  const spd = 0.05 + (idx % 4) * 0.015;

  useFrame((st) => {
    if (!dotsRef.current) return;
    const t0 = st.clock.elapsedTime * spd;
    for (let i = 0; i < N; i++) {
      const t = (t0 + i / N) % 1;
      const p = curve.getPoint(t);
      const child = dotsRef.current!.children[i] as THREE.Mesh;
      child.position.copy(p);
      const fade = Math.sin(t * Math.PI);
      (child.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
      child.scale.setScalar(0.4 + fade * 0.6);
    }
  });

  const dotGeo = useMemo(() => new THREE.SphereGeometry(0.016, 8, 8), []);

  return (
    <group>
      <primitive
        object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: "#60a5fa", transparent: true, opacity: 0.3, depthWrite: false })
        )}
      />
      <group ref={dotsRef}>
        {Array.from({ length: N }).map((_, i) => (
          <mesh key={i} geometry={dotGeo}>
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.9} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Clean 3D Gurudwara Marker
// ═══════════════════════════════════════════════════════════════
function GurudwaraMarker({
  pos, loc, selected, hovered, onHover, onUnhover, onClick,
}: {
  pos: THREE.Vector3; loc: Location; selected: boolean; hovered: boolean;
  onHover: () => void; onUnhover: () => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const beamTransform = useMemo(() => {
    const dir = pos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
    const beamPos = dir.clone().multiplyScalar(R + 0.14);
    return { quat, beamPos };
  }, [pos]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = selected ? 1.7 : hovered ? 1.35 : 1;
      ref.current.scale.setScalar(s * (1 + Math.sin(clock.elapsedTime * 3 + loc.id) * 0.12));
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = selected ? 0.85 : hovered ? 0.65 : 0.4;
    }
  });

  return (
    <group position={pos}>
      <mesh
        ref={beamRef}
        position={beamTransform.beamPos.clone().sub(pos)}
        quaternion={beamTransform.quat}
      >
        <cylinderGeometry args={[0.006, 0.016, 0.32, 10]} />
        <meshBasicMaterial color={selected ? "#60a5fa" : "#38bdf8"} transparent opacity={0.4} depthWrite={false} />
      </mesh>

      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
        onPointerOut={() => onUnhover()}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <sphereGeometry args={[selected ? 0.036 : hovered ? 0.028 : 0.022, 16, 16]} />
        <meshBasicMaterial color={selected ? "#38bdf8" : "#0284c7"} transparent opacity={1} />
      </mesh>

      {(hovered || selected) && (
        <Html position={[0, 0.2, 0]} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#030712]/95 backdrop-blur-md border border-sky-500/50 text-[11px] font-bold text-white shadow-2xl flex items-center gap-1.5">
            <span className="text-sm">{loc.icon}</span>
            <div>
              <div className="text-sky-300 leading-tight">{loc.name}</div>
              <div className="text-[9px] text-white/60 font-normal">{loc.city}, {loc.state}</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Responsive Camera Rig
// ═══════════════════════════════════════════════════════════════
function CameraRig({ targetId, isMobile, onDone }: { targetId: number | null; isMobile: boolean; onDone: () => void }) {
  const { camera } = useThree();
  const defaultDist = isMobile ? 5.6 : 4.8;
  const indiaPos = useMemo(() => getIndiaCameraPosition(defaultDist), [defaultDist]);
  const targetPos = useRef(indiaPos.clone());
  const animating = useRef(false);
  const startPos = useRef(camera.position.clone());
  const progress = useRef(0);

  useEffect(() => {
    if (targetId === null) {
      targetPos.current.copy(indiaPos);
    } else if (targetId >= 0 && targetId < INDIA_GURUDWARA_LOCATIONS.length) {
      const loc = INDIA_GURUDWARA_LOCATIONS[targetId];
      const surface = ll(loc.lat, loc.lng, R);
      const dir = surface.clone().normalize();
      const zoomDist = isMobile ? R + 2.8 : R + 2.2;
      const camPos = dir.multiplyScalar(zoomDist);
      camPos.y += 0.4;
      targetPos.current.copy(camPos);
    }
    animating.current = true;
    startPos.current.copy(camera.position);
    progress.current = 0;
  }, [targetId, camera, indiaPos, isMobile]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    progress.current += delta * 0.9;
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

  const positions = useMemo(
    () => INDIA_GURUDWARA_LOCATIONS.map((l) => ll(l.lat, l.lng, R)),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current && hovered === null && flyToId === null) {
      groupRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <RealEarthMesh />
      <CloudsMesh />
      {CONNECTIONS.map(([a, b], i) => (
        <FlightArc key={i} a={positions[a]} b={positions[b]} idx={i} />
      ))}
      {INDIA_GURUDWARA_LOCATIONS.map((loc, i) => (
        <GurudwaraMarker
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
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const categories = ["All", "Janam Asthan", "Historic Gurudwara", "Holy Tapp Asthan", "Spiritual Center", "Sacred Takht"];

  const filteredLocations = useMemo(() => {
    return INDIA_GURUDWARA_LOCATIONS.filter((loc) => {
      const matchCat = activeCategory === "All" || loc.category === activeCategory;
      const matchSearch =
        searchQuery === "" ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedLoc = selectedId !== null ? INDIA_GURUDWARA_LOCATIONS[selectedId] : null;

  const initialCamPos = useMemo(() => {
    const pos = getIndiaCameraPosition(isMobile ? 5.6 : 4.8);
    return [pos.x, pos.y, pos.z] as [number, number, number];
  }, [isMobile]);

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {/* Category Filter Tabs & Quick Search */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                  activeCategory === cat
                    ? "bg-sky-500 text-black font-bold shadow-md shadow-sky-500/20"
                    : "bg-surface/80 hover:bg-surface text-ink-soft hover:text-ink border border-border"
                }`}
              >
                {cat === "All" ? `All Sites (${INDIA_GURUDWARA_LOCATIONS.length})` : cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-soft" />
            <input
              type="text"
              placeholder="Search Amritsar, Delhi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-3 py-2 rounded-full bg-surface border border-border text-xs text-ink placeholder:text-ink-soft focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Location Chips Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x">
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick Focus:
          </span>
          {filteredLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[34px] ${
                selectedId === loc.id
                  ? "bg-sky-500 text-black font-bold scale-105 shadow-md shadow-sky-500/20"
                  : "bg-surface/60 hover:bg-surface text-ink-soft hover:text-ink border border-border"
              }`}
            >
              <span>{loc.icon}</span>
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Globe Container (Responsive Heights & Touch Optimizations) */}
      <div
        className="w-full rounded-3xl overflow-hidden relative bg-[#030712] touch-none h-[380px] sm:h-[480px] md:h-[580px] lg:h-[650px]"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
      >
        {!isMounted ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
            <p className="text-sky-400/80 text-xs tracking-wider font-medium">Focusing 3D Globe on India...</p>
          </div>
        ) : (
          <Canvas
            camera={{ position: initialCamPos, fov: isMobile ? 50 : 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <ambientLight intensity={1.0} />
            <directionalLight position={[10, 10, 5]} intensity={1.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <Stars radius={100} depth={50} count={1200} factor={3.5} saturation={0} fade speed={1} />
            <GlobeScene onSelect={handleSelect} flyToId={selectedId} />
            <CameraRig targetId={selectedId} isMobile={isMobile} onDone={() => {}} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.6}
              maxDistance={7.5}
              rotateSpeed={0.5}
              zoomSpeed={0.5}
              dampingFactor={0.08}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN,
              }}
            />
          </Canvas>
        )}

        {/* Top-Left Header Overlay */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 pointer-events-none max-w-[70%] sm:max-w-none">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <p className="text-[9px] sm:text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              India Sacred Pilgrimage
            </p>
          </div>
          <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white drop-shadow-md leading-tight">
            Historic Gurudwaras of India
          </h3>
          <p className="text-[10px] sm:text-xs text-white/60 font-medium mt-0.5 hidden sm:block">
            Amritsar · Delhi · Varanasi · Hoshiarpur · Jalandhar · Anandpur Sahib · Patna Sahib · Nanded
          </p>
        </div>

        {/* Top-Right Control Actions */}
        {selectedId !== null && (
          <button
            onClick={() => setSelectedId(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 px-3 py-1.5 rounded-full bg-[#030712]/90 hover:bg-[#030712] backdrop-blur-md border border-sky-500/50 text-[11px] sm:text-xs font-semibold text-sky-300 flex items-center gap-1.5 transition-all shadow-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Focus India
          </button>
        )}

        {/* Bottom Help Instructions */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:block">
          <div className="px-4 py-1.5 rounded-full bg-[#030712]/80 backdrop-blur-md border border-white/10 text-[10px] text-white/70 font-medium tracking-wider uppercase flex items-center gap-2">
            <Compass className="w-3 h-3 text-sky-400" />
            <span>Drag to rotate · Scroll to zoom · Tap Gurudwara markers to explore</span>
          </div>
        </div>

        {/* Selected Gurudwara Detail Panel Card (Mobile Drawer Style) */}
        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:right-5 sm:left-auto z-30 sm:w-88"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[#030712]/95 backdrop-blur-xl border border-sky-500/40 shadow-2xl shadow-black max-h-[50vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl sm:text-3xl p-1.5 sm:p-2 rounded-xl bg-sky-500/10 border border-sky-500/30">
                      {selectedLoc.icon}
                    </span>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-0.5">
                        {selectedLoc.category}
                      </span>
                      <h4 className="font-display text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
                        {selectedLoc.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-sky-300/90 font-medium">
                        {selectedLoc.city}, {selectedLoc.state}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors shrink-0"
                    aria-label="Close detail card"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-white/90 font-medium leading-relaxed p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                  {selectedLoc.significance}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-white/60 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1 text-sky-300 font-mono">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedLoc.lat.toFixed(4)}° N, {selectedLoc.lng.toFixed(4)}° E</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-sky-300/80 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> Gurudwara Location
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
