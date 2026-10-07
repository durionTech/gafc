"use client";

import {
  Play,
  ArrowRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";

const videos = [
  {
    id: "YOUR_YOUTUBE_VIDEO_ID",
    title: "Sunday Worship Service",
    duration: "42:18",
  },
  {
    id: "YOUR_SECOND_VIDEO_ID",
    title: "Walking in Faith",
    duration: "35:42",
  },
];

const dailyVerse = {
  reference: "Psalm 23:1",
  verse:
    "The Lord is my shepherd; I shall not want.",
};

export default function WatchAndWord() {
  return (
    <section className="bg-[#f6f4ef] px-4 py-20 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/*  SECTION HEADER */}

        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c69b32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b751b]">
              Watch & Word
            </span>
            <span className="h-px w-8 bg-[#c69b32]" />
          </div>

          <h2 className="font-serif text-3xl text-[#17130f] sm:text-4xl">
            Be Encouraged in the Word
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6d6259]">
            Watch our latest messages and take a moment to meditate
            on God's Word each day.
          </p>

        </div>


        {/* ==============================
            MAIN GRID
        =============================== */}

        <div className="mt-12 grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">


          {/* ==============================
              YOUTUBE VIDEO
          =============================== */}

          <div className="overflow-hidden rounded-xl bg-[#292a27] shadow-lg">

            {/* Video */}

            <div className="aspect-video w-full">

              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videos[0].id}`}
                title={videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>


            {/* Video Details */}

            <div className="p-5 sm:p-6">

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#e0b83f]">

                 <Play className="h-4 w-4 fill-current" />

                Latest Message

              </div>

              <h3 className="mt-2 font-serif text-xl text-white sm:text-2xl">
                {videos[0].title}
              </h3>

              <p className="mt-2 text-xs text-[#c9c6bf]">
                Watch our latest worship service and message.
              </p>


              <button className="group mt-5 flex items-center gap-2 text-sm font-semibold text-[#e0b83f]">

                Watch on YouTube

                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />

              </button>

            </div>

          </div>


          {/* ==============================
              DAILY BIBLE VERSE
          =============================== */}

          <div className="relative overflow-hidden rounded-xl bg-[#951b28] p-7 text-white shadow-lg sm:p-8">

            {/* Decorative Circle */}

            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10" />

            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full border border-white/10" />


            {/* Content */}

            <div className="relative z-10">

              {/* Label */}

              <div className="flex items-center gap-2">

                <BookOpen className="h-4 w-4 text-[#f1cf68]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f1cf68]">
                  Daily Bible Verse
                </span>

              </div>


              {/* Date */}

              <div className="mt-5 flex items-center gap-2 text-xs text-white/70">

                <CalendarDays className="h-3.5 w-3.5" />

                Today's Scripture

              </div>


              {/* Verse */}

              <blockquote className="mt-8 font-serif text-2xl italic leading-relaxed text-white sm:text-3xl">

                “{dailyVerse.verse}”

              </blockquote>


              {/* Reference */}

              <p className="mt-6 text-sm font-semibold text-[#f1cf68]">
                — {dailyVerse.reference}
              </p>


              {/* Bottom */}

              <div className="mt-10 border-t border-white/20 pt-5">

                <p className="text-xs leading-5 text-white/75">
                  Take a moment today to reflect on God's Word
                  and carry His truth with you.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==============================
            VIEW ALL VIDEOS
        =============================== */}

        <div className="mt-8 flex justify-center">

          <button className="group flex items-center gap-2 rounded-md border border-[#c69b32] px-5 py-3 text-xs font-bold text-[#8d6815] transition hover:bg-[#c69b32] hover:text-white">

            View All Messages

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />

          </button>

        </div>

      </div>

    </section>
  );
}