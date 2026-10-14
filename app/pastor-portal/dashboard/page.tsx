"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  CalendarDays,
  Heart,
  LogOut,
  BookOpen,
  LayoutDashboard,
  MessageSquareHeart,
  Church,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function PastorDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/pastor-portal");
  };

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/pastor-portal/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Church Events",
      href: "/pastor-portal/events",
      icon: CalendarDays,
      description: "Add, edit and delete church events.",
    },
    {
      name: "Monthly Promise",
      href: "/pastor-portal/monthly-promise",
      icon: Heart,
      description: "Upload monthly promise and daily promise images.",
    },
    {
      name: "Prayer Requests",
      href: "/pastor-portal/prayer-requests",
      icon: MessageSquareHeart,
      description: "View and manage prayer requests submitted by visitors.",
    },
    {
      name: "Daily Bible Verse",
      href: "/pastor-portal/daily-verse",
      icon: BookOpen,
      description: "Add or update the verse displayed on the homepage.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f2] flex flex-col md:flex-row">
      {/* MOBILE TOP NAVBAR */}
      <header className="bg-[#151512] px-4 py-3.5 flex items-center justify-between md:hidden border-b border-[#d4af37]/30">
        <div className="flex items-center gap-2.5">
          <Church className="text-[#d4af37]" size={22} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d4af37]">
              Grace Apostolic Faith
            </p>
            <h1 className="font-[var(--font-playfair)] text-sm font-bold text-white">
              Pastor Portal
            </h1>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* SIDEBAR NAVIGATION (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#151512] text-white transition-transform duration-300 md:static md:translate-x-0 flex flex-col justify-between border-r border-[#d4af37]/20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* SIDEBAR BRANDING */}
          <div className="hidden md:block p-6 border-b border-white/10">
            <div className="flex items-center gap-2.5 mb-1">
              <ShieldCheck className="text-[#d4af37]" size={24} />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                Church Admin
              </p>
            </div>
            <h1 className="font-[var(--font-playfair)] text-xl font-bold text-white">
              Pastor Portal
            </h1>
            <p className="text-[11px] text-white/50 mt-1">
              Grace Apostolic Faith Church
            </p>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-4 space-y-1.5 mt-2 md:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-[#8b1e1e] text-white shadow-md font-semibold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-[#d4af37]"}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-[#8b1e1e] hover:text-white hover:border-[#8b1e1e]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
        />
      )}

      {/* MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DESKTOP HEADER */}
        <header className="hidden md:flex bg-white px-8 py-5 border-b border-black/10 items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Grace Apostolic Faith Church
            </p>
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
              Pastor Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Logged in as Admin
            </p>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <section className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* WELCOME BANNER */}
            <div className="rounded-2xl bg-gradient-to-r from-[#151512] to-[#2a2721] p-6 md:p-8 text-white shadow-lg border border-[#d4af37]/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                  Pastor Overview
                </span>
                <h3 className="mt-2 font-[var(--font-playfair)] text-2xl md:text-3xl font-bold">
                  Welcome, Pastor
                </h3>
                <p className="mt-1 text-xs md:text-sm text-white/70">
                  Select a module below or use the navigation sidebar to update church media, events, and prayer requests.
                </p>
              </div>
            </div>

            {/* MANAGEMENT CARDS GRID */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* 1. CHURCH EVENTS */}
              <button
                onClick={() => router.push("/pastor-portal/events")}
                className="group rounded-2xl border border-[#d4af37]/30 bg-white p-6 text-left shadow-xs transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37] shadow-sm">
                      <CalendarDays size={24} />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#151512]">
                    Church Events
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Add, edit and delete church events on the public calendar.
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Manage Events →
                </span>
              </button>

              {/* 2. MONTHLY PROMISE */}
              <button
                onClick={() => router.push("/pastor-portal/monthly-promise")}
                className="group rounded-2xl border border-[#d4af37]/30 bg-white p-6 text-left shadow-xs transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37] shadow-sm">
                      <Heart size={24} />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#151512]">
                    Monthly Promise
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Upload monthly promise and daily promise images.
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Manage Promise →
                </span>
              </button>

              {/* 3. PRAYER REQUESTS */}
              <button
                onClick={() => router.push("/pastor-portal/prayer-requests")}
                className="group rounded-2xl border border-[#d4af37]/30 bg-white p-6 text-left shadow-xs transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37] shadow-sm">
                      <MessageSquareHeart size={24} />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#151512]">
                    Prayer Requests
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    View and manage prayer requests submitted by visitors.
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  View Requests →
                </span>
              </button>

              {/* 4. DAILY BIBLE VERSE */}
              <button
                onClick={() => router.push("/pastor-portal/daily-verse")}
                className="group rounded-2xl border border-[#d4af37]/30 bg-white p-6 text-left shadow-xs transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#151512] text-[#d4af37] shadow-sm">
                      <BookOpen size={24} />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#151512]">
                    Daily Bible Verse
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Add or update the verse displayed on the homepage.
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                  Manage Verse →
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}