"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Share2, AtSign, Rss, Video, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@hiddenpak.com",
    sub: "We reply within 24 hours",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    sub: "Mon – Sat, 9am to 6pm",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Islamabad, Pakistan",
    sub: "F-10 Markaz, Blue Area",
    color: "bg-orange-100 text-orange-600",
  },
];

const socialLinks = [
  { icon: Share2, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
  { icon: AtSign, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
  { icon: Rss, label: "Twitter / X", href: "#", color: "hover:bg-gray-800" },
  { icon: Video, label: "YouTube", href: "#", color: "hover:bg-red-600" },
  { icon: MessageCircle, label: "WhatsApp", href: "#", color: "hover:bg-green-600" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Have a question, a travel story to share, or want to collaborate?
              We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-soft p-6 text-center"
            >
              <div
                className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 font-heading mb-1">
                {info.label}
              </h3>
              <p className="font-semibold text-gray-700 mb-1">{info.value}</p>
              <p className="text-sm text-gray-500">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-gray-900 font-heading mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 mb-8">
                Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Ahmed Khan"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="ahmed@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors text-gray-700">
                    <option value="">Select a topic...</option>
                    <option>Travel Inquiry</option>
                    <option>Blog Submission</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your travel plans, questions, or how you'd like to collaborate..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center gap-2 py-4"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-5">
                Follow Our Journey
              </h3>
              <div className="space-y-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 ${color} hover:text-white transition-all duration-200 group`}
                  >
                    <div className="w-9 h-9 bg-white group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-sm text-gray-700 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg font-heading mb-3">
                Planning a Trip?
              </h3>
              <p className="text-emerald-100 text-sm mb-5">
                We offer personalized travel advice for exploring Pakistan&apos;s
                hidden corners. Share your dates and interests!
              </p>
              <div className="space-y-2 text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                  Best time recommendations
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                  Route planning help
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                  Accommodation suggestions
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
                  Safety and permit advice
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
