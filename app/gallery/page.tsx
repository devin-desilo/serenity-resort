import Image from "next/image";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore our photo gallery — rooms, grounds, dining, and resort experiences at Serenity Resort.",
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    alt: "Aerial resort view",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    alt: "Infinity pool",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    alt: "Overwater bungalow",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Deluxe room",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    alt: "Family villa exterior",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    alt: "Private pool villa",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    alt: "Spa treatment",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Fine dining",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&q=80",
    alt: "Tropical beach",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&q=80",
    alt: "Sunset view from bungalow",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    alt: "Ocean suite view",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1552858725-2758b5fb1286?w=600&q=80",
    alt: "Garden walkway",
    span: "",
  },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-stone-50 py-16 text-center">
        <AnimatedSection>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Photo Gallery
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
            A Glimpse of Serenity
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            From sun-drenched infinity pools to candle-lit dining under the
            stars — see what awaits you.
          </p>
        </AnimatedSection>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((img, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.04}
                className={`relative rounded-2xl overflow-hidden group ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
                  {img.alt}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
