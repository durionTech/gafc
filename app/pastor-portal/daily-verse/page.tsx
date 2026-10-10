
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Save, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkLogin() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/pastor-portal");
        return;
      }

      setLoading(false);
    }

    checkLogin();
  }, [router]);

  useEffect(() => {
    if (!date) return;

    async function loadVerse() {
      setMessage("");

      const { data, error } = await supabase
        .from("daily_verses")
        .select("verse_text, bible_reference")
        .eq("verse_date", date)
        .maybeSingle();

      if (error) {
        setMessage(error.message);
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
    setMessage("");

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
      setMessage(`Save failed: ${error.message}`);
      return;
    }

    setMessage("Daily Bible verse saved successfully!");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#d4af37]" size={32} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f2] px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/pastor-portal/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#8b1e1e]"
        >
          <ArrowLeft size={17} /> Back to Dashboard
        </Link>

        <div className="rounded-3xl bg-[#151512] p-6 text-white sm:p-9">
          <BookOpen className="mb-4 text-[#d4af37]" size={36} />

          <h1 className="font-[var(--font-playfair)] text-3xl font-bold">
            Daily Bible Verse
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Publish or update the verse shown on the church homepage.
          </p>

          <form onSubmit={saveVerse} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/80">
                Verse Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">
                Bible Verse
              </label>
              <textarea
                required
                rows={4}
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                placeholder="Enter the Bible verse..."
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">
                Bible Reference
              </label>
              <input
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. Psalm 23:1"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#d4af37]"
              />
            </div>

            {message && (
              <p className="rounded-xl bg-white/10 p-3 text-sm">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 font-bold text-[#151512] transition hover:bg-white disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Daily Verse"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}