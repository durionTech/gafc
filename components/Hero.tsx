"use client";

import Link from "next/link";
import {
  Play,
  HandHeart,
  ArrowRight,
  Clock3,
  BookOpen,
  MapPin,
} from "lucide-react";

const embers = [
  { left: "15%", delay: "0s", duration: "4.5s", size: "h-1.5 w-1.5" },
  { left: "30%", delay: "1.2s", duration: "5.2s", size: "h-2 w-2" },
  { left: "45%", delay: "0.6s", duration: "4.0s", size: "h-1 w-1" },
  { left: "60%", delay: "2.1s", duration: "5.8s", size: "h-2 w-2" },
  { left: "75%", delay: "0.9s", duration: "4.3s", size: "h-1.5 w-1.5" },
  { left: "88%", delay: "1.8s", duration: "5.0s", size: "h-2 w-2" },
];

export default function Hero() {
  return (
    <section className="relative flex h-[460px] sm:h-[520px] lg:h-[580px] w-full items-center justify-center overflow-hidden bg-[#0d0907]">
      {/* CUSTOM KEYFRAMES FOR FIRE GROWING & RISING EMBERS */}
      <style jsx>{`
        @keyframes firePulse {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(0.95) contrast(1.05);
          }
          50% {
            transform: scale(1.03);
            filter: brightness(1.15) contrast(1.1);
          }
        }

        @keyframes flameAura {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.08);
          }
        }

        @keyframes riseEmber {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-350px) scale(0.3);
            opacity: 0;
          }
        }

        .animate-fire-image {
          animation: firePulse 4.5s ease-in-out infinite;
        }

        .animate-flame-aura {
          animation: flameAura 3.5s ease-in-out infinite;
        }

        .animate-ember {
          animation: riseEmber linear infinite;
        }
      `}</style>

      {/* CONTROLLED IMAGE WRAPPER TO PREVENT OVER-STRETCHING ON DESKTOP */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <img
          src="/images/heroimage.jpeg"
          alt="Grace Apostolic Faith Church Trust"
          className="animate-fire-image max-h-full max-w-5xl w-full h-full object-contain object-center"
        />
      </div>

      {/* GROWING FIRE RADIAL GLOW BEHIND SHIELD */}
      <div
        className="animate-flame-aura pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 115, 0, 0.28) 0%, rgba(185, 28, 28, 0.18) 40%, rgba(13, 9, 7, 0.9) 80%)",
        }}
      />

      {/* SUBTLE DARK VIGNETTE FOR TEXT READABILITY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70" />

      {/* FLOATING FIRE EMBERS / SPARKS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {embers.map((ember, idx) => (
          <span
            key={idx}
            style={{
              left: ember.left,
              bottom: "-10px",
              animationDelay: ember.delay,
              animationDuration: ember.duration,
            }}
            className={`animate-ember absolute rounded-full bg-gradient-to-t from-[#ff4500] to-[#ffd166] shadow-[0_0_8px_#ff7b00] ${ember.size}`}
          />
        ))}
      </div>

      {/* FOREGROUND CONTENT AREA */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        {/* Optional foreground content / CTA buttons */}
      </div>
    </section>
  );
}