"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, UserPlus, HandHeart, CheckCircle2, AlertCircle } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "./LanguageAware";
import { Breadcrumb } from "./Breadcrumb";

const connectOptions = [
  {
    icon: UserPlus,
    title: "Membership",
    titleHi: "सदस्यता",
    titlePa: "ਮੈਂਬਰਸ਼ਿਪ",
    desc: "Join the BRHF global family. Receive the Be-gumpura message in your inbox.",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    titleHi: "स्वयंसेवक",
    titlePa: "ਵਲੰਟੀਅਰ",
    desc: "Help organise exhibitions, yatras, and outreach programmes worldwide.",
  },
  {
    icon: MessageCircle,
    title: "Donate",
    titleHi: "दान",
    titlePa: "ਦਾਨ",
    desc: "Support the 650th Janam Jayanti Global Commemorative Series.",
  },
  {
    icon: Send,
    title: "Outreach",
    titleHi: "सम्पर्क",
    titlePa: "ਪਹੁੰਚ",
    desc: "Interfaith dialogue, community events, university programmes.",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Connect() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    // Simulate submission — replace with real API endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="connect" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-bg via-bg-soft to-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-royal/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb currentLabel={{ en: "Connect", hi: "जुड़ें", pa: "ਜੁੜੋ" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-royal/20 border border-violet/40 text-xs font-medium text-violet uppercase tracking-widest">
            <LanguageAware en="Chapter VIII" hi="अध्याय VIII" pa="ਅਧਿਆਇ VIII" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Join the Be-gumpura Family"
              hi="बेगमपुरा परिवार में शामिल हों"
              pa="ਬੇਗਮਪੁਰਾ ਪਰਿਵਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ"
            />
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="Become a member, volunteer, or partner — the Be-gumpura light grows stronger with every hand that holds it."
              hi="सदस्य बनें, स्वयंसेवक बनें, या भागीदार बनें — बेगमपुरा का प्रकाश हर हाथ से जोड़ने पर अधिक मजबूत होता है।"
              pa="ਮੈਂਬਰ ਬਣੋ, ਵਲੰਟੀਅਰ ਬਣੋ, ਜਾਂ ਭਾਗੀਦਾਰ — ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਹਰ ਹੱਥ ਨਾਲ ਮਜਬੂਤ ਹੁੰਦੀ।"
            />
          </p>
        </motion.div>

        {/* Connect options grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {connectOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-3xl p-7 card-glass card-saffron-glow hover:scale-[1.03] transition-all duration-300 cursor-pointer text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-saffron/15 to-royal/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-saffron" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-0.5">{opt.title}</h3>
                <p className="text-xs text-saffron/60 mb-3">{opt.titleHi}</p>
                <p className="text-sm text-ink-soft leading-relaxed">{opt.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form + info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          <div className="lg:col-span-2 rounded-3xl p-8 bg-linear-to-br from-saffron/8 via-surface to-royal/8 border border-border/50">
            <h3 className="font-display text-2xl font-bold text-gradient-saffron mb-6">
              <LanguageAware en="Get In Touch" hi="संपर्क करें" pa="ਸੰਪਰਕ ਕਰੋ" />
            </h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="font-display font-bold text-ink dark:text-white text-lg mb-1">
                    <LanguageAware en="Message Sent!" hi="संदेश भेजा गया!" pa="ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ!" />
                  </h4>
                  <p className="text-sm text-gray-500">
                    <LanguageAware en="We'll get back to you within 48 hours." hi="हम 48 घंटे के भीतर जवाब देंगे।" pa="ਅਸੀਂ 48 ਘੰਟੇ ਦੇ ਅੰਦਰ ਜਵਾਬ ਦੇਵਾਂਗੇ।" />
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label className="text-xs uppercase tracking-widest text-ink-soft mb-1.5 block">
                      <LanguageAware en="Full Name" hi="पूरा नाम" pa="ਪੂਰਾ ਨਾਮ" />
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-bg/60 border text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 transition-all",
                        errors.name ? "border-red-400 focus:ring-red-300" : "border-border focus:ring-saffron/40 focus:border-saffron/30"
                      )}
                      placeholder="Your name"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p id="name-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-ink-soft mb-1.5 block">
                      <LanguageAware en="Email" hi="ईमेल" pa="ਈਮੇਲ" />
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-bg/60 border text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 transition-all",
                        errors.email ? "border-red-400 focus:ring-red-300" : "border-border focus:ring-saffron/40 focus:border-saffron/30"
                      )}
                      placeholder="you@example.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p id="email-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-ink-soft mb-1.5 block">
                      <LanguageAware en="Message" hi="संदेश" pa="ਸੁਨੇਹਾ" />
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "msg-error" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-bg/60 border text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 transition-all resize-none",
                        errors.message ? "border-red-400 focus:ring-red-300" : "border-border focus:ring-saffron/40 focus:border-saffron/30"
                      )}
                      placeholder="Your message..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p id="msg-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white font-semibold tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <LanguageAware en="Send Message" hi="संदेश भेजें" pa="ਸੁਨੇਹਾ ਭੇਜੋ" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            <div className="rounded-3xl p-7 card-glass card-saffron-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-saffron to-saffron-deep flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-soft/70">
                    <LanguageAware en="Email" hi="ईमेल" pa="ਈਮੇਲ" />
                  </p>
                  <p className="text-sm text-ink">{brhf.headquarters.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl p-7 card-glass card-saffron-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-royal to-violet flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-soft/70">
                    <LanguageAware en="Phone" hi="फोन" pa="ਫੋਨ" />
                  </p>
                  <p className="text-sm text-ink">{brhf.headquarters.phone}</p>
                  <p className="text-xs text-ink-soft">{brhf.headquarters.phoneAlt}</p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 rounded-3xl p-7 card-glass card-saffron-glow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-saffron/20 to-royal/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-saffron" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-soft/70 mb-1">
                    <LanguageAware en="Address" hi="पता" pa="ਪਤਾ" />
                  </p>
                  <p className="text-sm text-ink leading-relaxed">{brhf.headquarters.address}</p>
                </div>
              </div>
            </div>

            {/* Daily Quote */}
            <div className="sm:col-span-2 rounded-3xl p-7 bg-linear-to-br from-saffron/5 via-surface to-royal/5 border border-saffron/25">
              <p className="text-xs uppercase tracking-widest text-saffron mb-3">
                <LanguageAware en="Today's Shabad" hi="आज का शबद" pa="ਅੱਜ ਦਾ ਸ਼ਬਦ" />
              </p>
              <p className="font-display text-lg italic text-saffron/90 leading-relaxed">
                &ldquo;Be-gumpura, the city to which I bow — without worry, without fear, without tax.&rdquo;
              </p>
              <p className="text-xs text-ink-soft mt-2">
                Sri Guru Granth Sahib Ji · Ang 345 · Raag Gaur
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
