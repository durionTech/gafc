import {
  BookOpen,
  Users,
  HandHeart,
  ArrowRight,
} from "lucide-react";

export default function HeartCalling() {
  return (
    <section className="bg-[#f6f4ef] px-4 py-20 sm:px-6 lg:px-8">
      
      {/* Main Container */}
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          {/* Small Label */}
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#c69b32]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b751b]">
              Our Heart & Calling
            </span>

            <span className="h-px w-8 bg-[#c69b32]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl leading-tight text-[#111827] sm:text-4xl md:text-[38px]">
            Rooted in Scripture. Renewed in Spirit. Reaching
            <br className="hidden sm:block" />
            our City.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[#665e57] sm:text-base">
            For over six decades, Grace & Truth has been a sanctuary for
            spiritual seekers, lifelong believers, and families hungering for
            rich biblical preaching, solemn liturgical beauty, and
            compassionate community engagement across our metropolitan area.
          </p>

        </div>


        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {/* Card 1 */}
          <div className="group rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff8e4]">
              <BookOpen className="h-5 w-5 text-[#a77b13]" />
            </div>

            {/* Title */}
            <h3 className="mt-5 font-serif text-xl text-[#17130f]">
              Biblical Worship
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-[#6d6259]">
              Christ-centered preaching firmly rooted in historical
              orthodoxy, historic hymns, and choral psalmody that
              re-orients our hearts toward eternity.
            </p>

            {/* CTA */}
            <button className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#9d1826] transition hover:text-[#74121d]">
              Listen to Worship
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>

          </div>


          {/* Card 2 */}
          <div className="group rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff8e4]">
              <Users className="h-5 w-5 text-[#a77b13]" />
            </div>

            {/* Title */}
            <h3 className="mt-5 font-serif text-xl text-[#17130f]">
              Authentic Fellowship
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-[#6d6259]">
              Intergenerational hospitality walking alongside one another
              through life stages in weekly parish cohorts, home table
              meals, and study groups.
            </p>

            {/* CTA */}
            <button className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#9d1826] transition hover:text-[#74121d]">
              Join a Life Group
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>

          </div>


          {/* Card 3 */}
          <div className="group rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff8e4]">
              <HandHeart className="h-5 w-5 text-[#a77b13]" />
            </div>

            {/* Title */}
            <h3 className="mt-5 font-serif text-xl text-[#17130f]">
              Compassionate Outreach
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-[#6d6259]">
              Serving the vulnerable with tangible mercy through our
              weekday pantry, downtown shelters, refugee family
              resettlement, and global mission alliances.
            </p>

            {/* CTA */}
            <button className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#9d1826] transition hover:text-[#74121d]">
              Explore Ministries
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}