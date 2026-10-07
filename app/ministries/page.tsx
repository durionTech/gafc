import Link from "next/link";
import { ArrowRight } from "lucide-react";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ministries = [
  {
    title: "Children's Ministry",
    description: "Helping children grow in Jesus and God's Word.",
    image: "/images/ministries/children.jpg",
  },
  {
    title: "Sisters' Prayer",
    description: "Women gathering together in prayer and fellowship.",
    image: "/images/ministries/sisters-prayer.jpg",
  },
  {
    title: "Month Promise",
    description: "A special promise from God's Word each month.",
    image: "/images/ministries/month-promise.jpg",
  },
  {
    title: "Youth Fellowship",
    description: "Building a strong generation through Christ.",
    image: "/images/ministries/youth.jpg",
  },
  {
    title: "VBS",
    description: "Fun, faith and God's Word for children.",
    image: "/images/ministries/vbs.jpg",
  },
];

export default function MinistriesPage() {
  return (
    <main className="min-h-screen bg-[#faf8f2]">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="bg-[#151512] px-6 py-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
          Grow • Serve • Fellowship
        </p>

        <h1 className="font-[var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
          Our Ministries
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
          Growing together in faith, prayer and fellowship.
        </p>
      </section>

      {/* Ministry Cards */}
      <section className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {ministries.map((ministry) => (
              <div
                key={ministry.title}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">

                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Small Label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-[#d4af37] px-3 py-1 text-xs font-bold text-[#151512]">
                      Ministry
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">

                  <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                    {ministry.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {ministry.description}
                  </p>

                  <Link
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1e1e] transition hover:text-[#d4af37]"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8b1e1e] px-6 py-12 text-center">
        <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-white">
          Be Part of Our Ministry
        </h2>

        <p className="mt-3 text-sm text-white/80">
          Come, grow and serve together in Christ.
        </p>
      </section>

      <Footer />
    </main>
  );
}