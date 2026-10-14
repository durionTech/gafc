"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, ChevronUp } from "lucide-react";

export default function FloatingWidgets() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DO NOT RENDER ON PASTOR PORTAL / ADMIN PAGES
  if (pathname.startsWith("/pastor-portal") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* 1. RIGHT SIDE VERTICAL PRAYER REQUEST TAB */}
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end shadow-2xl">
        {/* Top Accent Bar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-tl-md bg-[#5c1319] text-white">
          <span className="text-xs">➔</span>
        </div>

        {/* Vertical Prayer Request Button */}
        <Link
          href="/prayer-request"
          className="flex items-center gap-2 rounded-bl-md bg-[#faf3e0] px-2.5 py-4 text-xs font-bold uppercase tracking-wider text-[#4a3f35] border-l border-b border-[#d4af37]/40 shadow-lg transition hover:bg-[#8b1e1e] hover:text-white group [writing-mode:vertical-rl] rotate-180"
        >
          <Mail size={14} className="text-[#8b1e1e] group-hover:text-white rotate-90" />
          <span>Prayer Request</span>
        </Link>
      </div>

      {/* 2. RED BACK-TO-TOP ARROW BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-lg bg-[#8b1e1e] text-white shadow-xl transition hover:bg-[#6e1818] hover:scale-110 active:scale-95 border border-[#d4af37]/30"
        >
          <ChevronUp size={22} className="stroke-[3]" />
        </button>
      )}
    </>
  );
}