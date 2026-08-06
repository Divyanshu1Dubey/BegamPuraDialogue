// Multi-language strings — English | Hindi | Punjabi
// Used by LanguageContext to switch UI labels and content

export type Language = "en" | "hi" | "pa";

export const languageMeta: Record<
  Language,
  { name: string; native: string; code: string; unicode: string }
> = {
  en: { name: "English", native: "English", code: "EN", unicode: "A" },
  hi: { name: "Hindi", native: "हिन्दी", code: "HI", unicode: "अ" },
  pa: { name: "Punjabi", native: "ਪੰਜਾਬੀ", code: "PA", unicode: "੧" },
};

export const t = {
  nav: {
    home: { en: "Home", hi: "मुख्य", pa: "ਮੁੱਖ" },
    about: { en: "About", hi: "परिचय", pa: "ਜਾਣ-ਪਛਾਣ" },
    teachings: { en: "Teachings", hi: "शिक्षाएँ", pa: "ਸਿੱਖਿਆਵਾਂ" },
    begampura: { en: "Begampura", hi: "बेगमपुरा", pa: "ਬੇਗਮਪੁਰਾ" },
    shabads: { en: "16 Raags", hi: "16 राग", pa: "16 ਰਾਗ" },
    events: { en: "Events", hi: "कार्यक्रम", pa: "ਪ੍ਰੋਗਰਾਮ" },
    library: { en: "E-Library", hi: "पुस्तकालय", pa: "ਪੁਸਤਕਾਲੇ" },
    gallery: { en: "Gallery", hi: "गैलरी", pa: "ਗੈਲਰੀ" },
    connect: { en: "Connect", hi: "जुड़ें", pa: "ਜੁੜੋ" },
  },
  hero: {
    title: {
      en: "The Light of Begampura",
      hi: "बेगमपुरा का प्रकाश",
      pa: "ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ",
    },
    subtitle: {
      en: "Celebrating 650 Years of Sant Ravidas Ji",
      hi: "संत रविदास जी की 650वीं जन्म जयंती",
      pa: "ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੀ 650ਵੀਂ ਜਨਮ ਜਯੰਤੀ",
    },
    description: {
      en: "A world tribute to the saint who first envisioned a city without sorrow — without fear, without tax on labour, where every voice is equal.",
      hi: "उस संत की विश्व-स्तरीय श्रद्धांजलि जिसने सबसे पहले निर्दोष नगर का स्वप्न देखा — न भय, न श्रम पर कर, जहाँ हर आवाज़ समान हो।",
      pa: "ਉਸ ਸੰਤ ਨੂੰ ਸੰਸਾਰ ਪੱਧਰੀ ਸ਼ਰਧਾਂਜਲੀ ਜਿਸਨੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਬਿਨਾਂ ਦੁੱਖ ਵਾਲੇ ਸ਼ਹਿਰ ਦਾ ਸੁਫ਼ਨਾ ਦੇਖਿਆ।",
    },
    ctaPrimary: {
      en: "Explore the Mission",
      hi: "मिशन देखें",
      pa: "ਮਿਸ਼ਨ ਵੇਖੋ",
    },
    ctaSecondary: {
      en: "Register for the 650th",
      hi: "650वीं के लिए पंजीकरण",
      pa: "650ਵੀਂ ਲਈ ਰਜਿਸਟਰੇਸ਼ਨ",
    },
  },
  countdown: {
    days: { en: "Days", hi: "दिन", pa: "ਦਿਨ" },
    hours: { en: "Hours", hi: "घंटे", pa: "ਘੰਟੇ" },
    minutes: { en: "Minutes", hi: "मिनट", pa: "ਮਿੰਟ" },
    seconds: { en: "Seconds", hi: "सेकंड", pa: "ਸੈਕਿੰਡ" },
    until: { en: "Until the 650th Janam Jayanti", hi: "650वीं जन्म जयंती तक", pa: "650ਵੀਂ ਜਨਮ ਜਯੰਤੀ ਤੱਕ" },
  },
  cta: {
    readMore: { en: "Read More", hi: "और पढ़ें", pa: "ਹੋਰ ਪੜ੍ਹੋ" },
    learnMore: { en: "Learn More", hi: "जानें", pa: "ਜਾਣੋ" },
    register: { en: "Register", hi: "पंजीकरण", pa: "ਰਜਿਸਟਰ" },
    donate: { en: "Contribute", hi: "योगदान", pa: "ਯੋਗਦਾਨ" },
    download: { en: "Download", hi: "डाउनलोड", pa: "ਡਾਊਨਲੋਡ" },
    explore: { en: "Explore", hi: "अन्वेषण", pa: "ਖੋਜੋ" },
    submit: { en: "Submit", hi: "प्रस्तुत", pa: "ਪੇਸ਼" },
    join: { en: "Join Us", hi: "हमसे जुड़ें", pa: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ" },
  },
  common: {
    welcome: {
      en: "Welcome to the official commemoration",
      hi: "आधिकारिक श्रद्धांजलि में आपका स्वागत है",
      pa: "ਅਧਿਕਾਰਤ ਸ਼ਰਧਾਂਜਲੀ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    },
    viewAll: { en: "View All", hi: "सभी देखें", pa: "ਸਭ ਦੇਖੋ" },
    back: { en: "Back", hi: "वापस", pa: "ਵਾਪਸ" },
    next: { en: "Next", hi: "आगे", pa: "ਅੱਗੇ" },
    previous: { en: "Previous", hi: "पिछला", pa: "ਪਿੱਛਲਾ" },
    loading: { en: "Loading...", hi: "...लोड हो रहा", pa: "...ਲੋਡ ਹੋ ਰਿਹਾ" },
  },
  footer: {
    quickLinks: { en: "Quick Links", hi: "त्वरित लिंक", pa: "ਤੇਜ਼ ਲਿੰਕ" },
    stayConnected: { en: "Stay Connected", hi: "जुड़े रहें", pa: "ਜੁੜੇ ਰਹੋ" },
    subscribe: { en: "Daily Shabad in your inbox", hi: "रोज़ का शबाद आपके इनबॉक्स में", pa: "ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ" },
    emailPlaceholder: { en: "Your email", hi: "आपका ईमेल", pa: "ਤੁਹਾਡਾ ਈਮੇਲ" },
    rights: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।", pa: "ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ।" },
  },
};
