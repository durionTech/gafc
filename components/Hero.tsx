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

        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d1b76b]/30 bg-[#b69a4c]/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8d18a] backdrop-blur-sm">
          <span>✦</span>
          Welcome Home • Gather With Us This Sunday
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl">

          Faith.
          <span className="mx-2 italic text-[#e2c45d]">
            Hope.
          </span>
          Love.

        </h1>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
          A Christ-centered community grounded in timeless truth and grace,
          worshipping together in faith, hope and love.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">

          <button className="flex min-w-[145px] items-center justify-center gap-2 rounded-md bg-[#951b28] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#7d1621]">
            <Play className="h-4 w-4 fill-current" />
            Watch Online
          </button>

          <button className="flex min-w-[190px] items-center justify-center gap-2 rounded-md bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#4c443d] backdrop-blur transition hover:bg-white">
            <HandHeart className="h-4 w-4 text-[#a17b21]" />
            Submit Prayer Request
          </button>

          <button className="group flex items-center gap-2 px-3 py-3.5 text-sm font-semibold text-white">
            Plan Your Visit
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>

        </div>

        {/* Gathering information */}
        <div className="mt-12 w-full max-w-5xl rounded-xl bg-[#faf8f2] p-5 text-left shadow-2xl sm:p-6">

          <div className="grid gap-6 md:grid-cols-3">

            {/* Sunday */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3e9c9]">
                <Clock3 className="h-5 w-5 text-[#a47e20]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#a17b21]">
                  Lord's Day Gatherings
                </p>

                <p className="mt-1 text-sm font-semibold text-[#211e1b]">
                  9:30 AM
                  <span className="ml-1 text-xs font-normal text-[#8c8175]">
                    (Liturgical)
                  </span>
                </p>

                <p className="text-sm font-semibold text-[#211e1b]">
                  12:00 PM
                  <span className="ml-1 text-xs font-normal text-[#8c8175]">
                    (Youth & Teens Fellowship)
                  </span>
                </p>
              </div>
            </div>

            {/* Bible Study */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3e9c9]">
                <BookOpen className="h-5 w-5 text-[#a47e20]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#a17b21]">
                  Midweek Gathering
                </p>

                <p className="mt-1 text-sm font-semibold text-[#211e1b]">
                  Wednesday Bible Study
                </p>

                <p className="text-xs text-[#8c8175]">
                  5:00 Am monthly verses memorization and study it's evey month first day of the week
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3e9c9]">
                <MapPin className="h-5 w-5 text-[#a47e20]" />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#a17b21]">
                  Sanctuary Address
                </p>

                <p className="mt-1 text-sm font-semibold text-[#211e1b]">
                  Grace Apostolic Faith Church Trust
                </p>

                <p className="text-xs text-[#8c8175]">
                  25, 4th Main Rd, Thendral Nagar, Pattabiram, Tamil Nadu 600072 .
                </p>
              </div>

              <button className="hidden h-fit rounded-md bg-[#e9e4da] px-3 py-2 text-xs font-semibold text-[#514a42] sm:block">
                Directions
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}