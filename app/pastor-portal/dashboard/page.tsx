"use client";


import { useRouter } from "next/navigation";
import { CalendarDays, Heart, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function PastorDashboard() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/pastor-portal");
  };

  return (
    <main className="min-h-screen bg-[#faf8f2]">

      <header className="bg-[#151512] px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Grace Apostolic Faith Church
            </p>

            <h1 className="mt-1 font-[var(--font-playfair)] text-2xl font-bold text-white">
              Pastor Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-[#8b1e1e]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
            Welcome, Pastor
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Manage church events and monthly promises from here.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {/* EVENTS */}
            <button
              onClick={() => router.push("/pastor-portal/events")}
              className="group rounded-2xl border border-[#d4af37]/30 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37]">
                <CalendarDays size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#151512]">
                Church Events
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add, edit and delete church events.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8b1e1e]">
                Manage Events →
              </span>
            </button>

            {/* MONTHLY PROMISE */}
            <button
              onClick={() =>
                router.push("/pastor-portal/monthly-promise")
              }
              className="group rounded-2xl border border-[#d4af37]/30 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37]">
                <Heart size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#151512]">
                Monthly Promise
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Upload monthly promise and daily promise images.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8b1e1e]">
                Manage Promise →
              </span>
            </button>

            {/* Prayer Requests */}
                          <button
              onClick={() =>
                router.push("/pastor-portal/prayer-requests")
              }
                    className="group rounded-2xl border border-[#d4af37]/30 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37]">
                      <Heart size={28} />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[#151512]">
                      Prayer Requests
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      View and manage prayer requests submitted by visitors.
                    </p>

                    <span className="mt-5 inline-block text-sm font-semibold text-[#8b1e1e]">
                      View Requests →
                    </span>
                  </button>
                  
<Link
  href="/pastor-portal/daily-verse"
  className="group rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>
  <BookOpen className="mb-4 text-[#8b1e1e]" size={30} />

  <h2 className="text-xl font-bold text-[#151512]">
    Daily Bible Verse
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    Add or update the verse displayed on the homepage.
  </p>

  <span className="mt-4 inline-block font-semibold text-[#8b1e1e]">
    Manage Verse →
  </span>
</Link>
          </div>
        </div>
      </section>
    </main>
  );
}