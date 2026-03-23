"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { rooms } from "@/app/data/rooms";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { Info, Send } from "lucide-react";

// Use string-based dates to avoid Zod v4 Date constructor issue
const schema = z
  .object({
    roomSlug: z.string().min(1, "Please select a room"),
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    adults: z.number().min(1, "At least 1 adult required").max(10),
    children: z.number().min(0).max(10),
    guestName: z.string().min(2, "Full name is required"),
    email: z.string().email("Valid email address is required"),
    phone: z.string().min(7, "Valid phone number is required"),
    specialRequests: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true;
      return new Date(data.checkOut) > new Date(data.checkIn);
    },
    {
      message: "Check-out must be after check-in",
      path: ["checkOut"],
    }
  );

type BookingFormValues = z.infer<typeof schema>;

// Today's date in YYYY-MM-DD format
function today() {
  return new Date().toISOString().split("T")[0];
}
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function BookingFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomSlug: preselectedRoom,
      adults: 1,
      children: 0,
      checkIn: "",
      checkOut: "",
    },
  });

  useEffect(() => {
    if (preselectedRoom) setValue("roomSlug", preselectedRoom);
  }, [preselectedRoom, setValue]);

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/book/success");
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";
  const errorClass = "text-xs text-red-500 mt-1";
  const labelClass = "block text-xs font-semibold text-stone-600 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Info notice */}
      <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl p-4 text-teal-800">
        <Info className="w-5 h-5 mt-0.5 shrink-0 text-teal-600" />
        <p className="text-sm leading-relaxed">
          <strong>Booking Request Only — No Payment Required.</strong> Our team
          will contact you within 24 hours to confirm availability and arrange
          payment via phone, email, or WhatsApp.
        </p>
      </div>

      {/* Room selector */}
      <div>
        <label className={labelClass}>Room Type *</label>
        <select {...register("roomSlug")} className={inputClass}>
          <option value="">Select a room...</option>
          {rooms.map((room) => (
            <option key={room.slug} value={room.slug}>
              {room.name} — ${room.price}/night
            </option>
          ))}
        </select>
        {errors.roomSlug && (
          <p className={errorClass}>{errors.roomSlug.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Check-in Date *</label>
          <input
            type="date"
            {...register("checkIn")}
            min={today()}
            className={inputClass}
          />
          {errors.checkIn && (
            <p className={errorClass}>{errors.checkIn.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Check-out Date *</label>
          <input
            type="date"
            {...register("checkOut")}
            min={tomorrow()}
            className={inputClass}
          />
          {errors.checkOut && (
            <p className={errorClass}>{errors.checkOut.message}</p>
          )}
        </div>
      </div>

      {/* Guests */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Adults *</label>
          <input
            type="number"
            min={1}
            max={10}
            {...register("adults", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.adults && (
            <p className={errorClass}>{errors.adults.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Children</label>
          <input
            type="number"
            min={0}
            max={10}
            {...register("children", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Guest details */}
      <div className="border-t border-stone-100 pt-6">
        <h3 className="text-stone-800 font-semibold text-base mb-5">
          Your Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              {...register("guestName")}
              placeholder="Your full name"
              className={inputClass}
            />
            {errors.guestName && (
              <p className={errorClass}>{errors.guestName.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={inputClass}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Phone / WhatsApp *</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+1 234 567 890"
                className={inputClass}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className={labelClass}>Special Requests</label>
            <textarea
              {...register("specialRequests")}
              rows={3}
              placeholder="Dietary requirements, special occasions, accessibility needs..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-base transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending Request...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Booking Request
          </>
        )}
      </button>
    </form>
  );
}

export default function BookPage() {
  return (
    <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-10">
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Book Your Stay
          </p>
          <h1 className="text-4xl font-extrabold text-stone-900 mb-3">
            Request a Reservation
          </h1>
          <p className="text-stone-500 max-w-md mx-auto">
            Fill in your details and our team will reach out within 24 hours to
            confirm your stay.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 md:p-8">
            <Suspense
              fallback={
                <div className="text-center text-stone-400 py-8">
                  Loading form...
                </div>
              }
            >
              <BookingFormInner />
            </Suspense>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
