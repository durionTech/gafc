"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, X } from "lucide-react";

type MonthlyPromise = {
  id: string;
  month: number;
  year: number;
  month_promise_image: string | null;
};

type DailyPromise = {
  id: string;
  monthly_promise_id: string;
  day: number;
  image_url: string;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthlyPromisePage() {
  const [months, setMonths] = useState<MonthlyPromise[]>([]);
  const [selectedMonth, setSelectedMonth] =
    useState<MonthlyPromise | null>(null);

  const [dailyPromises, setDailyPromises] =
    useState<DailyPromise[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromises();
  }, []);

  const loadPromises = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("monthly_promises")
      .select("*")
      .order("year", { ascending: false })
      .order("month", { ascending: false });

    const result = data || [];

    setMonths(result);

    if (result.length > 0) {
      await loadDailyPromises(result[0]);
    }

    setLoading(false);
  };

  const loadDailyPromises = async (
    monthData: MonthlyPromise
  ) => {
    setSelectedMonth(monthData);

    const { data } = await supabase
      .from("daily_promises")
      .select("*")
      .eq("monthly_promise_id", monthData.id)
      .order("day", { ascending: true });

    setDailyPromises(data || []);
  };

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

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2
            className="animate-spin text-[#8b1e1e]"
            size={32}
          />
        </div>
      ) : selectedMonth ? (

        <section className="px-5 py-14 md:px-8 lg:px-12">

          <div className="mx-auto max-w-7xl">

            {/* MONTH SELECTOR */}
            {months.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-3">

                {months.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      loadDailyPromises(item)
                    }
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      selectedMonth.id === item.id
                        ? "bg-[#151512] text-[#d4af37]"
                        : "border border-[#151512]/20 bg-white text-[#151512] hover:bg-[#151512] hover:text-white"
                    }`}
                  >
                    {monthNames[item.month - 1]}{" "}
                    {item.year}
                  </button>
                ))}

              </div>
            )}

            {/* MONTH + DAILY */}
            <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">

              {/* MONTHLY PROMISE */}
              <div className="lg:sticky lg:top-24">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
                  Monthly Promise
                </p>

                <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
                  {monthNames[selectedMonth.month - 1]}{" "}
                  {selectedMonth.year}
                </h2>

                {selectedMonth.month_promise_image ? (
                  <div
                    className="mt-5 cursor-pointer overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-white shadow-xl"
                    onClick={() =>
                      setSelectedImage(
                        selectedMonth.month_promise_image
                      )
                    }
                  >
                    <img
                      src={
                        selectedMonth.month_promise_image
                      }
                      alt="Monthly Promise"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-white p-10 text-center text-sm text-gray-500">
                    Monthly promise image not available.
                  </div>
                )}

              </div>

              {/* DAILY */}
              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
                  Daily Promises
                </p>

                <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-[#151512] md:text-3xl">
                  {monthNames[selectedMonth.month - 1]}{" "}
                  {selectedMonth.year} — Every Day
                </h2>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

                  {dailyPromises.map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        setSelectedImage(item.image_url)
                      }
                      className="group cursor-pointer overflow-hidden rounded-xl border border-[#d4af37]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >

                      <div className="flex items-center justify-between bg-[#151512] px-3 py-2">

                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                          {monthNames[
                            selectedMonth.month - 1
                          ].slice(0, 3)}
                        </span>

                        <span className="text-sm font-bold text-white">
                          {String(item.day).padStart(2, "0")}
                        </span>

                      </div>

                      <div className="aspect-square overflow-hidden bg-[#faf8f2]">

                        <img
                          src={item.image_url}
                          alt={`Day ${item.day}`}
                          className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.03]"
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>

      ) : (
        <section className="px-6 py-24 text-center">
          <h2 className="font-[var(--font-playfair)] text-2xl font-bold">
            No Monthly Promise Available
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Please check back soon.
          </p>
        </section>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelectedImage(null)}
        >

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-xl hover:bg-[#d4af37]"
          >
            <X size={25} />
          </button>

          <div
            className="flex max-h-[95vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Promise"
              className="max-h-[92vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>

        </div>
      )}

      <Footer />

    </main>
  );
}