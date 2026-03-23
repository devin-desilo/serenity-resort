import mongoose, { Schema, Document, models } from "mongoose";

export interface IBookingRequest extends Document {
  guestName: string;
  email: string;
  phone: string;
  roomSlug: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const BookingRequestSchema = new Schema<IBookingRequest>(
  {
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    roomSlug: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BookingRequest =
  models.BookingRequest ||
  mongoose.model<IBookingRequest>("BookingRequest", BookingRequestSchema);

export default BookingRequest;
