// 16 Raags in which Bhagat Ravidas Ji's Bani is enshrined in Sri Guru Granth Sahib Ji
// Pages Ang 345 to 1196 — Reference: Sri Guru Granth Sahib Ji
// Each entry includes the raag, ang (page), the dhyapan (teaching essence),
// and the contemporary governance principle it can inspire.

export interface RaagEntry {
  id: string;
  name: string;
  ang: number; // page number in Sri Guru Granth Sahib Ji
  shabadsCount: number; // approx compositions on this raag by Bhagat Ravidas Ji
  dhyapan: string; // core teaching/essence
  dhyapanHindi: string;
  shabadOpening?: string;
  governancePrinciple: string; // what governance should look like based on this teaching
  symbolism: string;
  color: string; // brand gradient for this raag
  emoji: string;
}

export const raags: RaagEntry[] = [
  {
    id: "sri",
    name: "Sri",
    ang: 345,
    shabadsCount: 4,
    dhyapan:
      "The eternal richness of the divine; renunciation of ego, surrender to the One. 'Mit hari bhagat jug charan kinai' — humility before God.",
    dhyapanHindi:
      "परमात्मा की अनंत सम्पन्नता; अहंकार का त्याग, एक की शरण। 'मित हरि भगत जुग चरण किनै' — ईश्वर के समक्ष विनम्रता।",
    shabadOpening: "Mit Hari Bhagat Jug Charan Kinai",
    governancePrinciple:
      "Humility in power — leaders who serve, not rule. The state must bow before the citizen, never the reverse.",
    symbolism: "Cosmic wealth, devotion, surrender",
    color: "from-amber-300 via-yellow-400 to-orange-400",
    emoji: "🪔",
  },
  {
    id: "gauri",
    name: "Gauri",
    ang: 396,
    shabadsCount: 3,
    dhyapan:
      "From darkness to light — the alchemy of remembrance (Simran). Burning ego to become pure, white as Gauri.",
    dhyapanHindi:
      "अंधकार से प्रकाश की ओर — सिमरण की क्रिया। अहंकार को जलाकर गौरी (निर्मल) होना।",
    shabadOpening: "Jin Prabh Ki Jot Avtar Janni",
    governancePrinciple:
      "Policy must transform darkness into light — welfare that empowers the marginalised to become self-luminous.",
    symbolism: "Transmutation, purity, awakening",
    color: "from-amber-200 via-yellow-300 to-amber-500",
    emoji: "🌅",
  },
  {
    id: "asa",
    name: "Asa",
    ang: 411,
    shabadsCount: 4,
    dhyapan:
      "Hope in every breath — 'Asa di vaar'— the realisation that God resides in the breath. Equality of all before the Divine.",
    dhyapanHindi:
      "हर श्वास में आशा — 'आसा की वार' — हर प्राण में ईश्वर। सबके भीतर समान दिव्य उपस्थिति।",
    shabadOpening: "Prabh Milne Ki Chah Ubri",
    governancePrinciple:
      "Hope as a constitutional value — every breath is sacred, therefore no citizen can be expendable.",
    symbolism: "Hope, breath, equality",
    color: "from-orange-400 via-amber-500 to-red-500",
    emoji: "🌬️",
  },
  {
    id: "gujri",
    name: "Gujri",
    ang: 488,
    shabadsCount: 1,
    dhyapan:
      "Longing for the Divine meeting — a daughter's yearning. The soul's search is sacred, never to be silenced.",
    dhyapanHindi:
      "परमात्म-मिलन की प्यास — आत्मा की तीव्र तलाश जो पवित्र है, जिसे कभी नहीं दबाना।",
    shabadOpening: "Jin Milai Ham Jami Hamre",
    governancePrinciple:
      "Listen to the unheard — when citizens yearn for justice, governance must seek them out, not the other way around.",
    symbolism: "Yearning, quest, sacred searching",
    color: "from-rose-300 via-pink-400 to-fuchsia-500",
    emoji: "💗",
  },
  {
    id: "sorath",
    name: "Sorath",
    ang: 595,
    shabadsCount: 2,
    dhyapan:
      "Word as weapon and as healing. Truth spoken with grace — Sorath means 'straight' speech. No crooked words.",
    dhyapanHindi:
      "शब्द बं जो सीधे — 'सोरठि' का अर्थ सरल सच्चाई। टेढ़ा वचन नहीं।",
    shabadOpening: "Satgur Tera Santa Rakh Le",
    governancePrinciple:
      "Truth with dignity — public communication must be straight, dignified, never weaponised or manipulative.",
    symbolism: "Truth, straight speech, sword of word",
    color: "from-slate-300 via-slate-400 to-zinc-500",
    emoji: "⚔️",
  },
  {
    id: "dhanasri",
    name: "Dhanasri",
    ang: 663,
    shabadsCount: 1,
    dhyapan:
      "True wealth is contentment — 'Dhanasri' is the raag of the rich in spirit, who owns nothing and lacks nothing.",
    dhyapanHindi:
      "सच्ची संपन्‍नता संतोष में — 'धनासरी' आत्म-धन की राग, जो कुछ भी नहीं रखता, किसी बात की कमी नहीं।",
    shabadOpening: "Kirpa Karo Deen Dayal",
    governancePrinciple:
      "A welfare state is rich in service, not in treasury alone. Measure wealth by contentment of citizens.",
    symbolism: "Wealth, grace, contentment",
    color: "from-yellow-300 via-amber-400 to-orange-500",
    emoji: "💰",
  },
  {
    id: "jaitsri",
    name: "Jaitsri",
    ang: 696,
    shabadsCount: 4,
    dhyapan:
      "Victory belongs to truth. 'Jai' — victory to the One. The warrior-saint who wins without violence.",
    dhyapanHindi:
      "विजय सत्य की होती है — 'जै' एक की जय। अहिंसा से जीतने वाला योद्धा-संत।",
    shabadOpening: "Har Jaisa Koi Nahi Sansaro",
    governancePrinciple:
      "Victory through service, not subjugation — strength of a nation is measured by kindness, not conquest.",
    symbolism: "Victory, valour, divinity",
    color: "from-emerald-300 via-green-500 to-teal-500",
    emoji: "🏹",
  },
  {
    id: "suhi",
    name: "Suhi",
    ang: 728,
    shabadsCount: 5,
    dhyapan:
      "Plucked, refined, hammered — like steel heated in fire. 'Suhi' means what has passed through the forge of life.",
    dhyapanHindi:
      "तपी-तपाया हुआ — 'सूही' का अर्थ जो जीवन की भट्ठी से गुज़रा है।",
    shabadOpening: "Kichhu Meharvan Kaho Na Jata",
    governancePrinciple:
      "Adversity builds character — public policy must protect the vulnerable while honouring their resilience.",
    symbolism: "Refinement, endurance, tempering",
    color: "from-orange-500 via-red-500 to-rose-600",
    emoji: "🔥",
  },
  {
    id: "gaur",
    name: "Gaur",
    ang: 795,
    shabadsCount: 4,
    dhyapan:
      "Be-gumpura Dialogue of the mind — the song of union with the Divine, joy that needs no reason.",
    dhyapanHindi:
      "मन की बेगमपुरा बातचीत — परमात्मा से मिलन का गीत, बिना कारण के आनंद।",
    shabadOpening: "Begampura Sahar Ko Nau",
    governancePrinciple:
      "The city without sorrow — policy must build a society where fear, want, and injustice have no address.",
    symbolism: "City of bliss, equanimity, joy",
    color: "from-rose-400 via-pink-500 to-fuchsia-600",
    emoji: "🌸",
  },
  {
    id: "bilawal",
    name: "Bilawal",
    ang: 814,
    shabadsCount: 2,
    dhyapan:
      "Pure, celestial, child-like wonder. The raag of innocence — the soul before it knows the world.",
    dhyapanHindi:
      "निर्मल, दिव्य, बाल-सा आश्चर्य — निष्पाप आत्मा, जगत से पहले की मासूमियत।",
    shabadOpening: "Bajh Kahat Bigad Na Koyi",
    governancePrinciple:
      "A state that protects children protects its future — every policy must first be tested on the most innocent.",
    symbolism: "Innocence, celestial purity, wonder",
    color: "from-sky-300 via-blue-400 to-indigo-500",
    emoji: "🕊️",
  },
  {
    id: "basant",
    name: "Basant",
    ang: 878,
    shabadsCount: 1,
    dhyapan:
      "Spring — renewal, hope after winter, the bloom of inner revolution. Joy without jealousy.",
    dhyapanHindi:
      "बसंत — नवीनीकरण, सर्दी के बाद आशा, भीतर की क्रांति का फूल। ईर्ष्या-रहित आनंद।",
    shabadOpening: "Basant Ki Bana Phuliyo Dharti",
    governancePrinciple:
      "A new India blooms — spring in policy means shedding old habits, embracing renewal with grace.",
    symbolism: "Spring, renewal, blossoming",
    color: "from-lime-300 via-emerald-400 to-green-600",
    emoji: "🌱",
  },
  {
    id: "bhairav",
    name: "Bhairav",
    ang: 1083,
    shabadsCount: 2,
    dhyapan:
      "Austere, solemn, the raag of dawn — when the world wakes and fear has no place. Bhairav the protector.",
    dhyapanHindi:
      "कठोर, गंभीर, भोर की राग — जब संसार जागता है और भय के लिए कोई स्थान नहीं। भैरव रक्षक।",
    shabadOpening: "Main Andhula Andhulana Lag",
    governancePrinciple:
      "The protector of the vulnerable — security that liberates the citizen, never that surveils them.",
    symbolism: "Dawn, protection, gravitas",
    color: "from-indigo-400 via-violet-500 to-purple-700",
    emoji: "🌄",
  },
  {
    id: "maru",
    name: "Maru",
    ang: 1017,
    shabadsCount: 2,
    dhyapan:
      "The raag of the desert — endurance in scarcity, beauty in barrenness, the smile through tears.",
    dhyapanHindi:
      "रेगिस्तान की राग — तंगी में धीरज, बंजर में सौंदर्य, आंसुओं के बीच मुस्कान।",
    shabadOpening: "Man Changa Bhavan Ko Mange",
    governancePrinciple:
      "Prosperity for arid regions — policy must bring greenery to the desert, water to drought-stricken lands.",
    symbolism: "Desert, endurance, hidden beauty",
    color: "from-yellow-500 via-amber-600 to-orange-700",
    emoji: "🏜️",
  },
  {
    id: "kafi",
    name: "Kafi",
    ang: 889,
    shabadsCount: 4,
    dhyapan:
      "Joyous, folk-rooted — the raag of the common people. Neither courtly nor monastic — of the bazaar and the field.",
    dhyapanHindi:
      "आनंदमय, लोक-रंग — आम जनता की राग। न दरबारी, न मठवाली — बाज़ार और खेत की।",
    shabadOpening: "Tera Kita Jako Na Visrai",
    governancePrinciple:
      "Government must speak the language of the common citizen — policy in plain tongue, not legalese.",
    symbolism: "Folk, common, joyous",
    color: "from-emerald-400 via-teal-500 to-cyan-600",
    emoji: "🌾",
  },
  {
    id: "ramkali",
    name: "Ramkali",
    ang: 878,
    shabadsCount: 1,
    dhyapan:
      "Soothing, deep, the raag of contemplation — where pain meets peace and finds resolution.",
    dhyapanHindi:
      "सुखदायी, गहरी, ध्यान की राग — जहाँ दर्द शांति से मिलकर समाधान पाता है।",
    shabadOpening: "Eh Man Tu Kar Talab Har Ki",
    governancePrinciple:
      "Justice must heal — courts and commissions are not for punishment alone, but for the soul of a nation.",
    symbolism: "Soothing, depth, contemplation",
    color: "from-violet-400 via-purple-500 to-indigo-700",
    emoji: "🧘",
  },
  {
    id: "kedara",
    name: "Kedara",
    ang: 1118,
    shabadsCount: 1,
    dhyapan:
      "Mountain-stillness, kedara (field) of the lord — the raag of grounded, immutable, fertile devotion.",
    dhyapanHindi:
      "पर्वत-सी स्थिरता, केदार (क्षेत्र) — अडिग, उर्वर, धरती से जुड़ी भक्ति की राग।",
    shabadOpening: "Tere Darsan Kala Eh Papi",
    governancePrinciple:
      "Steady, rooted governance — policy that endures seasons, parties, and trends; that nourishes like fertile soil.",
    symbolism: "Mountains, fields, steadfastness",
    color: "from-stone-400 via-zinc-500 to-slate-700",
    emoji: "⛰️",
  },
];

// Total: 41 shabads across these 16 raags
export const totalShabads = raags.reduce((sum, r) => sum + r.shabadsCount, 0);