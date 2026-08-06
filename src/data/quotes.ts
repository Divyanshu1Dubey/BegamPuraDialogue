// Daily Quote — rotating pool of shabads and teachings
// Used by DailyQuoteCard component to display a different quote each day

export interface DailyQuote {
  text: string;
  textHindi?: string;
  textPunjabi?: string;
  source: string;
  raag?: string;
}

export const dailyQuotes: DailyQuote[] = [
  {
    text:
      "Begampura, the city to which I bow — without worry, without fear, without tax. There, the Name of the Lord resounds.",
    textHindi:
      "बेगमपुरा, वह नगर जिसे मैं नমन करता हूँ — चिंता नहीं, भय नहीं, कर नहीं। वहाँ केवल प्रभु का नाम गूँजता है।",
    textPunjabi:
      "ਬੇਗਮਪੁਰਾ, ਉਹ ਨਗਰ ਜਿਸ ਨੂੰ ਮੈਂ ਨਮਨ ਕਰਾਂ — ਚਿੰਤਾ ਨਹੀਂ, ਭੈ ਨਹੀਂ, ਕਰ ਨਹੀਂ। ਉੱਥੇ ਸਿਰਫ਼ ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਗੂੰਜਦਾ ਹੈ।",
    source: "Sri Guru Granth Sahib Ji, Ang 345, Raag Gaur",
    raag: "Gaur",
  },
  {
    text:
      "God made the clay of one light. How then does one say another is less or more?",
    textHindi:
      "ईश्वर ने सबको एक ही मिट्टी से रचा। फिर कैसे कहें कोई घटिया, कोई उत्तम?",
    textPunjabi:
      "ਇਸ਼ਟ ਨੇ ਸਭ ਨੂੰ ਇੱਕ ਮਿੱਟੀ ਤੋਂ ਬਣਾਇਆ। ਫਿਰ ਕਿਵੇਂ ਕਹੀਏ ਕੋਈ ਘੱਟ, ਕੋਈ ਵੱਧ?",
    source: "Sri Guru Granth Sahib Ji, Raag Suhi",
    raag: "Suhi",
  },
  {
    text:
      "Honest labour is true devotion. The Lord delights in those who earn their living with their own hands.",
    textHindi:
      "सच्ची मेहनत ही सच्ची पूजा। ईश्वर उन्हें प्रसन्न होते हैं जो अपने हाथों की कमाई खाते हैं।",
    textPunjabi:
      "ਸੱਚੀ ਮਿਹਨਤ ਹੀ ਸੱਚੀ ਪੂਜਾ। ਪ੍ਰਭੂ ਉਨ੍ਹਾਂ ਨੂੰ ਪ੍ਰਸੰਨ ਹੁੰਦਾ ਜੋ ਆਪਣੇ ਹੱਥਾਂ ਦੀ ਕਮਾਈ ਖਾਂਦੇ।",
    source: "Teachings of Bhagat Ravidas Ji",
  },
  {
    text:
      "From a woman is the seed of all. Why call her impure, who gives birth to kings?",
    textHindi:
      "नारी से ही संसार है। फिर उसे अपवित्र कैसे कहें, जो स्वयं राजाओं को जन्म देती है?",
    textPunjabi:
      "ਨਾਰੀ ਤੋਂ ਹੀ ਸੰਸਾਰ। ਫਿਰ ਉਸ ਨੂੰ ਅਪਵਿੱਤਰ ਕਿਵੇਂ ਕਹੀਏ, ਜੋ ਆਪ ਰਾਜਿਆਂ ਨੂੰ ਜਨਮ ਦਿੰਦੀ?",
    source: "Sri Guru Granth Sahib Ji",
  },
  {
    text:
      "The Name of the Lord is the treasure of the poor, and the strength of the weak.",
    textHindi:
      "प्रभु का नाम ग़रीब का खज़ाना है, कमज़ोर की शक्ति।",
    textPunjabi:
      "ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਗ਼ਰੀਬ ਦਾ ਖ਼ਜ਼ਾਨਾ, ਕਮਜ਼ੋਰ ਦੀ ਸ਼ਕਤੀ।",
    source: "Sri Guru Granth Sahib Ji",
  },
  {
    text:
      "The Lord dwells in every heart. Why seek Him in distant temples?",
    textHindi:
      "प्रभु तो हर हृदय में वास करते हैं। दूर के मंदिरों में क्यों ढूँढें?",
    textPunjabi:
      "ਪ੍ਰਭੂ ਤਾਂ ਹਰ ਦਿਲ ਵਿੱਚ ਵੱਸਦੇ। ਦੂਰ ਦੇ ਮੰਦਰਾਂ ਵਿੱਚ ਕਿਉਂ ਲੱਭਣ?",
    source: "Teachings of Bhagat Ravidas Ji",
  },
  {
    text:
      "Cast off the weight of caste and creed. The Divine looks only at the heart.",
    textHindi:
      "जात-पात का बोझ उतार दो। ईश्वर तो केवल हृदय देखते हैं।",
    textPunjabi:
      "ਜਾਤ-ਪਾਤ ਦਾ ਬੋਝ ਉਤਾਰ ਦਿਓ। ਪ੍ਰਭੂ ਤਾਂ ਸਿਰਫ਼ ਦਿਲ ਵੇਖਦਾ।",
    source: "Sri Guru Granth Sahib Ji, Raag Asa",
    raag: "Asa",
  },
  {
    text:
      "I am not learned, I am not wise — I am simply a servant of the Lord.",
    textHindi:
      "मैं न पंडित हूँ, न ज्ञानी — मैं तो केवल प्रभु का सेवक हूँ।",
    textPunjabi:
      "ਮੈਂ ਨਾ ਪੰਡਤ, ਨਾ ਜ੍ਞਾਨੀ — ਮੈਂ ਤਾਂ ਸਿਰਫ਼ ਪ੍ਰਭੂ ਦਾ ਸੇਵਕ।",
    source: "Sri Guru Granth Sahib Ji, Ang 657",
  },
];

// Pick the quote for today's date — deterministic rotation
export function getTodayQuote(): DailyQuote {
  const start = new Date("2025-01-01").getTime();
  const today = Date.now();
  const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return dailyQuotes[days % dailyQuotes.length];
}