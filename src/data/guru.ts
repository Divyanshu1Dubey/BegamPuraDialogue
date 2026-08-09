// Satguru Ravidas Ji — Core biographical and philosophical data
// Sources: Sri Guru Granth Sahib Ji, BRHF archives, Amritvani tradition

export interface PhilosophyPoint {
  title: string;
  titleHindi: string;
  shabadOpening: string;
  description: string;
  descriptionHindi: string;
  modernRelevance: string;
}

export const guru = {
  name: "Satguru Ravidas Ji",
  alternateNames: ["Satguru Ravidas Ji", "Sant Ravidas Ji", "Ravidas Maharaj"],
  birth: "1377 AD",
  birthPlace: "Seergovardhanpur, Varanasi, India",
  birthplaceDescription:
    "Born in the modest home of a leather-worker family on the banks of the Ganges in Seergovardhanpur — a name later adopted to honour him.",
  lifespanYears: 151,
  parents: {
    father: "Shri Raghunanda (Raghu)",
    mother: "Shrimati Kalsa Devi",
    caste: "Chamar (leather-worker) — considered 'untouchable' under the caste order of his time",
  },
  family: {
    wife: "Mata Lona Devi",
    son: "Vijay Dass",
    daughter: "Priyambada",
    daughterInLaw: "Mata Sonmati Devi",
  },
  travels: {
    kilometers: 40000,
    satsangs: 94000,
    journeys: 8,
    continent: "Indian subcontinent, primarily between Varanasi, Punjab, Rajasthan, and Gujarat",
  },
  contemporaries: [
    "Guru Nanak Dev Ji",
    "Sant Kabir Das Ji",
    "Rani Jhali (of Rajasthan)",
    "Mirabai",
    "Sultan Sikandar Lodhi",
    "Babur",
    "Chaitanya Mahaprabhu",
    "Sant Pipa (Raja Pipa)",
    "Santokh Das",
    "Namdev",
    "Trilochan",
    "Sadhna",
  ],
  baniInGuruGranthSahib: {
    shabads: 40,
    shlokas: 240,
    pagesRange: "Ang 345 to Ang 1196",
    raags: 27,
    raagnian: 2,
  },
  // Sapt Guru Ravidass Ji — The 7 successors in the guru lineage
  bansavali: [
    "Harinanda",
    "Rahu (Raghu)",
    "Ravidas",
    "Vijay Dass",
    "Vinyadas",
    "Ramdas",
    "Udayadas / Gopaldas",
  ],
  // The 7 gurus in Satguru Ravidas Ji's spiritual lineage
  saptGuru: "Satguru Ravidas Ji, Harinand Ji, Raghu Ji, Vinyadas Ji, Ramdas Ji, Udayadas Ji, Santdas Ji",
  philosophy: [
    {
      title: "Naam — The Only Name",
      titleHindi: "नाम — एकमात्र नाम",
      shabadOpening: "Satgur Naam Amolak Hai",
      description:
        "The central pillar of Satguru Ravidas Ji's teaching is Naam — the Divine Name alone. 'The Name of the Lord is invaluable — that alone is my worship, my offering, my everything.' There is no other name, no other path. Naam is the bridge between the finite soul and the infinite Creator.",
      descriptionHindi:
        "सतगुरु रविदास जी की शिक्षा का केंद्रीय स्तंभ नाम है — परमात्मा का नाम अकेल। 'प्रभु का नाम अमूल्य है — वही मेरा पूजा, वही मेरा अर्पण, वही मेरा सब कुछ है।' कोई दूसरा नाम नहीं, कोई दूसरा मार्ग नहीं। नाम आत्मा और परमात्मा के बीच का सेतु है।",
      modernRelevance:
        "In an age of noise and distraction, the practice of Naam Simran offers a technology of inner peace that transcends religion, culture, and era — the original mindfulness.",
    },
    {
      title: "Be-gumpura — The City Without Sorrow",
      titleHindi: "बे-गमपुरा — निर्दोष नगर",
      shabadOpening: "Begampura Sahar Ko Nau",
      description:
        "The first shabad in the Guru Granth Sahib to envision a society without caste, without tax on labour, without sorrow. 'Be-gumpura, the city to which I bow — without worry, without fear, without tax. There is neither anxiety nor trouble. There, the Name of the Lord resounds.'",
      descriptionHindi:
        "बे-गमपुरा, वह नगर जिसे मैं नमन करता हूँ — चिंता नहीं, भय नहीं, मेहनत पर कर नहीं। वहाँ केवल प्रभु का नाम गूँजता है।",
      modernRelevance:
        "An egalitarian republic where dignity is universal — the guiding star of any modern welfare state and open society.",
    },
    {
      title: "Dignity of Labour (Kirat)",
      titleHindi: "श्रम की गरिमा (किरत)",
      shabadOpening: "Asan Andhe Ko Chanan Disant",
      description:
        "Satguru Ravidas Ji himself worked with leather — yet his hands were so revered that kings bowed before him. He insisted that honest labour, not birth, defines worth. Kirat (honest work) is worship.",
      descriptionHindi:
        "सतगुरु रविदास जी खाल संभालते थे — पर राजा उनके हाथों के दर्शन को लालायित रहते थे। उन्होंने सिखाया: जन्म से नहीं, कर्म से मानवता।",
      modernRelevance:
        "Skilling, MSME, and entrepreneurship are the modern expressions of kirat — work over pedigree.",
    },
    {
      title: "Anti-Caste, Anti-Untouchability",
      titleHindi: "जाति-विहीन समाज",
      shabadOpening: "Baman Khalsa Jaat Na Koyee",
      description:
        "Satguru Ravidas Ji rejected the varna order outright — 'The Lord made all from one clay; how then is one better, another worse?' He was the first to give a public discourse from a temple (famous legend at Varanasi's Vishwanath Gali).",
      descriptionHindi:
        "सतगुरु रविदास जी ने जाति-व्यवस्था का खुलकर खंडन किया — 'ईश्वर ने सबको एक मिट्टी से रचा, फिर भला-बुरा भेद कैसे?'",
      modernRelevance:
        "Constitutional equality, social justice, and affirmative welfare — born of this very refusal.",
    },
    {
      title: "Universal Brotherhood (Ek Noor)",
      titleHindi: "एक नूर",
      description:
        "All light comes from the One. The chhotas and the brahmins stand equal in God's court. No caste, no creed, no boundary divides the children of the One Light.",
      descriptionHindi:
        "सारा प्रकाश एक से। छोटा और ब्राह्मण ईश्वर के दरबार में समान।",
      modernRelevance:
        "Vasudhaiva Kutumbakam — the world is one family, as India declares from the global stage.",
    },
    {
      title: "Woman as Sacred",
      titleHindi: "नारी की पवित्रता",
      description:
        "'From a woman is the seed of all — why is she considered evil?' Satguru Ravidas Ji was among the first to publicly revere the divine feminine in all its forms.",
      descriptionHindi:
        "'नारी से ही संसार है — फिर उसे अपवित्र क्यों कहा जाता है?'",
      modernRelevance:
        "Beti Bachao, Beti Padhao, Nari Shakti — women's agency as the foundation of the modern republic.",
    },
    {
      title: "Sabhal vich sobha hai Ram",
      titleHindi: "सभल विच सोभा है राम",
      description:
        "The Divine resides in every gathering, every community. Where the people are, there is God. No temple is higher than the human congregation.",
      descriptionHindi:
        "जहाँ सभा है, जहाँ लोग हैं, वहीं ईश्वर हैं।",
      modernRelevance:
        "Sabka Saath, Sabka Vikas, Sabka Vishwas — the citizen and the divine are co-present.",
    },
  ],
  miracles: [
    "Cured Prince Humayun of a skin disease at the request of Emperor Babur (c. 1528)",
    "Defeated a yogi in public debate and converted him — establishing Vaishno Devi at the request of a devoted Brahmin",
    "Caused a cobra to bite a falsely-accused couple of lepers and healed them, revealing the truth",
    "Stabilised a temple tank by retrieving a missing jewel he had been unjustly accused of stealing",
    "Convinced Sultan Sikandar Lodhi to descend from his horse and walk beside him as an equal",
    "Walked through fire without harm in public tests of spiritual authority",
  ],
  // The spiritual journeys made by Satguru Ravidas Ji
  yatras: [
    "Varanasi → Punjab (Kartarpuri / Dera Sahib)",
    "Varanasi → Rajasthan (Jaipur, Jodhpur, Ajmer)",
    "Varanasi → Gujarat (Ahmedabad)",
    "Varanasi → Bengal (Santiniketan)",
    "Varanasi → Karnataka (Bijapur)",
    "Varanasi → Delhi",
    "Varanasi → Mithila",
    "Varanasi → Gorakhpur and the East",
  ],
  // Notable disciples and contemporaries
  disciples: [
    {
      name: "Sant Pipa (Raja Pipa)",
      description: "Former king of Malwa who renounced his throne to become a disciple of Satguru Ravidas Ji. A revered poet-saint in the Bhakti movement.",
    },
    {
      name: "Santokh Das",
      description: "A devoted disciple of Satguru Ravidas Ji who carried forward the teachings of Naam and equality.",
    },
  ],
};

// Key date — 650th Janam Jayanti
export const janamJayantiDate = new Date("2027-02-16"); // Most accepted date for Magh Purnima
// (Actual birth commemorations occur across Magh Sudi Panchami to Magh Sudi Ashtami)
