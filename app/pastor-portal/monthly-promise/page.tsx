"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import PastorSidebar from "@/components/PastorSidebar";
import {
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
      router.push("/admin/login");
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
    <PastorSidebar>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
          Monthly Promise
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload and manage monthly and daily promise images.
        </p>
      </div>

      {/* MONTH SELECT */}
      <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-[#8b1e1e]" size={20} />
          <h2 className="text-xl font-bold text-[#151512]">Select Month</h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
          >
            {[2026, 2027, 2028, 2029, 2030].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#8b1e1e]" size={30} />
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {/* MONTHLY IMAGE SECTION */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#151512]">
              {monthNames[month - 1]} {year} — Monthly Promise
            </h2>

            {monthlyPromise?.month_promise_image && (
              <div className="mt-5 flex justify-center bg-[#faf8f2] p-4 rounded-xl border border-black/5">
                <img
                  src={monthlyPromise.month_promise_image}
                  alt="Monthly Promise"
                  className="max-h-[400px] rounded-xl object-contain shadow-sm"
                />
              </div>
            )}

            <label className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d4af37]/50 bg-[#faf8f2] p-8 text-sm font-semibold text-[#151512] hover:bg-[#fffaf0] transition">
              <Upload size={20} className="text-[#8b1e1e]" />
              {monthlyImage ? monthlyImage.name : "Choose Monthly Promise Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setMonthlyImage(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          {/* DAILY IMAGES SECTION */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#151512]">Daily Promises</h2>
            <p className="text-xs text-gray-500 mt-1">
              Upload specific daily devotional promise graphics for each day of the month.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from(
                { length: totalDays },
                (_, index) => index + 1
              ).map((day) => {
                const existing = dailyPromises.find(
                  (item) => item.day === day
                );
                const selected = dailyImages[day];

                return (
                  <div
                    key={day}
                    className="overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#faf8f2] flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between bg-[#151512] px-3 py-2">
                        <span className="text-xs font-bold text-[#d4af37]">
                          DAY
                        </span>
                        <span className="font-bold text-white">
                          {String(day).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="aspect-square bg-white p-2 flex items-center justify-center">
                        {selected ? (
                          <img
                            src={URL.createObjectURL(selected)}
                            alt={`Day ${day}`}
                            className="h-full w-full object-contain rounded"
                          />
                        ) : existing ? (
                          <img
                            src={existing.image_url}
                            alt={`Day ${day}`}
                            className="h-full w-full object-contain rounded"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center text-gray-400">
                            <ImagePlus size={28} />
                            <span className="mt-1 text-[10px]">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block cursor-pointer border-t bg-white p-2.5 text-center text-xs font-semibold text-[#8b1e1e] hover:bg-gray-50 transition">
                        <Upload size={14} className="mx-auto mb-1" />
                        {selected ? "Change" : "Upload"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setDailyImages((prev) => ({
                              ...prev,
                              [day]: e.target.files?.[0] || null,
                            }))
                          }
                        />
                      </label>

                      {existing && (
                        <button
                          onClick={() => deleteDailyPromise(existing)}
                          className="flex w-full items-center justify-center gap-1 border-t bg-red-50/50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SAVE / DELETE CONTROLS */}
          <div className="flex flex-col gap-3 sm:flex-row pb-6">
            <button
              onClick={saveMonthlyPromise}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#151512] px-6 py-4 font-semibold text-[#d4af37] transition hover:bg-[#8b1e1e] hover:text-white disabled:opacity-50 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving Changes...
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
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-4 font-semibold text-red-600 hover:bg-red-50 transition shadow-xs"
              >
                <Trash2 size={18} />
                Delete Month
              </button>
            )}
          </div>
        </div>
      )}
    </PastorSidebar>
  );
}