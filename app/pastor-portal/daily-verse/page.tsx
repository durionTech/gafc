"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import PastorSidebar from "@/components/PastorSidebar";

function getLocalDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DailyVerseAdminPage() {
  const router = useRouter();

  const [date, setDate] = useState(getLocalDate());
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    async function checkLogin() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      setLoading(false);
    }

    checkLogin();
  }, [router]);

  useEffect(() => {
    if (!date) return;

    async function loadVerse() {
      setMessage(null);

      const { data, error } = await supabase
        .from("daily_verses")
        .select("verse_text, bible_reference")
        .eq("verse_date", date)
        .maybeSingle();

      if (error) {
        setMessage({ text: error.message, isError: true });
        return;
      }

      setVerse(data?.verse_text ?? "");
      setReference(data?.bible_reference ?? "");
    }

    loadVerse();
  }, [date]);

  async function saveVerse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("daily_verses")
      .upsert(
        {
          verse_date: date,
          verse_text: verse.trim(),
          bible_reference: reference.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "verse_date" }
      );

    setSaving(false);

    if (error) {
      setMessage({ text: `Save failed: ${error.message}`, isError: true });
      return;
    }

    setMessage({ text: "Daily Bible verse saved successfully!", isError: false });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f2]">
        <Loader2 className="animate-spin text-[#8b1e1e]" size={32} />
      </div>
    );
  }

  return (
    <PastorSidebar>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
          Daily Bible Verse
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Publish or update the verse displayed on the church homepage.
        </p>
      </div>

      {/* CARD FORM WRAPPER */}
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-black/5 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37]">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#151512]">Manage Scripture</h2>
              <p className="text-xs text-gray-500">
                Select a date to preview or update its daily scripture passage.
              </p>
            </div>
          </div>

          <form onSubmit={saveVerse} className="mt-6 space-y-6">
            {/* VERSE DATE */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                Verse Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition"
              />
            </div>

            {/* BIBLE VERSE TEXT */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                Bible Verse Text
              </label>
              <textarea
                required
                rows={5}
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                placeholder="e.g. The Lord is my shepherd; I shall not want..."
                className="w-full rounded-lg border border-black/15 bg-[#faf8f2] p-4 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition resize-none leading-relaxed"
              />
            </div>

            {/* BIBLE REFERENCE */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                Bible Reference
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. Psalm 23:1"
                className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition"
              />
            </div>

            {/* STATUS MESSAGE FEEDBACK */}
            {message && (
              <div
                className={`flex items-center gap-2.5 rounded-xl p-4 text-sm font-medium ${
                  message.isError
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {message.isError ? (
                  <AlertCircle size={18} className="shrink-0" />
                ) : (
                  <CheckCircle2 size={18} className="shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* SAVE BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#151512] py-3.5 font-semibold text-[#d4af37] transition hover:bg-[#8b1e1e] hover:text-white disabled:opacity-60 shadow-md"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving Verse...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Daily Verse
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </PastorSidebar>
  );
}