"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Trash2,
  Save,
  Loader2,
  ImagePlus,
  CalendarDays,
} from "lucide-react";

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

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export default function PastorMonthlyPromisePage() {
  const router = useRouter();

  const [userLoading, setUserLoading] = useState(true);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [monthlyPromise, setMonthlyPromise] =
    useState<MonthlyPromise | null>(null);

  const [dailyPromises, setDailyPromises] = useState<DailyPromise[]>([]);

  const [monthlyImage, setMonthlyImage] =
    useState<File | null>(null);

  const [dailyImages, setDailyImages] =
    useState<Record<number, File | null>>({});

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!userLoading) {
      loadPromises();
    }
  }, [month, year, userLoading]);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/pastor-portal");
      return;
    }

    setUserLoading(false);
  };

  const loadPromises = async () => {
    setLoadingData(true);

    const { data: monthlyData } = await supabase
      .from("monthly_promises")
      .select("*")
      .eq("month", month)
      .eq("year", year)
      .maybeSingle();

    setMonthlyPromise(monthlyData || null);

    if (monthlyData) {
      const { data: dailyData } = await supabase
        .from("daily_promises")
        .select("*")
        .eq("monthly_promise_id", monthlyData.id)
        .order("day", { ascending: true });

      setDailyPromises(dailyData || []);
    } else {
      setDailyPromises([]);
    }

    setMonthlyImage(null);
    setDailyImages({});

    setLoadingData(false);
  };

  const uploadImage = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    const { error } = await supabase.storage
      .from("promises")
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      alert(error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("promises")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  const saveMonthlyPromise = async () => {
    setLoading(true);

    try {
      let monthlyId = monthlyPromise?.id;

      // Create monthly record
      if (!monthlyId) {
        const { data, error } = await supabase
          .from("monthly_promises")
          .insert({
            month,
            year,
          })
          .select()
          .single();

        if (error) throw error;

        monthlyId = data.id;
      }

      // Upload monthly image
      if (monthlyImage && monthlyId) {
        const path = `${year}/${String(month).padStart(
          2,
          "0"
        )}/monthly.jpg`;

        const imageUrl = await uploadImage(
          monthlyImage,
          path
        );

        if (imageUrl) {
          await supabase
            .from("monthly_promises")
            .update({
              month_promise_image: imageUrl,
              updated_at: new Date().toISOString(),
            })
            .eq("id", monthlyId);
        }
      }

      // Upload daily images
      if (monthlyId) {
        const totalDays = daysInMonth(month, year);

        for (let day = 1; day <= totalDays; day++) {
          const file = dailyImages[day];

          if (!file) continue;

          const path = `${year}/${String(month).padStart(
            2,
            "0"
          )}/day-${String(day).padStart(2, "0")}.jpg`;

          const imageUrl = await uploadImage(file, path);

          if (!imageUrl) continue;

          const { error } = await supabase
            .from("daily_promises")
            .upsert(
              {
                monthly_promise_id: monthlyId,
                day,
                image_url: imageUrl,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict:
                  "monthly_promise_id,day",
              }
            );

          if (error) throw error;
        }
      }

      alert("Monthly Promise saved successfully!");

      setMonthlyImage(null);
      setDailyImages({});

      await loadPromises();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteDailyPromise = async (
    daily: DailyPromise
  ) => {
    const confirmDelete = confirm(
      `Delete Day ${daily.day} promise?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("daily_promises")
      .delete()
      .eq("id", daily.id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadPromises();
  };

  const deleteMonthlyPromise = async () => {
    if (!monthlyPromise) return;

    const confirmDelete = confirm(
      `Delete entire ${monthNames[month - 1]} ${year} promise?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("monthly_promises")
      .delete()
      .eq("id", monthlyPromise.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Monthly Promise deleted.");

    setMonthlyPromise(null);
    setDailyPromises([]);
  };

  if (userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f2]">
        <Loader2 className="animate-spin text-[#8b1e1e]" />
      </div>
    );
  }

  const totalDays = daysInMonth(month, year);

  return (
    <main className="min-h-screen bg-[#faf8f2]">

      {/* HEADER */}
      <header className="bg-[#151512] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              Pastor Portal
            </p>

            <h1 className="mt-1 font-[var(--font-playfair)] text-2xl font-bold text-white">
              Monthly Promise
            </h1>
          </div>

          <button
            onClick={() =>
              router.push("/pastor-portal/dashboard")
            }
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-[#8b1e1e]"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

        </div>
      </header>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* MONTH SELECT */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <CalendarDays className="text-[#8b1e1e]" />

              <h2 className="text-xl font-bold text-[#151512]">
                Select Month
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <select
                value={month}
                onChange={(e) =>
                  setMonth(Number(e.target.value))
                }
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
              >
                {monthNames.map((name, index) => (
                  <option
                    key={name}
                    value={index + 1}
                  >
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) =>
                  setYear(Number(e.target.value))
                }
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
              >
                {[2026, 2027, 2028, 2029, 2030].map(
                  (y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  )
                )}
              </select>

            </div>
          </div>

          {loadingData ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#8b1e1e]" />
            </div>
          ) : (
            <div className="mt-8 space-y-8">

              {/* MONTHLY IMAGE */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-[#151512]">
                  {monthNames[month - 1]} {year} — Monthly Promise
                </h2>

                {monthlyPromise?.month_promise_image && (
                  <img
                    src={monthlyPromise.month_promise_image}
                    alt="Monthly Promise"
                    className="mt-5 max-h-[500px] rounded-xl object-contain"
                  />
                )}

                <label className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d4af37]/50 bg-[#faf8f2] p-8 text-sm font-semibold text-[#151512] hover:bg-[#fffaf0]">

                  <Upload size={20} />

                  {monthlyImage
                    ? monthlyImage.name
                    : "Choose Monthly Promise Image"}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setMonthlyImage(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                </label>

              </div>

              {/* DAILY IMAGES */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-[#151512]">
                  Daily Promises
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                  {Array.from(
                    { length: totalDays },
                    (_, index) => index + 1
                  ).map((day) => {

                    const existing =
                      dailyPromises.find(
                        (item) => item.day === day
                      );

                    const selected =
                      dailyImages[day];

                    return (
                      <div
                        key={day}
                        className="overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#faf8f2]"
                      >

                        <div className="flex items-center justify-between bg-[#151512] px-3 py-2">

                          <span className="text-xs font-bold text-[#d4af37]">
                            DAY
                          </span>

                          <span className="font-bold text-white">
                            {String(day).padStart(2, "0")}
                          </span>

                        </div>

                        <div className="aspect-square bg-white">

                          {selected ? (
                            <img
                              src={URL.createObjectURL(selected)}
                              alt={`Day ${day}`}
                              className="h-full w-full object-contain"
                            />
                          ) : existing ? (
                            <img
                              src={existing.image_url}
                              alt={`Day ${day}`}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center text-gray-400">
                              <ImagePlus size={28} />
                              <span className="mt-2 text-xs">
                                No Image
                              </span>
                            </div>
                          )}

                        </div>

                        <label className="block cursor-pointer border-t bg-white p-3 text-center text-xs font-semibold text-[#8b1e1e]">

                          <Upload
                            size={15}
                            className="mx-auto mb-1"
                          />

                          {selected
                            ? "Change Image"
                            : "Upload Image"}

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              setDailyImages((prev) => ({
                                ...prev,
                                [day]:
                                  e.target.files?.[0] ||
                                  null,
                              }))
                            }
                          />

                        </label>

                        {existing && (
                          <button
                            onClick={() =>
                              deleteDailyPromise(existing)
                            }
                            className="flex w-full items-center justify-center gap-1 border-t px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        )}

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* SAVE */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={saveMonthlyPromise}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#151512] px-6 py-4 font-semibold text-[#d4af37] transition hover:bg-[#8b1e1e] hover:text-white disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Monthly Promise
                    </>
                  )}
                </button>

                {monthlyPromise && (
                  <button
                    onClick={deleteMonthlyPromise}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-4 font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                    Delete Month
                  </button>
                )}

              </div>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}