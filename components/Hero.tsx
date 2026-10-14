import {
  Play,
  HandHeart,
  ArrowRight,
  Clock3,
  BookOpen,
  MapPin,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/gafcbanner.jpeg')",
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#151512]/75" />

      {/* Subtle warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 text-center sm:px-6 lg:px-8">
 
      </div>
    </section>
  );
}