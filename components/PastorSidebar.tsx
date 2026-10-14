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
  ShieldCheck,
  ArrowLeft,
  ImagePlus,
} from "lucide-react";

export default function PastorSidebar({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
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
    },
    {
      name: "Monthly Promise",
      href: "/pastor-portal/monthly-promise",
      icon: Heart,
    },
    {
      name: "Prayer Requests",
      href: "/pastor-portal/prayer-requests",
      icon: MessageSquareHeart,
    },
    {
      name: "Daily Bible Verse",
      href: "/pastor-portal/daily-verse",
      icon: BookOpen,
    },
    {
      name: "Gallery Photos",
      href: "/pastor-portal/gallery",
      icon: ImagePlus,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f2] flex flex-col md:flex-row overflow-hidden">
      {/* MOBILE TOP NAVBAR */}
      <header className="bg-[#151512] px-4 py-3.5 flex items-center justify-between md:hidden border-b border-[#d4af37]/30 sticky top-0 z-40">
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

      {/* SIDEBAR NAVIGATION (Sticky on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#151512] text-white transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 md:shrink-0 flex flex-col justify-between border-r border-[#d4af37]/20 ${
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

        {/* FOOTER ACTIONS (View Site & Logout) */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/events"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} />
            View Public Site
          </Link>

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

      {/* MAIN CONTENT WRAPPER (Scrollable Area) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* DESKTOP HEADER (Sticky at the top of the scrollable content) */}
        <header className="hidden md:flex bg-white px-8 py-5 border-b border-black/10 items-center justify-between shadow-xs sticky top-0 z-30">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
              Grace Apostolic Faith Church
            </p>
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
              Pastor Portal
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Authenticated Admin
            </p>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="p-6 md:p-8 flex-1">
          <div className="max-w-6xl mx-auto">{children}</div>
        </section>
      </div>
    </div>
  );
}