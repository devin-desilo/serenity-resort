import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/app/lib/mongodb";
import { sendBookingRequestToResort, sendGuestConfirmation } from "@/app/lib/email";
import { rooms } from "@/app/data/rooms";

const bookingSchema = z.object({
  roomSlug: z.string().min(1, "Room is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.number().min(1, "At least 1 adult required").max(10),
  children: z.number().min(0).max(10),
  guestName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  specialRequests: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Find room name
    const room = rooms.find((r) => r.slug === data.roomSlug);
    const roomName = room?.name || data.roomSlug;

    // Save to MongoDB if connected
    const db = await dbConnect();
    if (db) {
      const BookingRequest = (await import("@/app/models/BookingRequest")).default;
      await BookingRequest.create({
        ...data,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
      });
    }

    // Send emails (best effort)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendBookingRequestToResort({ ...data, roomName });
        await sendGuestConfirmation({
          guestName: data.guestName,
          email: data.email,
          roomName,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to submit booking request" },
      { status: 500 }
    );
  }
}
