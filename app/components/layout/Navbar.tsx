"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palmtree } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg =
    isHomePage && !isScrolled
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100";

  const textColor =
    isHomePage && !isScrolled ? "text-white" : "text-stone-800";

  const logoColor =
    isHomePage && !isScrolled ? "text-white" : "text-teal-700";

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Palmtree
              className={clsx("w-7 h-7 transition-colors duration-300", logoColor)}
            />
            <span
              className={clsx(
                "font-bold text-xl tracking-tight transition-colors duration-300",
                logoColor
              )}
            >
              Serenity Resort
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors duration-200 hover:text-teal-400",
                  textColor,
                  pathname === link.href && "text-teal-400"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="ml-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={clsx("md:hidden p-2 rounded-lg", textColor)}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "px-4 py-3 rounded-lg text-stone-700 font-medium text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors",
                  pathname === link.href && "bg-teal-50 text-teal-700"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-teal-600 text-white text-center font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
