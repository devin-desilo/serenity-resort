"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Maximize2 } from "lucide-react";
import { Room } from "@/app/types";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

type IconName = keyof typeof Icons;

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = Icons[name as IconName] as React.ComponentType<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}

interface RoomCardProps {
  room: Room;
  index?: number;
}

export default function RoomCard({ room, index = 0 }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
            {room.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            ${room.price}<span className="font-normal text-xs opacity-80">/night</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-900 mb-1">{room.name}</h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {room.shortDescription}
        </p>

        {/* Info row */}
        <div className="flex items-center gap-4 mb-4 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Up to {room.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {room.size} sq ft
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            5.0
          </span>
        </div>

        {/* Amenity icons */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity.label}
              className="flex items-center gap-1 bg-stone-50 text-stone-600 text-xs px-2.5 py-1 rounded-full border border-stone-200"
            >
              <DynamicIcon name={amenity.icon} className="w-3 h-3 text-teal-600" />
              {amenity.label}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-xs text-stone-400 px-2 py-1">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/rooms/${room.slug}`}
            className="flex-1 text-center text-sm font-medium text-teal-700 border border-teal-200 hover:bg-teal-50 px-4 py-2.5 rounded-xl transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/book?room=${room.slug}`}
            className="flex-1 text-center text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
