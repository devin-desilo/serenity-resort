import Image from "next/image";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { MapPin, Heart, Leaf } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the story, mission, and team behind Serenity Resort.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-stone-50 py-16 text-center">
        <AnimatedSection>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
            About Serenity Resort
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto text-base leading-relaxed">
            A legacy of warmth, natural beauty, and genuine hospitality since 2009.
          </p>
        </AnimatedSection>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left">
            <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80"
                alt="Resort story"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.15}>
            <h2 className="text-3xl font-extrabold text-stone-900 mb-5">
              Born from a Love of the Island
            </h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              In 2009, founders Marco and Elina Reyes fell in love with a
              forgotten bay on the southern coast of the island. They saw
              potential where others saw wilderness — and built Serenity Resort
              from the ground up, stone by stone, with the help of local
              craftsmen.
            </p>
            <p className="text-stone-500 leading-relaxed mb-4">
              Today, Serenity Resort stands as a testament to their vision: a
              place where nature and luxury exist in harmony, where every path
              through the tropical gardens leads to something beautiful, and
              where every guest feels truly at home.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              We are proud to have been the backdrop for thousands of
              honeymoons, anniversaries, family vacations, and solo escapes —
              each one unique, each one cherished.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: "15+", label: "Years Experience" },
                { n: "80+", label: "Countries Welcomed" },
                { n: "4.9★", label: "Average Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center bg-stone-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-teal-700">{s.n}</div>
                  <div className="text-xs text-stone-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-stone-900 mb-4">
              Our Mission & Values
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Guest-First Always",
                desc: "Every decision we make starts with one question: how will it make our guests feel? Genuine warmth is our north star.",
              },
              {
                icon: Leaf,
                title: "Sustainable Luxury",
                desc: "We minimize our footprint through solar energy, organic gardens, plastic-free operations, and supporting local communities.",
              },
              {
                icon: MapPin,
                title: "Rooted in the Island",
                desc: "We champion local artisans, chefs, and guides who bring authentic island culture to every part of your stay.",
              },
            ].map((v) => (
              <AnimatedSection key={v.title}>
                <div className="bg-white rounded-2xl p-7 h-full border border-stone-100 shadow-sm text-center">
                  <div className="bg-teal-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">{v.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-stone-900 mb-3">
              Find Us
            </h2>
            <p className="text-stone-500">
              1 Paradise Bay, Tropical Island
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-100 h-72 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuMiJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Serenity Resort Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
