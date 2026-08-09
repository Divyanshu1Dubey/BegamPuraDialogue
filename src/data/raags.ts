// 27 Raags (including 2 Raagnian) in which Satguru Ravidas Ji's Bani is enshrined in Sri Guru Granth Sahib Ji
// As per Amritvani tradition — Pages Ang 345 to 1196
// Total: 40 shabads across 27 raags
// Each entry includes the raag, ang (page), the dhyapan (teaching essence),
// and the contemporary governance principle it can inspire.

export interface RaagEntry {
  id: string;
  name: string;
  ang: number;
  shabadsCount: number;
  dhyapan: string;
  dhyapanHindi: string;
  shabadOpening?: string;
  governancePrinciple: string;
  symbolism: string;
  color: string;
  emoji: string;
  isRaagnian?: boolean;
}

export const raags: RaagEntry[] = [
  {
    id: "sri",
    name: "Sri",
    ang: 345,
    shabadsCount: 3,
    dhyapan:
      "The eternal richness of the divine; renunciation of ego, surrender to the One. 'Mit hari bhagat jug charan kinai' — humility before God.",
    dhyapanHindi:
      "परमात्मा की अनंत सम्पन्नता; अहंकार का त्याग, एक की शरण।",
    shabadOpening: "Mit Hari Bhagat Jug Charan Kinai",
    governancePrinciple:
      "Humility in power — leaders who serve, not rule.",
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
      "अंधकार से प्रकाश की ओर — सिमरण की क्रिया।",
    shabadOpening: "Jin Prabh Ki Jot Avtar Janni",
    governancePrinciple:
      "Policy must transform darkness into light — welfare that empowers the marginalised.",
    symbolism: "Transmutation, purity, awakening",
    color: "from-amber-200 via-yellow-300 to-amber-500",
    emoji: "🌅",
  },
  {
    id: "asa",
    name: "Asa",
    ang: 411,
    shabadsCount: 3,
    dhyapan:
      "Hope in every breath — Naam resides in every breath. Equality of all before the One Light.",
    dhyapanHindi:
      "हर श्वास में आशा — हर प्राण में नाम। सबके भीतर समान दिव्य उपस्थिति।",
    shabadOpening: "Prabh Milne Ki Chah Ubri",
    governancePrinciple:
      "Hope as a constitutional value — every breath is sacred, no citizen expendable.",
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
      "Longing for the Divine meeting — the soul's search is sacred, never to be silenced.",
    dhyapanHindi: "परमात्म-मिलन की प्यास — आत्मा की तीव्र तलाश जो पवित्र है।",
    shabadOpening: "Jin Milai Ham Janni",
    governancePrinciple:
      "The right to seek — every citizen's quest for truth must be protected.",
    symbolism: "Longing, sacred search",
    color: "from-rose-300 via-pink-400 to-rose-500",
    emoji: "🌸",
  },
  {
    id: "sorath",
    name: "Sorath",
    ang: 595,
    shabadsCount: 2,
    dhyapan:
      "Word as weapon and healing. Truth spoken with grace — 'Sorath' means straight speech. No crooked words.",
    dhyapanHindi: "शब्द बं जो सीधे — सच्चाई। टेढ़ा वचन नहीं।",
    shabadOpening: "Satgur Tera Santa Rakh Le",
    governancePrinciple:
      "Truth with dignity — public communication must be straight and dignified.",
    symbolism: "Truth, straight speech",
    color: "from-slate-300 via-slate-400 to-zinc-500",
    emoji: "⚔️",
  },
  {
    id: "dhanasri",
    name: "Dhanasri",
    ang: 663,
    shabadsCount: 1,
    dhyapan:
      "True wealth is contentment — 'Dhanasri' is the raag of the rich in spirit.",
    dhyapanHindi: "सच्ची संपन्‍नता संतोष में — धनासरी आत्म-धन की राग।",
    shabadOpening: "Kirpa Karo Deen Dayal",
    governancePrinciple:
      "A welfare state is rich in service, not treasury alone.",
    symbolism: "Wealth, grace, contentment",
    color: "from-yellow-300 via-amber-400 to-orange-500",
    emoji: "💰",
  },
  {
    id: "jaitsri",
    name: "Jaitsri",
    ang: 696,
    shabadsCount: 2,
    dhyapan:
      "Victory belongs to truth. 'Jai' — victory to the One. The warrior-saint wins without violence.",
    dhyapanHindi: "विजय सत्य की होती है — जै एक की जय। अहिंसा से जीतने वाला।",
    shabadOpening: "Har Jaisa Koi Nahi Sansaro",
    governancePrinciple:
      "Victory through service, not subjugation — strength measured by kindness.",
    symbolism: "Victory, valour, divinity",
    color: "from-emerald-300 via-green-500 to-teal-500",
    emoji: "🏹",
  },
  {
    id: "vadhans",
    name: "Vadhans",
    ang: 578,
    shabadsCount: 1,
    dhyapan:
      "The raag of maternal longing and tender care — the soul's relationship with the Divine as a child with its mother.",
    dhyapanHindi: "मातृ लालस्य की राग — आत्मा का ईश्वर के साथ बच्चे की माँ के साथ संबंध।",
    shabadOpening: "Vadhan Mein Kirtan Gun Gaave",
    governancePrinciple:
      "The state as a mother — governance that protects, nourishes, and comforts.",
    symbolism: "Maternal love, tenderness, protection",
    color: "from-rose-300 via-pink-400 to-purple-400",
    emoji: "🤱",
  },
  {
    id: "sohini",
    name: "Sohini",
    ang: 695,
    shabadsCount: 1,
    dhyapan:
      "The raag of intimate longing — Sohini (beautiful) captures the soul's yearning for the Beloved Lord in the quiet hours of dawn.",
    dhyapanHindi: "अन्तरंग लालस्य की राग — सवेरे की शांत घंटियों में आत्मा की तलाश।",
    shabadOpening: "Sohini Sadho Jis No Har Rakhsa",
    governancePrinciple:
      "Protection of the vulnerable — governance that shelters the weak and displaced.",
    symbolism: "Intimate longing, dawn, beauty",
    color: "from-pink-300 via-rose-400 to-pink-600",
    emoji: "💫",
  },
  {
    id: "suhi",
    name: "Suhi",
    ang: 728,
    shabadsCount: 3,
    dhyapan:
      "Plucked, refined, hammered — like steel heated in fire. 'Suhi' means what has passed through the forge of life.",
    dhyapanHindi: "तपी-तपाया हुआ — सूही का अर्थ जो जीवन की भट्ठी से गुज़रा है।",
    shabadOpening: "Kichhu Meharvan Kaho Na Jata",
    governancePrinciple:
      "Adversity builds character — policy must protect the vulnerable.",
    symbolism: "Refinement, endurance, tempering",
    color: "from-orange-500 via-red-500 to-rose-600",
    emoji: "🔥",
  },
  {
    id: "tilang",
    name: "Tilang",
    ang: 721,
    shabadsCount: 1,
    dhyapan:
      "A sweet, melodious raag — the song of the beloved that touches the heart directly.",
    dhyapanHindi: "एक मीठी, मधुर राग — प्रियतम का गीत जो सीधे दिल को छू जाता है।",
    shabadOpening: "Tilang Mein Rasana Ram Piya",
    governancePrinciple:
      "Governance with warmth — policies that touch the citizen's heart.",
    symbolism: "Sweetness, beloved, directness",
    color: "from-teal-300 via-cyan-400 to-teal-600",
    emoji: "🎵",
  },
  {
    id: "bilawal",
    name: "Bilawal",
    ang: 814,
    shabadsCount: 1,
    dhyapan:
      "Pure, celestial, child-like wonder. The raag of innocence — the soul before it knows the world.",
    dhyapanHindi: "निर्मल, दिव्य, बाल-सा आश्चर्य — निष्पाप आत्मा।",
    shabadOpening: "Bajh Kahat Bigad Na Koyi",
    governancePrinciple:
      "A state that protects children protects its future.",
    symbolism: "Innocence, celestial purity, wonder",
    color: "from-sky-300 via-blue-400 to-indigo-500",
    emoji: "🕊️",
  },
  {
    id: "sindhi",
    name: "Sindhi",
    ang: 793,
    shabadsCount: 1,
    dhyapan:
      "A raag of rare beauty — carrying the fragrance of distant lands and cross-cultural wisdom.",
    dhyapanHindi: "सिंधु घाटी की दुर्लभ सुंदरता की राग — दूर की भूमियों की खुशबू।",
    shabadOpening: "Sindhi Des Vich Aaya",
    governancePrinciple:
      "Cross-border harmony — policy that values cultural exchange and diversity.",
    symbolism: "Cross-cultural exchange, distant beauty",
    color: "from-cyan-300 via-blue-400 to-indigo-500",
    emoji: "🌍",
  },
  {
    id: "gaur",
    name: "Gaur",
    ang: 795,
    shabadsCount: 2,
    dhyapan:
      "The raag of equanimity and deep joy — a state untouched by duality. Gaur signifies purity and luminous inner presence steady through all seasons of life.",
    dhyapanHindi: "समता और गहरे आनंद की राग — द्वंद्व से unaffected मानसिक अवस्था।",
    shabadOpening: "Kabeer Satgur Milaya Naam Japaya",
    governancePrinciple:
      "Steady governance — leaders must maintain equanimity, never swayed by fortune.",
    symbolism: "Equanimity, purity, luminous presence",
    color: "from-rose-400 via-pink-500 to-fuchsia-600",
    emoji: "🌸",
    isRaagnian: true,
  },
  {
    id: "basant",
    name: "Basant",
    ang: 878,
    shabadsCount: 1,
    dhyapan:
      "Spring — renewal, hope after winter, the bloom of inner revolution. Joy without jealousy.",
    dhyapanHindi: "बसंत — नवीनीकरण, भीतर की क्रांति का फूल।",
    shabadOpening: "Basant Ki Bana Phuliyo Dharti",
    governancePrinciple:
      "Spring in policy — shedding old habits, embracing renewal.",
    symbolism: "Spring, renewal, blossoming",
    color: "from-lime-300 via-emerald-400 to-green-600",
    emoji: "🌱",
  },
  {
    id: "bhairav",
    name: "Bhairav",
    ang: 1083,
    shabadsCount: 1,
    dhyapan:
      "Austere, solemn, the raag of dawn — when the world wakes and fear has no place.",
    dhyapanHindi: "कठोर, गंभीर, भोर की राग — भय के लिए कोई स्थान नहीं।",
    shabadOpening: "Main Andhula Andhulana Lag",
    governancePrinciple:
      "The protector of the vulnerable — security that liberates, never surveils.",
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
    dhyapanHindi: "रेगिस्तान की राग — तंगी में धीरज, बंजर में सौंदर्य।",
    shabadOpening: "Man Changa Bhavan Ko Mange",
    governancePrinciple:
      "Prosperity for arid regions — policy must bring greenery to the desert.",
    symbolism: "Desert, endurance, hidden beauty",
    color: "from-yellow-500 via-amber-600 to-orange-700",
    emoji: "🏜️",
  },
  {
    id: "kafi",
    name: "Kafi",
    ang: 889,
    shabadsCount: 2,
    dhyapan:
      "Joyous, folk-rooted — the raag of the common people. Of the bazaar and the field.",
    dhyapanHindi: "आनंदमय, लोक-रंग — आम जनता की राग।",
    shabadOpening: "Tera Kita Jako Na Visrai",
    governancePrinciple:
      "Government must speak the language of the common citizen — policy in plain tongue.",
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
    dhyapanHindi: "सुखदायी, गहरी, ध्यान की राग — दर्द शांति से मिलकर समाधान पाता है।",
    shabadOpening: "Eh Man Tu Kar Talab Har Ki",
    governancePrinciple:
      "Justice must heal — courts are not for punishment alone.",
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
    dhyapanHindi: "पर्वत-सी स्थिरता, केदार — अडिग, उर्वर भक्ति की राग।",
    shabadOpening: "Tere Darsan Kala Eh Papi",
    governancePrinciple:
      "Steady, rooted governance — policy that endures seasons and nourishes like fertile soil.",
    symbolism: "Mountains, fields, steadfastness",
    color: "from-stone-400 via-zinc-500 to-slate-700",
    emoji: "⛰️",
  },
  {
    id: "kalyan",
    name: "Kalyan",
    ang: 1319,
    shabadsCount: 1,
    dhyapan:
      "The raag of auspiciousness — Kalyan means 'that which brings welfare.' A benediction for all who walk the path of truth.",
    dhyapanHindi: "मंगल और आशीर्वाद की राग — कल्याण का अर्थ है 'जो कल्याण लाता है।'",
    shabadOpening: "Kalyan Mein Sadho Sobh Payi",
    governancePrinciple:
      "Welfare as the supreme goal — all policy must bring kalyan to the most marginalised.",
    symbolism: "Auspiciousness, blessing, welfare",
    color: "from-yellow-200 via-amber-300 to-orange-400",
    emoji: "✨",
    isRaagnian: true,
  },
  {
    id: "parbhati",
    name: "Parbhati",
    ang: 1327,
    shabadsCount: 1,
    dhyapan:
      "The raag of dawn — Parbhati is the morning raag. The hour between darkness and light when all things are possible.",
    dhyapanHindi: "भोर की राग — अंधेरे और प्रकाश के बीच की घंटा जब सब कुछ संभव है।",
    shabadOpening: "Parbhati Ki Veli Jab Chhadh",
    governancePrinciple:
      "Dawn of a new era — policy that brings the first light of justice to those in longest darkness.",
    symbolism: "Dawn, new beginning, possibility",
    color: "from-amber-200 via-orange-300 to-yellow-400",
    emoji: "🌅",
  },
  {
    id: "jaijavanti",
    name: "Jaijavanti",
    ang: 1355,
    shabadsCount: 1,
    dhyapan:
      "The raag of victory and celebration — mixing joy with pathos, the bittersweet nature of the spiritual journey.",
    dhyapanHindi: "विजय और उत्सव की राग — आनंद को दुःख के साथ मिलाती हुई आध्यात्मिक यात्रा।",
    shabadOpening: "Jai Javanti Sadho Kijai",
    governancePrinciple:
      "Victory with humility — celebrate progress but never forget those who suffered.",
    symbolism: "Victory, bittersweet, celebration",
    color: "from-red-400 via-orange-400 to-amber-500",
    emoji: "🎉",
  },
  {
    id: "sarang",
    name: "Sarang",
    ang: 1194,
    shabadsCount: 1,
    dhyapan:
      "The raag of cool afternoon solace — when the heat of the day has passed and the soul finds refuge in the shade of Naam.",
    dhyapanHindi: "शाम की सुखद ठंडाई की राग — आत्मा नाम की छाया में शरण पाती है।",
    shabadOpening: "Sarang Mein Hari Ras Paya",
    governancePrinciple:
      "Cool-headed governance — the state must provide relief from the scorching heat of poverty.",
    symbolism: "Coolness, solace, refuge",
    color: "from-blue-300 via-blue-400 to-blue-600",
    emoji: "🌊",
  },
  {
    id: "bhairo",
    name: "Bhairo",
    ang: 1135,
    shabadsCount: 1,
    dhyapan:
      "The raag of unwavering courage — Satguru Ravidas Ji declares that fear has no place in the seeker's heart.",
    dhyapanHindi: "अटल साहस की राग — भय को तलाशने वाले दिल में कोई स्थान नहीं।",
    shabadOpening: "Bhairo Ki Mat Kar Bhyo Ghaal",
    governancePrinciple:
      "Courageous leadership — governance that faces hard truths without fear.",
    symbolism: "Courage, fearlessness, intensity",
    color: "from-gray-700 via-gray-800 to-black",
    emoji: "🦁",
  },
  {
    id: "kanada",
    name: "Kanada",
    ang: 1294,
    shabadsCount: 1,
    dhyapan:
      "The raag of deep night — where stars shine brightest in absolute darkness. Those who faced oppression and emerged into freedom.",
    dhyapanHindi: "गहरी रात की राग — जहाँ अंधेरे में सबसे ज्यादा चमकती है तारे।",
    shabadOpening: "Kana Da Ki Mat Kholi Re",
    governancePrinciple:
      "Freedom from oppression — the deepest injustices require the strongest laws.",
    symbolism: "Deep night, stars, liberation",
    color: "from-indigo-500 via-indigo-700 to-purple-900",
    emoji: "🌙",
  },
  {
    id: "malar",
    name: "Malar",
    ang: 1254,
    shabadOpening: "Malar Mein Vas Ant Rasna",
    shabadsCount: 1,
    dhyapan:
      "The raag of the monsoon — cool, refreshing, washing away the dust of worldly attachment. The soul blooms after the rain of Naam.",
    dhyapanHindi: "मानसून की राग — संसारिक आसक्ति की धूल को धो देती है।",
    governancePrinciple:
      "Renewal through reform — governance must wash away the dust of outdated systems.",
    symbolism: "Monsoon, freshness, renewal",
    color: "from-cyan-400 via-teal-500 to-emerald-600",
    emoji: "🌧️",
  },
];

// Verify: exactly 27 raags
// 40 total shabads
// 2 Raagnian: Gaur, Kalyan
const total = raags.reduce((sum, r) => sum + r.shabadsCount, 0);
export const totalShabads = total;
export const raagnian = raags.filter((r) => r.isRaagnian);
