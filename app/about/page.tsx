"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Cross,
  BookOpen,
  Users,
  Church,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const openingImages = [
  {
    src: "/images/church-opening-1.jpg",
    alt: "Church Opening Ribbon Cutting by Pastor Thomas Devanandan",
    caption: "Church Inauguration",
  },
  {
    src: "/images/church-opening.jpg",
    alt: "Dedication Prayer Service",
    caption: "Dedication Prayer",
  },
  {
    src: "/images/church-opening-3.jpg",
    alt: "Congregation Gathering on Opening Day",
    caption: "Opening Day Fellowship",
  },
];
export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? openingImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === openingImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide(); // Swipe left -> next
    if (diff < -40) prevSlide(); // Swipe right -> prev
    setTouchStartX(null);
  };
  return (
    
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />
      {/* FIRST SECTION: TAMIL PROMISE SCRIPTURE BANNER */}
      <section className="border-b border-[#d4af37]/30 bg-white px-6 py-12 shadow-2xs">
        <div className="mx-auto max-w-4xl rounded-2xl border-l-4 border-[#8b1e1e] bg-[#faf8f2] p-6 md:p-10">
          <blockquote className="text-lg font-bold leading-relaxed text-[#151512] md:text-2xl">
            &ldquo;நான் உங்களைக் கீர்த்தியும் புகழ்ச்சியுமாக வைப்பேன் என்று கர்த்தர் சொல்லுகிறார்.&rdquo;
          </blockquote>
          <p className="mt-4 text-right text-sm font-bold tracking-wide text-[#8b1e1e] md:text-base">
            — செப்பனியா 3:20
          </p>
        </div>
      </section> 
      {/* NEXT SEC 1: OUR LEADERSHIP & PASTORS (LEFT CONTENT, RIGHT PIC) */}
      <section className="border-y border-black/5 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8b1e1e]">
              Spiritual Leadership
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
              Our Founder & Pastors
            </h2>
          </div>

          <div className="space-y-16">
            {/* 1. FOUNDER: REV. JEEVANATHAN */}
            <div className="grid items-center gap-10 rounded-3xl border border-[#d4af37]/30 bg-[#faf8f2] p-6 md:grid-cols-12 md:p-10 shadow-xs">
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block rounded-full bg-[#8b1e1e]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Founder
                </span>
                <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
                  Rev. Jeevanathan
                </h3>
                <p className="leading-8 text-gray-600">
                  With an unwavering vision and deep devotion to God&apos;s calling,
                  Rev. Jeevanathan laid the spiritual foundation of Grace Apostolic
                  Faith Church Trust. His faithful prayer life, sacrificial leadership,
                  and burden for souls have touched countless families and built a
                  thriving Christ-centered fellowship.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="aspect-[4/4] w-full overflow-hidden rounded-2xl border-4 border-white bg-[#151512] shadow-lg">
                  <img
                    src="/images/founder-jeevanathan.jpg"
                    alt="Rev. Jeevanathan - Founder"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2. PASTOR HEPZY */}
            <div className="grid items-center gap-10 rounded-3xl border border-[#d4af37]/30 bg-[#faf8f2] p-6 md:grid-cols-12 md:p-10 shadow-xs">
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block rounded-full bg-[#8b1e1e]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Pastor
                </span>
                <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
                  Pastor Hepzy
                </h3>
                <p className="leading-8 text-gray-600">
                  Pastor Hepzy serves wholeheartedly alongside the ministry,
                  encouraging women, families, and youth through fervent intercession,
                  compassionate pastoral care, and steadfast dedication to nurturing
                  spiritual growth across the congregation.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="aspect-[4/4] w-full overflow-hidden rounded-2xl border-4 border-white bg-[#151512] shadow-lg">
                  <img
                    src="/images/pastor-hepzy.jpg"
                    alt="Pastor Hepzy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 3. REV. SAMUEL ISSAC NEWTON */}
            <div className="grid items-center gap-10 rounded-3xl border border-[#d4af37]/30 bg-[#faf8f2] p-6 md:grid-cols-12 md:p-10 shadow-xs">
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block rounded-full bg-[#8b1e1e]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Pastor
                </span>
                <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
                  Rev. Samuel Issac Newton
                </h3>
                <p className="leading-8 text-gray-600">
                  Rev. Samuel Issac Newton leads the congregation with dynamic,
                  Scripture-centered teaching and pastoral guidance. He is passionate
                  about equipping believers to walk in faith, strengthening families
                  in the Word, and advancing the Gospel in the community.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="aspect-[4/4] w-full overflow-hidden rounded-2xl border-4 border-white bg-[#151512] shadow-lg">
                  <img
                    src="/images/pastor-samuel.jpg"
                    alt="Rev. Samuel Issac Newton"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* NEXT SEC 2: CHURCH OPENING & DEDICATION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-white shadow-md">
          <div className="grid md:grid-cols-12">
            {/* SWIPEABLE DEDICATION PHOTO CAROUSEL */}
            <div
              className="group relative min-h-[340px] overflow-hidden bg-[#151512] md:col-span-5 select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* SLIDER TRACK */}
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {openingImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full min-h-[340px] w-full shrink-0"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-10">
                      <p className="text-xs font-medium text-white/90">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* LEFT / RIGHT ARROWS */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs transition hover:bg-[#8b1e1e] md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs transition hover:bg-[#8b1e1e] md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>

              {/* DOT INDICATORS */}
              <div className="absolute bottom-3.5 right-4 flex items-center gap-1.5">
                {openingImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx
                        ? "w-5 bg-[#d4af37]"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* DEDICATION INFO */}
            <div className="flex flex-col justify-center p-8 md:col-span-7 md:p-12">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#d4af37]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                <Award size={14} /> Church Opening & Dedication
              </div>

              <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
                Inaugurated & Blessed By
              </h2>

              <div className="mt-6 rounded-2xl border border-black/5 bg-[#faf8f2] p-6">
                <h3 className="font-[var(--font-playfair)] text-xl font-bold text-[#8b1e1e]">
                  Pastor Thomas Devanandan
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#151512]">
                  Head Pastor - Founder
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Apostolic Faith Church
                </p>

                <div className="mt-4 flex items-start gap-2 border-t border-black/10 pt-4 text-sm text-gray-600">
                  <MapPin size={16} className="mt-1 shrink-0 text-[#8b1e1e]" />
                  <span>
                    No.1, Church Road, Mugappair, Chennai - 600037.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAITH HOPE LOVE */}
      <section className="bg-[#151512] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            Our Foundation
          </p>

          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
            Faith, Hope & Love
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">
            These values shape who we are as a church and how we
            live out our calling every day.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* FAITH */}
            <div className="rounded-2xl border border-[#d4af37]/20 bg-white/5 p-8 text-left transition hover:-translate-y-1 hover:border-[#d4af37]/60">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/15">
                <Cross className="text-[#d4af37]" size={28} />
              </div>

              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-white">
                Faith
              </h3>

              <p className="mt-4 leading-7 text-white/60">
                Trusting God and building our lives upon His Word,
                promises, and faithfulness.
              </p>
            </div>

            {/* HOPE */}
            <div className="rounded-2xl border border-[#d4af37]/20 bg-white/5 p-8 text-left transition hover:-translate-y-1 hover:border-[#d4af37]/60">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/15">
                <Sparkles className="text-[#d4af37]" size={28} />
              </div>

              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-white">
                Hope
              </h3>

              <p className="mt-4 leading-7 text-white/60">
                Finding strength and confidence in God, even during
                difficult seasons of life.
              </p>
            </div>

            {/* LOVE */}
            <div className="rounded-2xl border border-[#d4af37]/20 bg-white/5 p-8 text-left transition hover:-translate-y-1 hover:border-[#d4af37]/60">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/15">
                <Heart className="text-[#d4af37]" size={28} />
              </div>

              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-white">
                Love
              </h3>

              <p className="mt-4 leading-7 text-white/60">
                Showing Christ&apos;s love through fellowship, compassion,
                kindness, forgiveness, and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VISION & MISSION */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* VISION */}
          <div className="rounded-3xl border border-[#d4af37]/30 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#8b1e1e]/10">
              <Church className="text-[#8b1e1e]" size={28} />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Our Vision
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold">
              To Be a Light
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              To build a Christ-centered community where people encounter
              God, grow spiritually, discover their purpose, and become
              a blessing to others.
            </p>
          </div>

          {/* MISSION */}
          <div className="rounded-3xl bg-[#8b1e1e] p-8 text-white shadow-sm md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <BookOpen className="text-[#d4af37]" size={28} />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              Our Mission
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold">
              Growing & Serving Together
            </h2>

            <p className="mt-5 leading-8 text-white/75">
              To proclaim the Gospel, teach God&apos;s Word, encourage believers,
              strengthen families, serve people in need, and make disciples
              who reflect Christ in their daily lives.
            </p>
          </div>
        </div>
      </section>

      {/* CHURCH LIFE */}
      <section className="bg-[#f1eee5] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b1e1e]">
            Church Life
          </p>

          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
            Growing Together in Christ
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Cross,
                title: "Worship",
                text: "Gathering together to worship and glorify God.",
              },
              {
                icon: BookOpen,
                title: "The Word",
                text: "Learning and applying God's Word in our lives.",
              },
              {
                icon: Heart,
                title: "Prayer",
                text: "Seeking God together through prayer and faith.",
              },
              {
                icon: Users,
                title: "Fellowship",
                text: "Building meaningful relationships as one family.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-7 shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#151512]">
                    <Icon className="text-[#d4af37]" size={25} />
                  </div>
                  <h3 className="mt-5 font-[var(--font-playfair)] text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#151512] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Heart className="mx-auto text-[#d4af37]" size={42} />

          <h2 className="mt-6 font-[var(--font-playfair)] text-3xl font-bold text-white md:text-5xl">
            You Are Welcome Here
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">
            Whether you are searching for a church, looking for prayer,
            or simply seeking to know God better, we would love to
            welcome you into our church family.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 font-semibold text-[#151512] transition hover:bg-white"
            >
              Join Us
              <ArrowRight size={18} />
            </Link> 
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}