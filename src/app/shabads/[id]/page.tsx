"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Volume2, Share2, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { LanguageAware } from "@/components/LanguageAware";

const mockShabadsMap: Record<string, {
  id: string;
  titleGurmukhi: string;
  titleDevanagari: string;
  titleEnglish: string;
  raag: string;
  ang: number;
  essence: string;
  fullGurmukhi: string;
  fullDevanagari: string;
  fullTranslation: string;
  civicImplication: string;
  audioSrc: string;
}> = {
  "begampura-shahar-ko-naao": {
    id: "begampura-shahar-ko-naao",
    titleGurmukhi: "ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥",
    titleDevanagari: "बेगम पुरा सहर को नाव ॥",
    titleEnglish: "Begampura — The City Without Sorrow",
    raag: "Gauri",
    ang: 345,
    essence: "The original utopian vision of an ideal, fear-free, tax-free, equal socialist state.",
    fullGurmukhi: `ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥ ਦੂਖੁ ਅੰਦੋਹੁ ਨਹੀ ਤਿਹਿ ਠਾਉ ॥
ਨਾ ਤਸਵੀਸ ਕੋਲੁ ਨ ਮਾਲੁ ॥ ਖਉਫੁ ਨ ਖਤਾ ਨ ਤਰਸੁ ਜਵਾਲੁ ॥੧॥
ਅਬ ਮੋਹਿ ਖੂਬ ਵਤਨ ਗਹ ਪਾਈ ॥ ਊਹਾ ਖੈਰਿ ਸਦਾ ਮੇਰੇ ਭਾਈ ॥੧॥ ਰਹਾਉ ॥
ਤਾਇਮੁ ਦਾਇਮੁ ਲਹਾ ਪਾਸਾ ॥ ਦੋਮ ਨ ਸੇਮ ਏਕ ਸੋ ਆਸਾ ॥
ਆਬਾਦਾਨੁ ਸਦਾ ਮਸਹੂਰ ॥ ਊਹਾ ਗਨੀ ਬਸਹਿ ਮਾਮੂਰ ॥੨॥
ਤਿਉ ਤਿਉ ਸੈਲ ਕਰਹਿ ਜਿਉ ਭਾਵੈ ॥ ਮਹਰਮ ਮਹਲ ਨ ਕੋ ਅਟਕਾਵੈ ॥
ਕਹਿ ਰਵਿਦਾਸ ਖਲਾਸ ਚਮਾਰਾ ॥ ਜੋ ਹਮ ਸ਼ਹਰੀ ਸੁ ਮੀਤੁ ਹਮਾਰਾ ॥੩॥`,
    fullDevanagari: `बेगम पुरा सहर को नाव ॥ दूखु अंदोहु नही तिहि ठाउ ॥
ना तसवीस कोलु न मालु ॥ खउफु न खता न तरसु जवालु ॥१॥
अब मोहि खूब वतन गह पाई ॥ ऊहा खैर सदा मेरे भाई ॥१॥ रहाउ ॥
ताइमु दाइमु लहा पासा ॥ दोम न सेम एक सो आसा ॥
आबादानु सदा मसहूर ॥ ऊहा गनी बसहि मामूर ॥२॥
तिउ तिਉ सैल करहि जिउ भावै ॥ महरम महल न को अटकावै ॥
कहि रविदास खलास चमारा ॥ जो हम शहरी सु मीतु हमारा ॥३॥`,
    fullTranslation: `Begampura, 'the city without sorrow', is the name of that town.
There is no suffering or anxiety there.
There is no property tax or fear of default, nor any decline or tax on physical labour.
Now, I have found this marvelous homeland. Oh my brother, there is everlasting wellness there.
Its sovereignty is eternal and absolute. There are no second or third class citizens — all are equal before the Sovereign.
It is forever populous and famous. The inhabitants are wealthy in spirit and content.
They wander freely wherever they please; no guard bars them from the royal courtyard.
Says Ravidas, the emancipated leather-worker: whoever is a fellow citizen of this city is my true friend.`,
    civicImplication: "Inspires modern human rights charters, anti-caste dignity of labour, universal basic security, and unconditional freedom of speech and movement.",
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  },
  "tohi-mohi-mohi-tohi": {
    id: "tohi-mohi-mohi-tohi",
    titleGurmukhi: "ਤੋਹੀ ਮੋਹੀ ਮੋਹੀ ਤੋਹੀ ਅੰਤਰੁ ਕੈਸਾ ॥",
    titleDevanagari: "तोही मोही मोही तोही अंतरु कैसा ॥",
    titleEnglish: "Between You and Me, What Difference is There?",
    raag: "Sri",
    ang: 93,
    essence: "The non-duality of God and the human soul.",
    fullGurmukhi: `ਤੋਹੀ ਮੋਹੀ ਮੋਹੀ ਤੋਹੀ ਅੰਤਰੁ ਕੈਸਾ ॥ ਕਨਿਕ ਕਟਿਕ ਜਲ ਤਰੰਗ ਜੈਸਾ ॥੧॥
ਜਉ ਹਮ ਨ ਪਾਪ ਕਰੰਤਾ ਅਨੰਤਾ ॥ ਰਾਮ ਰਾਇ ਅਪਦਾ ਤੋਹਿ ਕੈਸੇ ਕਟੰਤਾ ॥੧॥ ਰਹਾਉ ॥`,
    fullDevanagari: `तोही मोही मोही तोही अंतरु कैसा ॥ कनिक कटिक जल तरंग जैसा ॥१॥
जउ हम न पाप करंता अनंता ॥ राम राइ आपदा तोहि कैसे कटंता ॥१॥ रहाउ ॥`,
    fullTranslation: `Between You and me, and me and You, what difference could there be?
Like gold and the golden bracelet, or water and the wave.
If I were not to commit any sins, O Sovereign Lord, how could You be called the Redeemer?`,
    civicImplication: "Teaches the intrinsic divine spark inside every human being, regardless of birth, origin, or lineage.",
    audioSrc: "https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg"
  }
};

export default function ShabadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<"gurmukhi" | "devanagari" | "english">("gurmukhi");

  const shabad = mockShabadsMap[id] || mockShabadsMap["begampura-shahar-ko-naao"];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shabad.titleEnglish}\n\n${shabad.fullGurmukhi}\n\n${shabad.fullTranslation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Link
          href="/shabads"
          className="inline-flex items-center gap-2 text-sm text-saffron hover:underline mb-8 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <LanguageAware en="Back to 40 Shabads" hi="सभी 40 शब्दों पर वापस जाएं" pa="ਸਾਰੇ 40 ਸ਼ਬਦਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ" />
        </Link>

        {/* Card Container */}
        <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-saffron/15 text-xs font-bold text-saffron uppercase tracking-wider">
              Raag {shabad.raag} · Ang {shabad.ang}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-ink-soft hover:text-saffron transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mb-4">
            {shabad.titleEnglish}
          </h1>

          {/* Script Switcher */}
          <div className="flex items-center gap-2 mb-8 border-b border-border/50 pb-4">
            <button
              onClick={() => setActiveLang("gurmukhi")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeLang === "gurmukhi" ? "bg-saffron text-white shadow-md shadow-saffron/20" : "bg-surface text-ink-soft"
              }`}
            >
              ਗੁਰਮੁਖੀ (Gurmukhi)
            </button>
            <button
              onClick={() => setActiveLang("devanagari")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeLang === "devanagari" ? "bg-saffron text-white shadow-md shadow-saffron/20" : "bg-surface text-ink-soft"
              }`}
            >
              देवनागरी (Devanagari)
            </button>
            <button
              onClick={() => setActiveLang("english")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeLang === "english" ? "bg-saffron text-white shadow-md shadow-saffron/20" : "bg-surface text-ink-soft"
              }`}
            >
              English Translation
            </button>
          </div>

          {/* Verse Display */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-2/50 border border-border/60 mb-8">
            {activeLang === "gurmukhi" && (
              <pre className="font-unicode text-lg md:text-2xl font-bold text-saffron leading-relaxed whitespace-pre-wrap font-sans">
                {shabad.fullGurmukhi}
              </pre>
            )}
            {activeLang === "devanagari" && (
              <pre className="font-unicode text-lg md:text-2xl font-bold text-saffron leading-relaxed whitespace-pre-wrap font-sans">
                {shabad.fullDevanagari}
              </pre>
            )}
            {activeLang === "english" && (
              <p className="text-base md:text-lg text-ink leading-relaxed whitespace-pre-line font-medium">
                {shabad.fullTranslation}
              </p>
            )}
          </div>

          {/* Translation Box */}
          {activeLang !== "english" && (
            <div className="mb-8 p-6 rounded-2xl bg-surface border border-border">
              <h3 className="font-display text-sm font-bold text-saffron uppercase tracking-wider mb-2">
                English Translation
              </h3>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed whitespace-pre-line">
                {shabad.fullTranslation}
              </p>
            </div>
          )}

          {/* Civic Governance Implication */}
          <div className="p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
            <h3 className="font-display text-base font-bold text-saffron-deep dark:text-saffron mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Modern Civic & Human Rights Application
            </h3>
            <p className="text-sm text-ink leading-relaxed font-medium">
              {shabad.civicImplication}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
