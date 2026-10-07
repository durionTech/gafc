"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const months = [
  {
    month: "October 2026",
    folder: "october",
    days: 31,
    verse:
      "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
  },
  {
    month: "September 2026",
    folder: "september",
    days: 30,
    verse: "",
    reference: "",
  },
  {
    month: "August 2026",
    folder: "august",
    days: 31,
    verse: "",
    reference: "",
  },
  {
    month: "July 2026",
    folder: "july",
    days: 31,
    verse: "",
    reference: "",
  },
];

function getDayImage(folder: string, day: number) {
  return `/images/promises/${folder}/${folder.slice(0, 3)}-${String(
    day
  ).padStart(2, "0")}.jpg`;
}

export default function MonthlyPromisePage() {
  const currentMonth = months[0];
  const previousMonths = months.slice(1);

  // Selected daily promise image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>( null);

  return (
    <main className="min-h-screen bg-[#faf8f2]">
      <TopBar />
      <Navbar />

      {/* HERO */}
      <section className="bg-[#151512] px-6 py-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          Faith • Hope • Love
        </p>

        <h1 className="font-[var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
          Monthly Promise
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70">
          God's promise for every month and every day.
        </p>
      </section>

      {/* CURRENT MONTH */}
      <section className="px-5 py-14 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl"> 
           {/* MONTH PROMISE + DAILY CALENDAR */}
<div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">

  {/* LEFT - MONTH PROMISE IMAGE */}
  <div className="lg:sticky lg:top-24">
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
        Monthly Promise
      </p>

      <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
        {currentMonth.month}
      </h3>
    </div>

    <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-white shadow-xl">
      <img
        src={`/images/promises/${currentMonth.folder}/month-promise.jpg`}
        alt={`${currentMonth.month} Monthly Promise`}
        className="h-auto w-full object-contain"
      />
    </div>
  </div>


  {/* RIGHT - DAILY CALENDAR */}
  <div>
    <div className="mb-7">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
        Daily Promises
      </p>

      <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
        {currentMonth.month} — Every Day
      </h3>
    </div>

    {/* CALENDAR GRID */}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

      {Array.from(
        { length: currentMonth.days },
        (_, index) => index + 1
      ).map((day) => (

        <div
          key={day}
          onClick={() =>
            setSelectedImage(
              getDayImage(currentMonth.folder, day)
            )
          }
          className="group cursor-pointer overflow-hidden rounded-xl border border-[#d4af37]/20 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          {/* DATE HEADER */}
          <div className="flex items-center justify-between bg-[#151512] px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
              OCT
            </span>

            <span className="text-sm font-bold text-white">
              {String(day).padStart(2, "0")}
            </span>
          </div>

          {/* DAILY IMAGE */}
          <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#faf8f2]">
            <img
              src={getDayImage(currentMonth.folder, day)}
              alt={`${currentMonth.month} Day ${day}`}
              className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.03]"
            />
          </div>

        </div>

      ))}

    </div>
    {/* PREVIOUS MONTH BUTTON */}
<div className="mt-12 text-center">
  <button
    onClick={() => setSelectedMonthIndex(1)}
    className="inline-flex items-center gap-2 rounded-full bg-[#151512] px-7 py-3 text-sm font-semibold text-[#d4af37] shadow-md transition hover:bg-[#8b1e1e] hover:text-white"
  >
    View Previous Months
    <span className="text-lg">→</span>
  </button>
</div>
  </div>

</div>
        </div>
      </section>

 {/* PREVIOUS MONTH */}
{selectedMonthIndex !== null && (
  <section className="bg-white px-5 py-16 md:px-8 lg:px-12">
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}
      <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
            Previous Month
          </p>

          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold text-[#151512] md:text-4xl">
            {months[selectedMonthIndex].month}
          </h2>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => setSelectedMonthIndex(null)}
          className="rounded-full border border-[#151512]/20 bg-[#faf8f2] px-5 py-2.5 text-sm font-semibold text-[#151512] transition hover:bg-[#151512] hover:text-white"
        >
          ← Back to October
        </button>
      </div>

      {/* MONTH + DAILY CALENDAR */}
      <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">

        {/* LEFT - MONTH PROMISE */}
        <div className="lg:sticky lg:top-24">

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Monthly Promise
            </p>

            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
              {months[selectedMonthIndex].month}
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#faf8f2] shadow-xl">
            <img
              src={`/images/promises/${months[selectedMonthIndex].folder}/month-promise.jpg`}
              alt={`${months[selectedMonthIndex].month} Monthly Promise`}
              className="h-auto w-full object-contain"
            />
          </div>

        </div>


        {/* RIGHT - DAILY CALENDAR */}
        <div>

          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Daily Promises
            </p>

            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
              {months[selectedMonthIndex].month} — Every Day
            </h3>
          </div>


          {/* CALENDAR */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

            {Array.from(
              { length: months[selectedMonthIndex].days },
              (_, index) => index + 1
            ).map((day) => (

              <div
                key={day}
                onClick={() =>
                  setSelectedImage(
                    getDayImage(
                      months[selectedMonthIndex].folder,
                      day
                    )
                  )
                }
                className="group cursor-pointer overflow-hidden rounded-xl border border-[#d4af37]/20 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* DATE HEADER */}
                <div className="flex items-center justify-between bg-[#151512] px-3 py-2">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                    {months[selectedMonthIndex].folder
                      .slice(0, 3)
                      .toUpperCase()}
                  </span>

                  <span className="text-sm font-bold text-white">
                    {String(day).padStart(2, "0")}
                  </span>

                </div>


                {/* DAILY IMAGE */}
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#faf8f2]">

                  <img
                    src={getDayImage(
                      months[selectedMonthIndex].folder,
                      day
                    )}
                    alt={`${months[selectedMonthIndex].month} Day ${day}`}
                    className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.03]"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* NEXT PREVIOUS MONTH BUTTON */}
      {selectedMonthIndex < months.length - 1 && (
        <div className="mt-14 text-center">

          <button
            onClick={() =>
              setSelectedMonthIndex(selectedMonthIndex + 1)
            }
            className="inline-flex items-center gap-2 rounded-full bg-[#151512] px-7 py-3 text-sm font-semibold text-[#d4af37] shadow-md transition hover:bg-[#8b1e1e] hover:text-white"
          >
            View{" "}
            {months[selectedMonthIndex + 1].month}
            <span className="text-lg">→</span>
          </button>

        </div>
      )}

    </div>
  </section>
)}
      {/* IMAGE ZOOM MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white text-3xl font-light leading-none text-black shadow-xl transition hover:bg-[#d4af37]"
            aria-label="Close image"
          >
            ×
          </button>

          {/* IMAGE */}
          <div
            className="flex max-h-[95vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Daily Promise"
              className="max-h-[92vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )} 
      <Footer />
    </main>
  );
}