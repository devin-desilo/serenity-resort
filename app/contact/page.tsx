"use client";

import { useState } from "react";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";
  const labelClass = "block text-xs font-semibold text-stone-600 mb-1.5";

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-stone-50 py-16 text-center">
        <AnimatedSection>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
            We&apos;d Love to Hear from You
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            Whether you have a question, need help planning your stay, or just
            want to say hello — we&apos;re here.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <AnimatedSection direction="left">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-teal-50 p-3 rounded-xl">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Address</p>
                  <p className="text-stone-500 text-sm mt-1">
                    1 Paradise Bay, Tropical Island
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-teal-50 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Phone</p>
                  <a
                    href="tel:+18005557376"
                    className="text-teal-600 hover:text-teal-800 text-sm mt-1 block transition-colors"
                  >
                    +1 (800) 555-RESORT
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-teal-50 p-3 rounded-xl">
                  <Mail className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Email</p>
                  <a
                    href="mailto:info@serenityresort.com"
                    className="text-teal-600 hover:text-teal-800 text-sm mt-1 block transition-colors"
                  >
                    info@serenityresort.com
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/18005557376"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuMiJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Serenity Resort Map"
              />
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="bg-stone-50 rounded-3xl p-7 md:p-8 border border-stone-100">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">
                Send a Message
              </h2>

              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-bold text-stone-800 mb-2">Message Sent!</h3>
                  <p className="text-stone-500 text-sm">
                    Thanks for reaching out. We&apos;ll reply within 1 business day.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-teal-600 text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className={inputClass}
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
