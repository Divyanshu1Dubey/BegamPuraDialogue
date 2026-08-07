"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Volume2, ArrowRight, Sparkles, Filter } from "lucide-react";
import { raags } from "@/data/raags";
import { LanguageAware } from "@/components/LanguageAware";

const mockShabads = [
  {
    id: "begampura-shahar-ko-naao",
    titleGurmukhi: "ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥",
    titleDevanagari: "बेगम पुरा सहर को नाव ॥",
    titleEnglish: "Begampura — The City Without Sorrow",
    raag: "Gauri",
    ang: 345,
    essence: "The blueprint of an ideal, fear-free, egalitarian city without tax on labour or sorrow.",
    fullGurmukhi: `ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥ ਦੂਖੁ ਅੰਦੋਹੁ ਨਹੀ ਤਿਹਿ ਠਾਉ ॥
ਨਾ ਤਸਵੀਸ ਕੋਲੁ ਨ ਮਾਲੁ ॥ ਖਉਫੁ ਨ ਖਤਾ ਨ ਤਰਸੁ ਜਵਾਲੁ ॥੧॥
ਅਬ ਮੋਹਿ ਖੂਬ ਵਤਨ ਗਹ ਪਾਈ ॥ ਊਹਾ ਖੈਰਿ ਸਦਾ ਮੇਰੇ ਭਾਈ ॥੧॥ ਰਹਾਉ ॥`,
    fullDevanagari: `बेगम पुरा सहर को नाव ॥ दूखु अंदोहु नही तिहि ठाउ ॥
ना तसवीस कोलु न मालु ॥ खउफु न खता न तरसु जवालु ॥१॥
अब मोहि खूब वतन गह पाई ॥ ऊहा खैर सदा मेरे भाई ॥१॥ रहाउ ॥`,
    fullTranslation: `Begampura, 'the city without sorrow', is the name of that town.
There is no suffering or anxiety there.
There is no desire or tax on commodities, nor fear of default or downfall.
Now, I have found this marvelous homeland. Oh my brother, there is everlasting wellness there.`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  {
    id: "tohi-mohi-mohi-tohi",
    titleGurmukhi: "ਤੋਹੀ ਮੋਹੀ ਮੋਹੀ ਤੋਹੀ ਅੰਤਰੁ ਕੈਸਾ ॥",
    titleDevanagari: "तोही मोही मोही तोही अंतरु कैसा ॥",
    titleEnglish: "Between You and Me, What Difference is There?",
    raag: "Sri",
    ang: 93,
    essence: "The non-duality of God and the soul, like gold and the golden ring or water and the wave.",
    fullGurmukhi: `ਤੋਹੀ ਮੋਹੀ ਮੋਹੀ ਤੋਹੀ ਅੰਤਰੁ ਕੈਸਾ ॥ ਕਨਿਕ ਕਟਿਕ ਜਲ ਤਰੰਗ ਜੈਸਾ ॥੧॥
ਜਉ ਹਮ ਨ ਪਾਪ ਕਰੰਤਾ ਅਨੰਤਾ ॥ ਰਾਮ ਰਾਇ ਅਪਦਾ ਤੋਹਿ ਕੈਸੇ ਕਟੰਤਾ ॥੧॥ ਰਹਾਉ ॥`,
    fullDevanagari: `तोही मोही मोही तोही अंतरु कैसा ॥ कनिक कटिक जल तरंग जैसा ॥१॥
जउ हम ਨ ਪਾਪ ਕਰੰਤਾ ਅਨੰਤਾ ॥ ਰਾਮ ਰਾਇ ਅਪਦਾ ਤੋਹਿ ਕੈਸੇ ਕਟੰਤਾ ॥੧॥ ਰਹਾਉ ॥`,
    fullTranslation: `Between You and me, and me and You, what difference could there be?
Like gold and the golden bracelet, or water and the wave.
If I were not to commit any sins, O Sovereign Lord, how could You be called the Redeemer?`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  {
    id: "man-changa-to-kathoti-mein-ganga",
    titleGurmukhi: "ਮਨੁ ਚੰਗਾ ਤੋ ਕਠੌਤੀ ਮਹਿ ਗੰਗਾ ॥",
    titleDevanagari: "मन चंगा तो कठौती में गंगा ॥",
    titleEnglish: "If the Mind is Pure, the Ganges Resides in the Basin",
    raag: "Asa",
    ang: 486,
    essence: "Internal spiritual purity supersedes ritualistic pilgrimages and outer washings.",
    fullGurmukhi: `ਕਾਚੀ ਭਾਂਡੈ ਊਦਕੁ ਬਿਨਸੈ ਜੈਸੇ ॥ ਜਗਤੁ ਬਿਨਸਤ ਹੈ ਤੈਸੇ ॥
ਮਨੁ ਚੰਗਾ ਤੋ ਕਠੌਤੀ ਮਹਿ ਗੰਗਾ ॥`,
    fullDevanagari: `काची भांडै ऊदकु बिनसै जैसे ॥ जगतु बिनसत है तैसे ॥
मन चंगा तो कठौती में गंगा ॥`,
    fullTranslation: `Just as water vanishes from an unbaked clay pot, so does this temporal body perish.
If the mind is pure, the sacred holy Ganges resides in your humble basin of water.`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  {
    id: "durlabh-janam-punya-fal-paio",
    titleGurmukhi: "ਦੁਰਲਭ ਜਨਮੁ ਪੁੰਨ ਫਲ ਪਾਇਓ ॥",
    titleDevanagari: "दुर्लभ जनमु पुन्न फल पाइओ ॥",
    titleEnglish: "This Human Birth is Rare and Precious",
    raag: "Sorath",
    ang: 658,
    essence: "The human life is a precious opportunity for spiritual realization; do not squander it on fleeting ego.",
    fullGurmukhi: `ਦੁਰਲਭ ਜਨਮੁ ਪੁੰਨ ਫਲ ਪਾਇਓ ਬ੍ਰਿਥਾ ਜਾਤ ਅਬਿਬੇਕੈ ॥
ਕਾਚੇ ਧਨ ਕੈ ਹੇਤਿ ਮੁਧਾਈ ਕਹਾ ਭਈ ਸਿਧਿ ਟੇਕੈ ॥੧॥`,
    fullDevanagari: `दुर्लभ जनमु पुन्न फल पाइओ ब्रिथा जात अबिबेकै ॥
काचे धन कै हेति मुधाई कहा भई सिधि टेकै ॥१॥`,
    fullTranslation: `This rare human incarnation was attained as the reward for good deeds, but it is passing away in ignorance.
Chasing fragile worldly riches, how can you reach eternal peace?`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  {
    id: "moti-ta-mandar-usrai",
    titleGurmukhi: "ਮੋਤੀ ਤਾ ਮੰਦਰ ਊਸਰਹਿ ਰਤਨੀ ਤਾ ਹੋਹਿ ਜੜਾਉ ॥",
    titleDevanagari: "मोती ता मंदर ऊसरहि रतनी ता होहि जड़ाउ ॥",
    titleEnglish: "Palaces of Pearls and Jewels",
    raag: "Dhanasri",
    ang: 694,
    essence: "Even if one owns palaces studded with jewels, without Divine Memory it is all empty illusion.",
    fullGurmukhi: `ਮੋਤੀ ਤਾ ਮੰਦਰ ਊਸਰਹਿ ਰਤਨੀ ਤਾ ਹੋਹਿ ਜੜਾਉ ॥
ਕਸਤੂਰਿ ਅੰਗਿ ਲਗਾਵੈ ਨਾਨਕ ਮਤੁ ਦੇਖਿ ਭੂਲਾ ਵੀਸਰੈ ਤੇਰਾ ਨਾਉ ॥੧॥`,
    fullDevanagari: `मोती ता मंदर ऊसरहि रतनी ता होहि जड़ाउ ॥
कस्तूरि अंगि लगावै नानक मतु देखਿ ਭੂਲਾ ਵੀਸਰੈ ਤੇਰਾ ਨਾਉ ॥੧॥`,
    fullTranslation: `If I had palaces built of pearls, inlaid with rubies, perfumed with musk — let me not behold them and forget Your Holy Name.`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  {
    id: "har-har-har-har-japahu-re",
    titleGurmukhi: "ਹਰਿ ਹਰਿ ਹਰਿ ਹਰਿ ਜਪਹੁ ਰੇ ਸੰਤਹੁ ॥",
    titleDevanagari: "हरि हरि हरि हरि जपहु रे संतहु ॥",
    titleEnglish: "Chant the Name of the Divine, O Holy Saints",
    raag: "Ramkali",
    ang: 974,
    essence: "Constant devotional remembrance breaks the shackles of karma and social caste.",
    fullGurmukhi: `ਹਰਿ ਹਰਿ ਹਰਿ ਹਰਿ ਜਪਹੁ ਰੇ ਸੰਤਹੁ ॥
ਕਹੈ ਰਵਿਦਾਸੁ ਰਾਮ ਜਪਿ ਰਸਨਾ ॥`,
    fullDevanagari: `हरि हरि हरि हरि जपहु रे संतहु ॥
कहै रविदासु राम जपि रसना ॥`,
    fullTranslation: `Chant the Name of the Sovereign Lord continuously, O Saints.
Says Ravidas, let your tongue relish the nectar of God's Name.`,
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  }
];

export default function ShabadsPage() {
  const [search, setSearch] = useState("");
  const [selectedRaag, setSelectedRaag] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredShabads = mockShabads.filter((item) => {
    const matchesSearch =
      item.titleEnglish.toLowerCase().includes(search.toLowerCase()) ||
      item.titleGurmukhi.includes(search) ||
      item.titleDevanagari.includes(search) ||
      item.essence.toLowerCase().includes(search.toLowerCase());
    const matchesRaag = selectedRaag === "all" || item.raag.toLowerCase() === selectedRaag.toLowerCase();
    return matchesSearch && matchesRaag;
  });

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-semibold text-saffron uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <LanguageAware en="Sacred Gurbani Archive" hi="पवित्र वाणी आर्काइव" pa="ਪਵਿੱਤਰ ਬਾਣੀ ਆਰਕਾਈਵ" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="40 Shabads of Bhagat Ravidas Ji"
              hi="भगत रविदास जी के 40 शब्द"
              pa="ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਦੇ 40 ਸ਼ਬਦ"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="Enshrined in Sri Guru Granth Sahib Ji across 16 musical Raags (Pages Ang 345–1196). Explore divine poetry, translations, and audio compositions."
              hi="श्री गुरु ग्रंथ साहब जी में 16 रागों के अंतर्गत संरक्षित पवित्र वाणी। दिव्य कविता, अनुवाद और ऑडियो सुनें।"
              pa="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ 16 ਰਾਗਾਂ ਵਿੱਚ ਦਰਜ ਪਵਿੱਤਰ ਬਾਣੀ। ਦਿਵਯ ਕਵਿਤਾ, ਅਨੁਵਾਦ ਅਤੇ ਆਡੀਓ ਵੇਖੋ।"
            />
          </p>
        </motion.div>

        {/* Controls: Search and Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 card-glass p-4 rounded-2xl">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-saffron" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, Gurmukhi, Devanagari..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-saffron/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="h-4 w-4 text-saffron shrink-0" />
            <button
              onClick={() => setSelectedRaag("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRaag === "all"
                  ? "bg-saffron text-white shadow-md shadow-saffron/20"
                  : "bg-surface text-ink-soft hover:text-saffron hover:bg-surface-2"
              }`}
            >
              All Raags ({mockShabads.length})
            </button>
            {raags.slice(0, 8).map((raag) => (
              <button
                key={raag.id}
                onClick={() => setSelectedRaag(raag.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRaag.toLowerCase() === raag.name.toLowerCase()
                    ? "bg-saffron text-white shadow-md shadow-saffron/20"
                    : "bg-surface text-ink-soft hover:text-saffron hover:bg-surface-2"
                }`}
              >
                {raag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Shabad Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShabads.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex flex-col justify-between p-6 rounded-3xl card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-saffron/15 text-[11px] font-bold text-saffron uppercase tracking-wider">
                    Raag {item.raag} · Ang {item.ang}
                  </span>
                  <button
                    onClick={() => setPlayingId(playingId === item.id ? null : item.id)}
                    className="p-2 rounded-full bg-saffron/10 hover:bg-saffron/20 text-saffron transition-colors"
                    aria-label="Listen audio preview"
                  >
                    <Volume2 className={`h-4 w-4 ${playingId === item.id ? "animate-pulse text-saffron-deep" : ""}`} />
                  </button>
                </div>

                <h3 className="font-display text-xl font-bold text-ink group-hover:text-saffron transition-colors leading-snug mb-2">
                  {item.titleEnglish}
                </h3>
                <p className="font-unicode text-sm text-saffron font-semibold mb-1">
                  {item.titleGurmukhi}
                </p>
                <p className="font-unicode text-xs text-ink-soft mb-4">
                  {item.titleDevanagari}
                </p>

                <p className="text-sm text-ink-soft line-clamp-3 leading-relaxed mb-6 font-medium">
                  {item.essence}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-ink-soft font-medium">Sri Guru Granth Sahib Ji</span>
                <Link
                  href={`/shabads/${item.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron hover:gap-2 transition-all"
                >
                  <LanguageAware en="Read Full Shabad" hi="पूरा शब्द पढ़ें" pa="ਪੂਰਾ ਸ਼ਬਦ ਪੜ੍ਹੋ" />
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
