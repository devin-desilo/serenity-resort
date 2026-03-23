import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/app/data/rooms";
import { testimonials } from "@/app/data/testimonials";
import { amenities } from "@/app/data/amenities";
import RoomCard from "@/app/components/ui/RoomCard";
import TestimonialCarousel from "@/app/components/ui/TestimonialCarousel";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { ArrowRight, Star, MapPin, ChevronRight, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serenity Resort — A Paradise Escape",
  description:
    "Discover luxury tropical accommodations, world-class dining, and unforgettable experiences at Serenity Resort.",
};

type IconName = keyof typeof Icons;
function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = Icons[name as IconName] as React.ComponentType<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}

const featuredRooms = rooms.filter((r) => r.featured).slice(0, 3);
const featuredAmenities = amenities.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=85"
          alt="Serenity Resort aerial view"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Paradise Bay, Tropical Island
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            Where Luxury Meets
            <span className="block text-teal-300">Paradise</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-xl mx-auto mb-10 leading-relaxed">
            Immerse yourself in our tropical sanctuary — private villas, infinity
            pools, and personalized service that elevates every moment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/rooms"
              className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Explore Rooms <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs animate-bounce">
          <span>Scroll</span>
          <div className="w-0.5 h-8 bg-white/40 rounded-full" />
        </div>
      </section>

      {/* ====== STATS STRIP ====== */}
      <section className="bg-teal-600 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "4.9", label: "Guest Rating", icon: "Star" },
            { value: "500+", label: "Rooms Booked", icon: "Calendar" },
            { value: "12+", label: "Amenities", icon: "Sparkles" },
            { value: "24/7", label: "Concierge", icon: "Bell" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <DynamicIcon name={stat.icon} className="w-5 h-5 mb-1 opacity-80" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-white/75 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== FEATURED ROOMS ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Accommodations
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
              Curated Spaces for Every Stay
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-base leading-relaxed">
              From garden retreats to overwater bungalows, each room is designed
              with your comfort and joy in mind.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
            >
              View All Rooms <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== ABOUT STRIP ====== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left" className="relative">
            <div className="relative h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80"
                alt="Resort pool area"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-teal-600 text-white rounded-2xl p-5 shadow-xl w-44">
              <div className="text-3xl font-extrabold">15+</div>
              <div className="text-sm opacity-80 mt-1">Years of Excellence</div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.15}>
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-5 leading-tight">
              A Legacy of Warm Hospitality & Natural Beauty
            </h2>
            <p className="text-stone-500 leading-relaxed mb-5">
              Founded in 2009, Serenity Resort has welcomed guests from over 80
              countries who seek an escape from the ordinary. Nestled along a
              private bay, we blend the island&apos;s natural wonders with
              thoughtfully designed spaces and heartfelt service.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              Our philosophy is simple: every guest deserves to feel like they
              are the only one here. From the first welcome drink to the last
              goodbye, we craft moments that linger long after check-out.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <span className="text-sm text-stone-500">
                Rated 4.9/5 by 1,200+ guests
              </span>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              Learn more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== AMENITIES ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Facilities & Services
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
              Everything You Need, All in One Place
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredAmenities.map((amenity, i) => (
              <AnimatedSection key={amenity.id} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-stone-50 hover:bg-teal-50 transition-colors group border border-transparent hover:border-teal-100">
                  <div className="bg-teal-100 group-hover:bg-teal-200 p-3 rounded-xl transition-colors shrink-0">
                    <DynamicIcon
                      name={amenity.icon}
                      className="w-5 h-5 text-teal-700"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-sm mb-1">
                      {amenity.label}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10 text-center">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-800 border border-teal-200 hover:bg-teal-50 px-6 py-3 rounded-full transition-all"
            >
              View All Amenities <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Guest Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
              What Our Guests Say
            </h2>
          </AnimatedSection>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540541338537-72aa3b4d4b6a?w=1600&q=80"
          alt="Resort bungalow"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/75" />
        <AnimatedSection className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <Sparkles className="w-10 h-10 text-teal-300 mx-auto mb-5" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Ready for Your Dream Escape?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Submit a booking request today. Our team will confirm via
            phone or email within 24 hours.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-teal-900 font-bold px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-xl"
          >
            Request a Booking <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
