"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
            What Travellers Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mt-2">
            Stories from Our Community
          </h2>
          <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">
            Real experiences from travellers who discovered Pakistan with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-emerald-400/60" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-gray-400 mb-5">
            Join thousands of travellers who have discovered Pakistan&apos;s hidden gems.
          </p>
          <div className="flex items-center justify-center gap-3">
            {/* Avatar Stack */}
            <div className="flex -space-x-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="relative w-9 h-9 rounded-full border-2 border-gray-900 overflow-hidden"
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
            <div className="text-left">
              <div className="text-white font-semibold text-sm">
                10,000+ Happy Travellers
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-gray-400 text-xs ml-1">4.9 avg. rating</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
