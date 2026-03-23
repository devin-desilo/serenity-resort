import { BookingFormData } from "@/app/types";

interface GuestConfirmationData {
  guestName: string;
  email: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export async function sendBookingRequestToResort(booking: BookingFormData & { roomName: string }) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const nights = Math.round(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
      (1000 * 3600 * 24)
  );

  await resend.emails.send({
    from: "Serenity Resort <noreply@serenityresort.com>",
    to: process.env.RESORT_EMAIL || "bookings@serenityresort.com",
    subject: `New Booking Request — ${booking.roomName} — ${booking.guestName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
        <div style="background: #0d9488; padding: 24px; color: white;">
          <h1 style="margin: 0; font-size: 22px;">New Booking Request</h1>
          <p style="margin: 4px 0 0; opacity: 0.85;">Serenity Resort Management System</p>
        </div>
        <div style="padding: 24px; background: white;">
          <h2 style="color: #1f2937; font-size: 18px; margin-top: 0;">Room Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280; width: 40%;">Room</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.roomName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Check-in</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${new Date(booking.checkIn).toDateString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Check-out</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${new Date(booking.checkOut).toDateString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Nights</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${nights}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Adults</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.adults}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Children</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.children}</td>
            </tr>
          </table>

          <h2 style="color: #1f2937; font-size: 18px; margin-top: 24px;">Guest Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280; width: 40%;">Name</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.guestName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Email</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">Phone</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.phone}</td>
            </tr>
            ${
              booking.specialRequests
                ? `<tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top;">Special Requests</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${booking.specialRequests}</td>
            </tr>`
                : ""
            }
          </table>
        </div>
        <div style="padding: 16px 24px; background: #f3f4f6; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
          Please contact the guest within 24 hours to confirm availability and payment.
        </div>
      </div>
    `,
  });
}

export async function sendGuestConfirmation(data: GuestConfirmationData) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Serenity Resort <noreply@serenityresort.com>",
    to: data.email,
    subject: "We received your booking request — Serenity Resort",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
        <div style="background: #0d9488; padding: 24px; color: white;">
          <h1 style="margin: 0; font-size: 22px;">Thank You, ${data.guestName}!</h1>
          <p style="margin: 4px 0 0; opacity: 0.85;">Your booking request has been received.</p>
        </div>
        <div style="padding: 24px; background: white;">
          <p style="color: #374151; line-height: 1.6;">
            We have received your booking request for <strong>${data.roomName}</strong> 
            (${new Date(data.checkIn).toDateString()} → ${new Date(data.checkOut).toDateString()}).
          </p>
          <p style="color: #374151; line-height: 1.6;">
            Our reservations team will contact you within <strong>24 hours</strong> to confirm 
            availability and arrange payment. You may also reach us via:
          </p>
          <ul style="color: #374151; line-height: 2;">
            <li>📞 Phone: +1 (800) 555-RESORT</li>
            <li>💬 WhatsApp: +1 (800) 555-RESORT</li>
            <li>📧 Email: reservations@serenityresort.com</li>
          </ul>
          <p style="color: #374151;">We look forward to welcoming you to Serenity Resort!</p>
        </div>
        <div style="padding: 16px 24px; background: #f3f4f6; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
          Serenity Resort | 1 Paradise Bay, Tropical Island | www.serenityresort.com
        </div>
      </div>
    `,
  });
}

export async function sendContactInquiry(data: ContactData) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Serenity Resort <noreply@serenityresort.com>",
    to: process.env.RESORT_EMAIL || "info@serenityresort.com",
    replyTo: data.email,
    subject: `Contact Form Inquiry — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0d9488; padding: 24px; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 20px;">New Contact Inquiry</h1>
        </div>
        <div style="padding: 24px; background: white; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9fafb; padding: 16px; border-radius: 6px; color: #374151; line-height: 1.6;">${data.message}</div>
        </div>
      </div>
    `,
  });
}
