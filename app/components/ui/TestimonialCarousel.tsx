"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/app/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-md border border-stone-100 p-8 md:p-10 text-center"
        >
          <Quote className="w-10 h-10 text-teal-200 mx-auto mb-4" />
          <p className="text-stone-600 text-lg leading-relaxed italic mb-6">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonials[current].rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-stone-200"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-stone-900 text-sm">
                {testimonials[current].name}
              </div>
              <div className="text-xs text-stone-400">
                {testimonials[current].location}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white border border-stone-200 text-stone-600 hover:text-teal-600 rounded-full p-2 shadow-sm hidden md:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white border border-stone-200 text-stone-600 hover:text-teal-600 rounded-full p-2 shadow-sm hidden md:flex"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-teal-600 w-6 h-2" : "bg-stone-300 w-2 h-2"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
