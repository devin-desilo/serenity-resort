import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { amenities } from "@/app/data/amenities";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities",
  description: "Explore world-class amenities at Serenity Resort — pools, spa, dining, and more.",
};

type IconName = keyof typeof Icons;
function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = Icons[name as IconName] as React.ComponentType<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}

const categories = Array.from(new Set(amenities.map((a) => a.category)));

export default function AmenitiesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-stone-50 py-16 text-center">
        <AnimatedSection>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Facilities & Services
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
            World-Class Amenities
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Everything you need for a perfect stay, all within the lush grounds of Serenity Resort.
          </p>
        </AnimatedSection>
      </section>

      {/* Amenities by category */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((category) => {
            const items = amenities.filter((a) => a.category === category);
            return (
              <div key={category}>
                <AnimatedSection>
                  <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-teal-400 inline-block" />
                    {category}
                  </h2>
                </AnimatedSection>
                <div className="grid sm:grid-cols-2 gap-5">
                  {items.map((amenity, i) => (
                    <AnimatedSection key={amenity.id} delay={i * 0.07}>
                      <div className="flex items-start gap-4 p-5 rounded-2xl bg-stone-50 hover:bg-teal-50 transition-colors border border-stone-100 hover:border-teal-100 group">
                        <div className="bg-white group-hover:bg-teal-100 border border-stone-200 group-hover:border-teal-200 p-3 rounded-xl transition-colors shrink-0">
                          <DynamicIcon
                            name={amenity.icon}
                            className="w-6 h-6 text-teal-600"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900 mb-1">
                            {amenity.label}
                          </h3>
                          <p className="text-sm text-stone-500 leading-relaxed">
                            {amenity.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
