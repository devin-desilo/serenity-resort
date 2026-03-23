import { notFound } from "next/navigation";
import Link from "next/link";
import { rooms } from "@/app/data/rooms";
import ImageGallery from "@/app/components/ui/ImageGallery";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { Users, Maximize2, BedDouble, Check, ArrowLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import type { Metadata } from "next";

type IconName = keyof typeof Icons;
function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = Icons[name as IconName] as React.ComponentType<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) notFound();

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Rooms
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <AnimatedSection direction="left">
            <ImageGallery images={room.images} alt={room.name} />
          </AnimatedSection>

          {/* Right: Details */}
          <AnimatedSection direction="right" delay={0.1}>
            <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {room.type}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-3">
              {room.name}
            </h1>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-500" />
                Up to {room.maxGuests} guests
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-teal-500" />
                {room.size} sq ft
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-teal-500" />
                {room.bedType}
              </span>
            </div>

            {/* Price */}
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-teal-700">
                  ${room.price}
                </span>
                <span className="text-stone-400 text-sm mb-1.5">/night</span>
              </div>
              <p className="text-teal-600 text-xs">
                All rates are per night. Final price confirmed at booking.
              </p>
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-6">
              {room.description}
            </p>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="font-semibold text-stone-800 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity.label}
                    className="flex items-center gap-1.5 text-xs bg-stone-50 border border-stone-200 text-stone-600 px-3 py-1.5 rounded-full"
                  >
                    <DynamicIcon
                      name={amenity.icon}
                      className="w-3.5 h-3.5 text-teal-600"
                    />
                    {amenity.label}
                  </span>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="mb-8 bg-stone-50 rounded-xl p-4">
              <h3 className="font-semibold text-stone-800 mb-3 text-sm">
                House Rules
              </h3>
              <ul className="space-y-2">
                {room.houseRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Link
                href={`/book?room=${room.slug}`}
                className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl transition-colors text-lg shadow-sm hover:shadow-md"
              >
                Request to Book This Room
              </Link>
              <p className="text-center text-xs text-stone-400">
                This is a booking request. Our team will contact you within 24
                hours to confirm availability and payment.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
