"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Share2,
  Camera,
  AtSign,
  Play,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const contactCards = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Islamabad, Pakistan",
    sub: "F-10 Markaz, Blue Area",
    iconBg: "bg-[#F97316]/10 border-[#F97316]/20",
    iconColor: "text-[#F97316]",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@hiddenpak.com",
    sub: "We reply within 24 hours",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    sub: "Mon – Sat, 9am – 6pm PKT",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Saturday",
    sub: "9:00 AM – 6:00 PM PKT",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
  },
];

const socialLinks = [
  {
    icon: Share2,
    label: "Facebook",
    handle: "@HiddenPak",
    href: "#",
    color: "hover:border-blue-500/60 hover:text-blue-400",
  },
  {
    icon: Camera,
    label: "Instagram",
    handle: "@hiddenpak",
    href: "#",
    color: "hover:border-pink-500/60 hover:text-pink-400",
  },
  {
    icon: AtSign,
    label: "Twitter / X",
    handle: "@HiddenPak",
    href: "#",
    color: "hover:border-sky-500/60 hover:text-sky-400",
  },
  {
    icon: Play,
    label: "YouTube",
    handle: "HiddenPak",
    href: "#",
    color: "hover:border-red-500/60 hover:text-red-400",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    handle: "+92 300 1234567",
    href: "https://wa.me/923001234567",
    color: "hover:border-green-500/60 hover:text-green-400",
  },
];

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  else if (data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address";

  if (!data.subject.trim()) errors.subject = "Please select a subject";

  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters";

  return errors;
}

const inputBase =
  "w-full px-4 py-3.5 bg-[#0B0F19] border rounded-xl text-sm text-[#F5F5DC] placeholder-[#6B7280] focus:outline-none transition-colors";
const inputNormal = "border-[#1F2937] focus:border-[#F97316]/60";
const inputError = "border-red-500/50 focus:border-red-500";

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Simulate network call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="bg-[#111827] border-b border-[#1F2937] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse at 60% 50%, #F97316 0%, transparent 60%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Mail className="w-3.5 h-3.5" />
              Reach Out
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-heading leading-tight mb-4">
              Get in <span className="text-[#F97316]">Touch</span>
            </h1>
            <p className="text-[#F5F5DC]/70 text-lg max-w-xl mx-auto leading-relaxed">
              Have a travel question, a story to share, or want to collaborate?
              We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── Contact Info Cards ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 flex items-start gap-4 hover:border-[#F97316]/30 transition-all"
            >
              <div
                className={`w-11 h-11 ${card.iconBg} border rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-0.5 font-medium">
                  {card.label}
                </p>
                <p className="font-semibold text-[#F5F5DC] text-sm">
                  {card.value}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 2-Column Layout ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Contact Form (3/5) ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white font-heading mb-1">
                Send Us a Message
              </h2>
              <p className="text-[#6B7280] text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#6B7280] mb-6 leading-relaxed">
                    Thank you for reaching out. We&apos;ll get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-sm font-semibold text-[#F97316] hover:text-[#F97316]/80 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5DC]/80 mb-2">
                        Your Name <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ahmed Khan"
                        className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                      />
                      {errors.name && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          <p className="text-xs text-red-400">{errors.name}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5DC]/80 mb-2">
                        Email Address <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ahmed@example.com"
                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          <p className="text-xs text-red-400">{errors.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5DC]/80 mb-2">
                      Subject <span className="text-[#F97316]">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.subject ? inputError : inputNormal}`}
                    >
                      <option value="">Select a topic...</option>
                      <option>Travel Inquiry</option>
                      <option>Blog Submission</option>
                      <option>Partnership</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <p className="text-xs text-red-400">{errors.subject}</p>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5DC]/80 mb-2">
                      Message <span className="text-[#F97316]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us about your travel plans, questions, or how you'd like to collaborate..."
                      className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                    />
                    <div className="flex items-start justify-between mt-1.5">
                      {errors.message ? (
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          <p className="text-xs text-red-400">{errors.message}</p>
                        </div>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-[#6B7280]">
                        {form.message.length}/500
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#F97316] hover:bg-[#F97316]/90 disabled:bg-[#F97316]/50 text-white font-bold py-4 rounded-xl transition-all duration-200"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right Sidebar (2/5) ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Map Embed */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
              <div className="h-52">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.0%2C33.5%2C73.2%2C33.7&layer=mapnik&marker=33.6007,73.0679"
                  className="w-full h-full grayscale opacity-75"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="HiddenPak Office - Islamabad, Pakistan"
                />
              </div>
              <div className="p-4 flex items-center gap-2 text-sm text-[#6B7280]">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                F-10 Markaz, Blue Area, Islamabad, Pakistan
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-heading mb-5">
                Follow Our Journey
              </h3>
              <div className="space-y-2.5">
                {socialLinks.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 bg-[#0B0F19] border border-[#1F2937] rounded-xl text-[#6B7280] transition-all duration-200 group ${color}`}
                  >
                    <div className="w-9 h-9 bg-[#111827] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#F5F5DC] text-sm group-hover:inherit transition-colors">
                        {label}
                      </p>
                      <p className="text-xs">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Planning CTA */}
            <div className="bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl font-heading mb-2">
                Planning a Trip?
              </h3>
              <p className="text-white/80 text-sm mb-5 leading-relaxed">
                We offer personalized travel advice for exploring Pakistan&apos;s
                hidden corners. Share your dates and interests!
              </p>
              <div className="space-y-2.5 text-sm text-white/80">
                {[
                  "Best time recommendations",
                  "Route planning help",
                  "Accommodation suggestions",
                  "Safety and permit advice",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
