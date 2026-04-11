"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

const featured = testimonials.slice(0, 3);

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest">
            What Travelers Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-3">
            Stories from Our Community
          </h2>
          <p className="text-[#F5F5DC]/60 text-base mt-3 max-w-2xl mx-auto">
            Real experiences from travellers who discovered Pakistan&apos;s
            hidden gems with us.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#0B0F19] border border-[#1F2937] rounded-2xl p-6 flex flex-col gap-5 hover:border-[#F97316]/30 transition-all duration-300 shadow-card"
            >
              {/* Quote Icon */}
              <Quote className="w-7 h-7 text-[#F97316]/50" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[#F5F5DC]/70 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[#1F2937]">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#1F2937]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14"
        >
          {/* Avatar Stack */}
          <div className="flex -space-x-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative w-10 h-10 rounded-full border-2 border-[#111827] overflow-hidden"
              >
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-semibold text-sm">
              10,000+ Happy Travelers
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-gray-500 text-xs ml-1">4.9 avg. rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
