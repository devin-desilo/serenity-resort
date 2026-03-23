"use client";

import { useState } from "react";
import { rooms } from "@/app/data/rooms";
import RoomCard from "@/app/components/ui/RoomCard";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { Room } from "@/app/types";

const roomTypes = ["All", "Deluxe", "Suite", "Villa", "Bungalow"];

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered: Room[] =
    activeFilter === "All"
      ? rooms
      : rooms.filter((r) => r.type === activeFilter);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-14 bg-stone-50 text-center">
        <AnimatedSection>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Accommodations
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
            Our Rooms & Villas
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto text-base leading-relaxed">
            Choose from our handcrafted collection of rooms, suites, and private
            villas — each a sanctuary thoughtfully designed for your perfect
            escape.
          </p>
        </AnimatedSection>
      </section>

      {/* Filter */}
      <section className="bg-white border-b border-stone-100 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto">
          {roomTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === type
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-stone-400 text-center py-20">
              No rooms found for this filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
