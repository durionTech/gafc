"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Lock, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PastorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else if (data.session) {
      // Redirect pastor straight back to the calendar page upon successful login
     router.push("/pastor-portal/events");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f2] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#d4af37]/30 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#151512] p-6 text-white text-center relative">
          <Link 
            href="/events" 
            className="absolute left-4 top-6 text-white/70 hover:text-white flex items-center gap-1 text-xs"
          >
            <ArrowLeft size={16} /> Back
          </Link>

          <div className="flex justify-center mb-2">
            <div className="p-3 bg-[#d4af37]/20 rounded-full border border-[#d4af37]/40">
              <ShieldCheck size={28} className="text-[#d4af37]" />
            </div>
          </div>
          <h2 className="font-[var(--font-playfair)] text-2xl font-bold">Pastor Portal Access</h2>
          <p className="text-xs text-white/70 mt-1">Grace Apostolic Faith Church</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {errorMsg && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#151512] mb-1.5">
              Pastor Email
            </label>
            <input
              type="email"
              required
              placeholder="pastor@church.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#151512] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#8b1e1e] py-3 text-sm font-bold text-white shadow transition hover:bg-[#6e1818] disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
            Sign In to Manage Church Events
          </button>
        </form>
      </div>
    </main>
  );
}