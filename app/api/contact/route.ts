import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/app/lib/mongodb";
import { sendContactInquiry } from "@/app/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Save to MongoDB if connected
    const db = await dbConnect();
    if (db) {
      const Inquiry = (await import("@/app/models/Inquiry")).default;
      await Inquiry.create(data);
    }

    // Send email
    if (process.env.RESEND_API_KEY) {
      try {
        await sendContactInquiry(data);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
