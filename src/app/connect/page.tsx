"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart, Users, Sparkles, Send, CheckCircle2, Globe } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "@/components/LanguageAware";

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "United Kingdom",
    role: "Volunteer",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <LanguageAware en="Join the Global Sangat" hi="वैश्विक संगत से जुड़ें" pa="ਵਿਸ਼ਵ ਸੰਗਤ ਨਾਲ ਜੁੜੋ" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Connect with BRHF"
              hi="बीआरएचएफ से जुड़ें"
              pa="ਬੀ.ਆਰ.ਐਚ.ਐਫ. ਨਾਲ ਜੁੜੋ"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="Become a volunteer, research fellow, or global ambassador for the 650th Janam Jayanti celebrations of Sant Ravidas Ji."
              hi="संत रविदास जी के 650वें प्रकाश पर्व समारोह के लिए स्वयंसेवक, शोध फेलो या राजदूत बनें।"
              pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੇ 650ਵੇਂ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਸਮਾਰੋਹਾਂ ਲਈ ਸੇਵਾਦਾਰ, ਰਿਸਰਚ ਫੈਲੋ ਜਾਂ ਅੰਬੈਸਡਰ ਬਣੋ।"
            />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Details & Headquarters */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl card-glass card-saffron-glow">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Global Secretariat</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                  <MapPin className="h-5 w-5 text-saffron shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-saffron uppercase">Headquarters</span>
                    <p className="text-sm text-ink font-medium mt-1">{brhf.headquarters.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                  <Mail className="h-5 w-5 text-saffron shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-saffron uppercase">Email Enquiries</span>
                    <p className="text-sm text-ink font-medium mt-1">{brhf.headquarters.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                  <Phone className="h-5 w-5 text-saffron shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-saffron uppercase">Telephone Hotlines</span>
                    <p className="text-sm text-ink font-medium mt-1">{brhf.headquarters.phone} / {brhf.headquarters.phoneAlt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Chapters */}
            <div className="p-8 rounded-3xl card-glass">
              <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-saffron" /> Global Chapter Network
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-medium text-ink-soft">
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <span className="text-saffron font-bold block">United Kingdom</span>
                  London, Birmingham, Bedford
                </div>
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <span className="text-saffron font-bold block">India</span>
                  Varanasi, New Delhi, Punjab
                </div>
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <span className="text-saffron font-bold block">Europe</span>
                  Brussels, Frankfurt, Paris
                </div>
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <span className="text-saffron font-bold block">North America</span>
                  Toronto, Vancouver, New York
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Volunteer Form */}
          <div className="p-8 rounded-3xl card-glass card-saffron-glow">
            {!submitted ? (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink mb-2">Volunteer & Ambassador Registration</h2>
                <p className="text-xs text-ink-soft mb-6 font-medium">Register to contribute toward research, event hosting, or community outreach.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullname" className="block text-xs font-bold text-ink-soft mb-1">Your Full Name</label>
                    <input
                      id="fullname"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Smt. Gurpreet Kaur"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-ink-soft mb-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-xs font-bold text-ink-soft mb-1">Country</label>
                      <select
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-surface border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      >
                        <option>United Kingdom</option>
                        <option>India</option>
                        <option>Canada</option>
                        <option>USA</option>
                        <option>Germany</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-xs font-bold text-ink-soft mb-1">Desired Role</label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-surface border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      >
                        <option>Volunteer Event Coordinator</option>
                        <option>Gurbani Research Fellow</option>
                        <option>Youth Delegate</option>
                        <option>Media & Communications</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-ink-soft mb-1">Message / Note of Interest</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how you would like to participate..."
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-saffron via-saffron-deep to-sindoor text-white text-sm font-bold shadow-lg shadow-saffron/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" /> Submit Registration Interest
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="font-display text-3xl font-bold text-ink mb-2">Welcome to the Movement!</h3>
                <p className="text-sm text-ink-soft max-w-sm mx-auto mb-6">
                  Thank you, {formData.name}. The BRHF Secretariat has received your application and will get in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-saffron text-white text-xs font-bold"
                >
                  Submit Another Form
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
