"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import {
  Heart,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function PrayerRequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim() || !prayerRequest.trim()) {
      alert("Please enter your name and prayer request.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("prayer_requests")
      .insert({
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        prayer_request: prayerRequest.trim(),
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setPrayerRequest("");

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#faf8f2]">

      <TopBar />
      <Navbar />

      {/* HERO */}
      {/* <section className="bg-[#151512] px-6 py-16 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-[#151512]">
          <Heart size={30} />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          We Are Here To Pray With You
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-white md:text-5xl">
          Prayer Request
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
          Whatever you are going through, you don't have to face it alone.
          Share your prayer request with us.
        </p> */}

      {/* </section> */}

      {/* FORM */}
      <section className="px-5 py-14 md:px-8">

        <div className="mx-auto max-w-2xl">

          {submitted ? (
            <div className="rounded-2xl border border-[#d4af37]/30 bg-white p-10 text-center shadow-xl">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <CheckCircle size={34} />
              </div>

              <h2 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
                Prayer Request Received
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600">
                Thank you for sharing your prayer request with us.
                Our church family will pray with you.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-7 rounded-full bg-[#151512] px-7 py-3 text-sm font-semibold text-[#d4af37] hover:bg-[#8b1e1e] hover:text-white"
              >
                Submit Another Request
              </button>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-xl md:p-8"
            >

              <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
                How Can We Pray For You?
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Your request will be shared privately with our pastor.
              </p>

              {/* NAME */}
              <div className="mt-7">
                <label className="mb-2 block text-sm font-semibold text-[#151512]">
                  Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* EMAIL */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#151512]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* PHONE */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#151512]">
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* PRAYER */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#151512]">
                  Prayer Request *
                </label>

                <textarea
                  value={prayerRequest}
                  onChange={(e) =>
                    setPrayerRequest(e.target.value)
                  }
                  placeholder="Please share your prayer request..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#151512] px-6 py-4 font-semibold text-[#d4af37] transition hover:bg-[#8b1e1e] hover:text-white disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Heart size={18} />
                    Submit Prayer Request
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}