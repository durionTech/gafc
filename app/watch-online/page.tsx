"use client";

import { useState } from "react";
import {
  Play,
  Heart,
  BookOpen,
  Bell,
  Send,
  Loader2,
  CheckCircle2,
  Tv,
  Calendar,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
export default function WatchOnlinePage() {
  const [activeTab, setActiveTab] = useState<"prayer" | "notes" | "bulletin">("prayer");
  // Prayer Request Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // YOUR YOUTUBE LIVE EMBED URL
  const YOUTUBE_LIVE_EMBED = "https://www.youtube.com/embed/Je-QlhXvXSk";

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !prayerRequest) {
      alert("Please fill in your name and prayer request.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("prayer_requests").insert([
      {
        name,
        phone: phone || null,
        prayer_request: prayerRequest,
        status: "new",
      },
    ]);

    setSubmitting(false);

    if (error) {
      alert("Submission failed: " + error.message);
    } else {
      setSubmitted(true);
      setName("");
      setPhone("");
      setPrayerRequest("");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-[#151512] px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Live Worship Broadcast
              </span>
            </div>
            <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
              Watch Online & Live Companion
            </h1>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/70 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
            <Tv className="text-[#d4af37]" size={18} />
            <span>
              Sunday Services: <strong>9:30 AM & 12:00 PM</strong>
            </span>
          </div>
        </div>
      </section>

      {/* DUAL-COLUMN LIVE COMPANION PANEL */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* LEFT COLUMN: YOUTUBE LIVE PLAYER (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl border border-black/10">
              <iframe
                src={YOUTUBE_LIVE_EMBED}
                title="Grace Apostolic Faith Church Live Stream"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* VIDEO INFO BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-black/5 shadow-xs">
              <div>
                <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                  Sunday Divine Worship Service
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Grace Apostolic Faith Church Trust • Live Stream
                </p>
              </div>

              <a
                href="https://www.youtube.com/live/Je-QlhXvXSk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#8b1e1e] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#6e1818]"
              >
                <Play size={14} className="fill-current" />
                Open on YouTube
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: QUICK TABS COMPANION (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col rounded-2xl bg-white border border-[#d4af37]/30 shadow-md overflow-hidden min-h-[500px]">
            
            {/* TAB BUTTONS HEADER */}
            <div className="grid grid-cols-3 border-b border-black/10 bg-[#faf8f2]">
              <button
                onClick={() => setActiveTab("prayer")}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "prayer"
                    ? "border-[#8b1e1e] bg-white text-[#8b1e1e]"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <Heart size={16} />
                <span>Live Prayer</span>
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "notes"
                    ? "border-[#8b1e1e] bg-white text-[#8b1e1e]"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <BookOpen size={16} />
                <span>Scripture</span>
              </button>

              <button
                onClick={() => setActiveTab("bulletin")}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "bulletin"
                    ? "border-[#8b1e1e] bg-white text-[#8b1e1e]"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <Bell size={16} />
                <span>Bulletin</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              
              {/* TAB 1: LIVE PRAYER REQUEST FORM */}
              {activeTab === "prayer" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[#151512]">
                      Submit Urgent Prayer Request
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Our pastors will pray for your request during or after the service.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="rounded-xl bg-green-50 p-6 text-center border border-green-200">
                      <CheckCircle2 size={36} className="mx-auto text-green-600 mb-2" />
                      <h4 className="text-sm font-bold text-green-900">Request Sent!</h4>
                      <p className="mt-1 text-xs text-green-700">
                        Our prayer team has received your request and is standing with you in faith.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 text-xs font-bold text-[#8b1e1e] underline"
                      >
                        Submit another request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePrayerSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Prayer Request *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={prayerRequest}
                          onChange={(e) => setPrayerRequest(e.target.value)}
                          placeholder="Write your prayer request here..."
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8b1e1e] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#6e1818] disabled:opacity-50"
                      >
                        {submitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={14} />
                        )}
                        Send Prayer Request
                      </button>
                    </form>
                  )}
                </div>
              )}
              {/* TAB 2: SCRIPTURE / SERMON NOTES */}
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <div>
                    <span className="rounded-full bg-[#d4af37]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#8b1e1e] uppercase">
                      Today's Message
                    </span>
                    <h3 className="mt-2 font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                      Walking by Faith, Not by Sight
                    </h3>
                  </div>
                  <div className="rounded-xl bg-[#faf8f2] p-4 border border-black/5 space-y-2">
                    <p className="text-xs font-bold text-[#8b1e1e] uppercase tracking-wider">
                      Main Scripture
                    </p>
                    <blockquote className="text-xs italic text-gray-700 leading-relaxed">
                      &ldquo;For we walk by faith, not by sight.&rdquo;
                      <span className="block not-italic font-bold text-black mt-1">
                        — 2 Corinthians 5:7
                      </span>
                    </blockquote>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-800">Sermon Outline:</p>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#8b1e1e]">1.</span>
                        Anchoring your heart in God&apos;s promises.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#8b1e1e]">2.</span>
                        Overcoming fear in uncertain times.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#8b1e1e]">3.</span>
                        Living a life pleasing to the Lord.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: DIGITAL BULLETIN & ANNOUNCEMENTS */}
              {activeTab === "bulletin" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[#151512]">
                      Weekly Church Announcements
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Stay connected with church activities and events.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-black/10 p-3 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8b1e1e]">
                        <Calendar size={14} /> Midweek Prayer Service
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        Join us every Wednesday at 5:00 AM for morning prayer.
                      </p>
                    </div>
                    <div className="rounded-xl border border-black/10 p-3 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8b1e1e]">
                        <Calendar size={14} /> Youth Fellowship Gathering
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        Special youth service this Saturday at 6:00 PM.
                      </p>
                    </div>
                   <div className="rounded-xl border border-[#d4af37]/40 p-3 bg-[#faf8f2]">
                      <p className="text-xs font-bold text-[#151512]">
                        Sunday School
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Every Sunday morning at 8:30 AM before Divine Worship.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}