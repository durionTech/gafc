
"use client";

import { useEffect, useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function getLocalDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function VerseBar() {
  const [verse, setVerse] = useState({
    text: "Trust in the Lord with all your heart.",
    reference: "Proverbs 3:5",
  });

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadVerse() {
      const today = getLocalDate();

      const { data, error } = await supabase
        .from("daily_verses")
        .select("verse_text, bible_reference")
        .eq("verse_date", today)
        .maybeSingle();

      if (!error && data && mounted) {
        setVisible(false);

        window.setTimeout(() => {
          if (!mounted) return;

          setVerse({
            text: data.verse_text,
            reference: data.bible_reference,
          });

          setVisible(true);
        }, 300);
      }
    }

    loadVerse();

    const channel = supabase
      .channel("daily-verse-homepage")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "daily_verses",
        },
        () => {
          loadVerse();
        }
      )
      .subscribe();

    // Also refresh when the calendar date changes
    const poll = window.setInterval(loadVerse, 60_000);

    return () => {
      mounted = false;
      window.clearInterval(poll);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#151512] px-4 py-3">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#8b1e1e]/20" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3">
        <BookOpen className="shrink-0 text-[#d4af37]" size={20} />

        <div
          className={`min-w-0 text-center transition-all duration-500 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] sm:text-xs">
            Verse of the Day
          </p>
          <p className="mt-1 text-xs leading-5 text-white sm:text-sm">
            “{verse.text}”
            <span className="ml-2 whitespace-nowrap font-semibold text-[#d4af37]">
              — {verse.reference}
            </span>
          </p>
        </div>

        <Sparkles className="shrink-0 text-[#d4af37]" size={17} />
      </div>
    </div>
  );
}