"use client";
import Link from "next/link";
import { Heart,Cross,BookOpen,Users,Church,ArrowRight,Sparkles,} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#151512] px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#151512] via-[#151512] to-[#8b1e1e]/40" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Welcome to Our Church
          </p>

          <h1 className="font-[var(--font-playfair)] text-4xl font-bold text-white md:text-6xl">
            About Grace Apostolic
            <span className="block text-[#d4af37]">
              Faith Church Trust
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            A Christ-centered community growing together in
            <span className="font-semibold text-[#d4af37]">
              {" "}Faith, Hope and Love.
            </span>
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Who We Are
            </p>

            <h2 className="font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
              A Church Built on Faith
            </h2>

            <div className="mt-6 space-y-5 text-gray-600 leading-8">
              <p>
                Grace Apostolic Faith Church Trust is a Christ-centered
                community committed to knowing God, growing in His Word,
                and sharing His love with others.
              </p>

              <p>
                We believe that the church is more than a building.
                It is a family of believers who worship together,
                pray together, encourage one another, and serve the
                community with love and compassion.
              </p>

              <p>
                Our desire is to create a welcoming place where people
                can encounter God, strengthen their faith, and discover
                His purpose for their lives.
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-3xl bg-[#151512] p-3 shadow-xl">
            <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl bg-[#8b1e1e]">
              <img
                src="/images/gafc_logo.jpeg"
                alt="Grace Apostolic Faith Church Trust"
                className="h-full w-full object-cover"
              />
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
                Showing Christ's love through fellowship, compassion,
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
              To proclaim the Gospel, teach God's Word, encourage believers,
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

            <Link
              href="/prayer-request"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37] px-7 py-3.5 font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#151512]"
            >
              Submit Prayer Request
              <Heart size={18} />
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}