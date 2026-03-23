import Link from "next/link";
import { CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Request Sent",
};

export default function BookSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-20 pb-12 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-50 p-4 rounded-full">
              <CheckCircle className="w-14 h-14 text-teal-500" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 mb-3">
            Request Sent!
          </h1>
          <p className="text-stone-500 leading-relaxed mb-2">
            Thank you for your booking request. We&apos;ve received your details
            and will get back to you shortly.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            Our team will contact you within{" "}
            <strong className="text-stone-700">24 hours</strong> to confirm
            availability and arrange payment. No charge has been made at this
            time.
          </p>

          <div className="bg-stone-50 rounded-2xl p-5 mb-8 text-left space-y-3">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
              Need to reach us sooner?
            </p>
            <a
              href="tel:+18005557376"
              className="flex items-center gap-3 text-sm text-stone-700 hover:text-teal-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-500" />
              +1 (800) 555-RESORT
            </a>
            <a
              href="mailto:reservations@serenityresort.com"
              className="flex items-center gap-3 text-sm text-stone-700 hover:text-teal-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-500" />
              reservations@serenityresort.com
            </a>
            <a
              href="https://wa.me/18005557376"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-stone-700 hover:text-teal-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-teal-500" />
              WhatsApp
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="flex-1 text-center border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
