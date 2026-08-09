"use client";

import { motion } from "framer-motion";
import { Quote, MapPin, Users, Building, Landmark, Scale, ShieldCheck, Heart, Sprout } from "lucide-react";
import { guru } from "@/data/guru";
import { LanguageAware } from "./LanguageAware";
import { RavidassImage } from "./RavidassPortrait";

const begampuraEntry = guru.philosophy.find(p => p.title.startsWith("Be-gumpura"));

const pillars = [
  { icon: Scale, title: "Equality", subtitle: "न्याय · ਸਮਾਨਤਾ" },
  { icon: Heart, title: "Dignity", subtitle: "गरिमा · ਗਰਿਮਾ" },
  { icon: Users, title: "Participation", subtitle: "भागीदारी · ਹਿੱਸਾ" },
  { icon: ShieldCheck, title: "Security", subtitle: "सुरक्षा · ਸੁਰੱਖਿਆ" },
  { icon: Sprout, title: "Welfare", subtitle: "कल्याण · ਭਲਾਈ" },
  { icon: Landmark, title: "Governance", subtitle: "शासन · ਸ਼ਾਸਨ" },
];

export function Begampura() {
  return (
    <section id="begampura" className="relative py-32 overflow-hidden">
      {/* Deep purple background */}
      <div className="absolute inset-0 bg-linear-to-b from-bg via-violet-deep/10 to-bg pointer-events-none" />

      {/* Large quotation mark decoration */}
      <div className="absolute top-12 left-8 md:left-24 text-[16rem] font-serif leading-none text-saffron/5 pointer-events-none select-none">
        &ldquo;
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-medium text-saffron uppercase tracking-widest">
            <LanguageAware en="Chapter III" hi="अध्याय III" pa="ਅਧਿਆਇ III" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-gradient-mandala leading-tight">
            Be-gumpura
          </h2>
          <p className="mt-3 text-lg md:text-xl text-saffron/80 font-display italic">
            <LanguageAware
              en="The City Without Sorrow"
              hi="दुःख रहित नगर"
              pa="ਦੁੱਖ-ਰਹਿਤ ਨਗਰ"
            />
          </p>
          <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="Five hundred years before modern constitutions, five centuries before the Universal Declaration of Human Rights — one saint of Varanasi wrote the world's first charter of a truly egalitarian society. He called it Be-gumpura."
              hi="आधुनिक संविधानों से पाँच सदी पहले, मानव अधिकार के वैश्विक घोषणा पत्र से पाँच शताब्दी पहले — वाराणसी के एक संत ने वास्तविक समतावादी समाज की दुनिया की पहली समझौता लिखी। उन्होंने उसे बेगमपुरा कहा।"
              pa="ਆਧੁਨਿਕ ਸੰਵਿਧਾਨਾਂ ਤੋਂ ਪੰਜ ਸਦੀਆਂ ਪਹਿਲਾਂ — ਵਾਰਾਣਸੀ ਦੇ ਇੱਕ ਸੰਤ ਨੇ ਦੁਨੀਆਂ ਦੀ ਪਹਿਲੀ ਸਮਾਨਤਾਵਾਦੀ ਸਮਾਜ ਦੀ ਚਾਰਟਰ ਲਿਖੀ।"
            />
          </p>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex justify-center mb-20"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-60">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-saffron/40 via-gold/30 to-royal/40" />
            </div>
            <RavidassImage
              src="/assets/OIP.webp"
              alt="Sant Ravidas Ji"
              size={200}
              revealDuration={2.4}
              className="relative animate-float"
            />
          </div>
        </motion.div>

        {/* The Shabad */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="relative rounded-[2rem] p-8 md:p-12 bg-linear-to-br from-saffron/8 via-royal/5 to-saffron/5 border border-saffron/25 card-glass card-saffron-glow">
            <Quote className="h-12 w-12 text-saffron/30 absolute top-6 right-8" />
            <div className="space-y-4">
              {begampuraEntry?.shabadOpening && (
                <p className="font-display text-xl md:text-2xl text-saffron leading-relaxed italic">
                  &ldquo;{begampuraEntry.shabadOpening}&rdquo;
                </p>
              )}
              <p className="text-base md:text-lg text-ink-soft leading-relaxed">
                {begampuraEntry?.description}
              </p>
              <p className="text-sm text-ink-soft/50 italic">
                {begampuraEntry?.descriptionHindi}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-saffron/80">
                Sri Guru Granth Sahib Ji
              </span>
              <span className="text-border">|</span>
              <span className="text-xs text-ink-soft/60">Ang 345 · Raag Gaur</span>
            </div>
          </div>
        </motion.div>

        {/* Governance Paradigm — subtle India framing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-royal/20 border border-violet/40 text-xs font-medium text-violet uppercase tracking-widest">
              <LanguageAware en="Report Section" hi="रिपोर्ट खंड" pa="ਰਿਪੋਰਟ ਖੰਡ" />
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient-saffron">
              <LanguageAware
                en="The Governance Paradigm"
                hi="शासन के संकल्प"
                pa="ਸ਼ਾਸਨ ਦਾ ਸੰਕਲਪ"
              />
            </h3>
            <p className="mt-4 text-ink-soft max-w-3xl mx-auto">
              <LanguageAware
                en="How the principles of Be-gumpura align with the ideals of an inclusive, sovereign, and service-oriented governance model — where the state bows before the citizen, not the other way around."
                hi="बेगमपुरा के सिद्धांत एक समावेशी, संप्रभु, और सेवा-केन्द्रित शासन मॉडल के आदर्शों से किस प्रकार संरेखित हैं।"
                pa="ਬੇਗਮਪੁਰਾ ਦੇ ਸਿਧਾਂਤ ਸਮਾਵੇਸ਼ੀ, ਸੰਪ੍ਰਭੂ ਅਤੇ ਸੇਵਾ-ਕੇਂਦਰਿਤ ਸ਼ਾਸਨ ਮਾਡਲ ਦੇ ਆਦਰਸ਼ਾਂ ਨਾਲ ਕਿਵੇਂ ਮੇਲ ਖਾਂਦੇ।"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "From 'Sansad' to 'Sangam'",
                titleHindi: "संसद से संगम तक",
                desc: "Modern governance treats the Parliament as the temple of democracy — yet truly democratic policy must be crafted from the ground up. The governance paradigm of Be-gumpura demands citizen-centric legislation: that the poor have the loudest voice in policy rooms.",
                descHindi: "आधुनिक शासन संसद को लोकतंत्र के मंदिर के रूप में देखता है — पर असली लोकतांत्रिक नीति जमीन से तैयार होती है। बेगमपुरा नागरिक-केंद्रित कानून की मांग करती है: गरीबों की आवाज़ नीति कक्षाओं में सबसे तेज़ हो।",
                icon: Scale,
              },
              {
                title: "Ek Bharat, Shreshtha Bharat",
                titleHindi: "एक भारत, श्रेष्ठ भारत",
                desc: "The vision of a united, prosperous India where every community — regardless of caste, creed, or occupation — participates in nation-building. This is the essence of Sant Ravidas's Ek Noor principle: One Light in all beings.",
                descHindi: "एक मजबूत, समृद्ध भारत की दृष्टि — जहां जाति, धर्म या पेशा से छूटकर हर समुदाय राष्ट्र निर्माण में हिस्सा ले। संत रविदास का 'एक नूर' सिद्धांत।",
                icon: Building,
              },
              {
                title: "Sabka Saath, Sabka Vikas",
                titleHindi: "सभका साथ, सभका विकास",
                desc: "The hallmarks of inclusive welfare — skilling the underprivileged (Kirat), building healthcare for all, ensuring food security. When governance aligns with Be-gumpura, the state becomes the great equaliser.",
                descHindi: "समावेशी कल्याण के लक्षण — वंचितों को कौशल (किरत), सभी के लिए स्वास्थ्य सेवा, खाद्य सुरक्षा। जब शासन बेगमपुरा के अनुकूल हो, तो राज्य बड़ा समतासंचालक बनता है।",
                icon: Heart,
              },
              {
                title: "The Dignity of Every Hand",
                titleHindi: "हर हाथ की गरिमा",
                desc: "From the chowkidar to the Chief — every citizen is a sovereign. A governance model rooted in Be-gumpura insists on universal minimum wage, workers' rights, and the celebration of all labour as divine.",
                descHindi: "चौकीदार से सीएफ तक — हर नागरिक संप्रभु है। बेगमपुरा पर आधारित शासन मॉडल सार्वभौमिक न्यूनतम वेतन, कर्मचारियों के अधिकार और सभी श्रम को दिव्य के रूप में उत्सव मांगता है।",
                icon: ShieldCheck,
              },
              {
                title: "15 Years of Inclusive Reform",
                titleHindi: "15 वर्ष समावेशी सुधार",
                desc: "Over the past decade and a half, India has witnessed one of the most ambitious social reform programmes in modern history — Swachh Bharat, Ayushman Bharat, Ujjwala, Housing for All, Skill India — each echoing the Be-gumpura vision in policy form.",
                descHindi: "पिछले 15 वर्षों में भारत ने आधुनिक इतिहास के सबसे महत्वाकांक्षी सामाजिक सुधार कार्यक्रमों का अनुभव किया है — प्रत्येक बेगमपुरा दृष्टिकोण को नीति रूप में दोहराता है।",
                icon: Landmark,
              },
              {
                title: "Beyond the Horizon",
                titleHindi: "किनारे से परे",
                desc: "The ultimate governance goal: a society where sorrow, fear, and exploitation have no address. This is Be-gumpura's blueprint for a New India — and for every nation that dares to dream of something better.",
                descHindi: "अंतिम शासन लक्ष्य: एक ऐसा समाज जहां दुःख, भय और शोषण का कोई पता न हो। बेगमपुरा का नया भारत ब्लूप्रिंट।",
                icon: MapPin,
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="rounded-3xl p-7 card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-saffron/20 to-royal/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-saffron" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1">{pillar.title}</h3>
                  <p className="text-xs text-saffron/60 mb-3">{pillar.titleHindi}</p>
                  <p className="text-sm text-ink-soft leading-relaxed flex-1">{pillar.desc}</p>
                  <p className="text-xs text-ink-soft/40 mt-3 italic">{pillar.descHindi}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Core Be-gumpura shabads strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 md:p-12 bg-linear-to-r from-bg-soft via-surface to-bg-soft border border-border/50"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { en: "No sorrow", hi: "दुःख नहीं" },
              { en: "No fear", hi: "डर नहीं" },
              { en: "No exploitation", hi: "शोषण नहीं" },
              { en: "Only the Name", hi: "केवल नाम" },
            ].map((item, i) => (
              <motion.div
                key={item.en}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-5 rounded-2xl bg-saffron/5 border border-saffron/15"
              >
                <p className="text-lg font-display font-bold text-saffron">{item.en}</p>
                <p className="text-sm text-saffron/70 mt-1">{item.hi}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual archive strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron">
              <LanguageAware
                en="The Many Faces of Devotion"
                hi="भक्ति के अनेक रूप"
                pa="ਭਗਤੀ ਦੇ ਬਹੁਤ ਰੂਪ"
              />
            </h3>
            <p className="mt-3 text-sm text-ink-soft max-w-2xl mx-auto">
              <LanguageAware
                en="Paintings, sculptures and offerings — across centuries, the devotion to Guru Ravidas has taken many beautiful forms."
                hi="चित्रकारी, मूर्तियाँ और अर्पण — सदियों में गुरु रविदास की भक्ति ने अनेक सुंदर रूप लिए।"
                pa="ਪੇਂਟਿੰਗਾਂ, ਮੂਰਤੀਆਂ ਅਤੇ ਅਰਪਣ — ਸਦੀਆਂ ਵਿੱਚ ਗੁਰੂ ਰਵਿਦਾਸ ਪ੍ਰਤੀ ਭਗਤੀ ਨੇ ਬਹੁਤ ਸੋਹਣੇ ਰੂਪ ਲਏ।"
              />
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/assets/Sri-Guru-Ravidas-Photo-Download-Free.jpg", alt: "Devotional painting" },
              { src: "/assets/Shri-Guru-Ravidas-Ji-Image-Pictures-Download.jpg", alt: "Temple sculpture" },
              { src: "/assets/guru-ravidass-hindu-holy-saint-qdl6bp29umg4uvrl.jpg", alt: "Saintly portrait" },
              { src: "/assets/guru-ravidas-jayanti-illustration-vector.jpg", alt: "Jayanti illustration" },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative aspect-square rounded-2xl overflow-hidden card-glass card-saffron-glow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg/85 via-transparent to-transparent pointer-events-none" />
                <figcaption className="absolute bottom-2 left-2 right-2 text-[10px] uppercase tracking-wider text-saffron-bright text-center drop-shadow-lg">
                  {img.alt}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}