"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Loader2,
  Trash2,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type PrayerRequest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  prayer_request: string;
  status: "new" | "read" | "prayed";
  created_at: string;
};

export default function PrayerRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/pastor-portal");
      return;
    }

    loadRequests();
  };

  const loadRequests = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    }

    setRequests(data || []);
    setLoading(false);
  };

  const updateStatus = async (
    id: string,
    status: "read" | "prayed"
  ) => {
    const { error } = await supabase
      .from("prayer_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this prayer request?")) {
      return;
    }

    const { error } = await supabase
      .from("prayer_requests")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRequests((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const newCount = requests.filter(
    (item) => item.status === "new"
  ).length;

  return (
    <main className="min-h-screen bg-[#faf8f2]">

      {/* HEADER */}
      <header className="bg-[#151512] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              Pastor Portal
            </p>

            <h1 className="mt-1 font-[var(--font-playfair)] text-2xl font-bold text-white">
              Prayer Requests
            </h1>
          </div>

          <button
            onClick={() =>
              router.push("/pastor-portal/dashboard")
            }
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-[#8b1e1e]"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

        </div>
      </header>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">

          {/* SUMMARY */}
          <div className="mb-8 flex items-center justify-between rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#151512] text-[#d4af37]">
                <Heart size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#151512]">
                  Prayer Requests
                </h2>

                <p className="text-sm text-gray-600">
                  {newCount} new request
                  {newCount !== 1 ? "s" : ""}
                </p>
              </div>

            </div>

          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2
                className="animate-spin text-[#8b1e1e]"
                size={30}
              />
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <Heart
                size={35}
                className="mx-auto text-[#d4af37]"
              />

              <h2 className="mt-4 text-xl font-bold">
                No Prayer Requests
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                New prayer requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`rounded-2xl border bg-white p-6 shadow-sm ${
                    request.status === "new"
                      ? "border-[#d4af37]"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <div className="flex items-center gap-3">

                        <h3 className="text-lg font-bold text-[#151512]">
                          {request.name}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            request.status === "new"
                              ? "bg-red-100 text-red-700"
                              : request.status === "read"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          request.created_at
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                  </div>

                  {/* CONTACT */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">

                    {request.email && (
                      <span className="flex items-center gap-2">
                        <Mail size={15} />
                        {request.email}
                      </span>
                    )}

                    {request.phone && (
                      <span className="flex items-center gap-2">
                        <Phone size={15} />
                        {request.phone}
                      </span>
                    )}

                  </div>

                  {/* REQUEST */}
                  <div className="mt-5 rounded-xl bg-[#faf8f2] p-5">

                    <p className="text-xs font-bold uppercase tracking-wider text-[#8b1e1e]">
                      Prayer Request
                    </p>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
                      {request.prayer_request}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="mt-5 flex flex-wrap gap-3">

                    {request.status === "new" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "read"
                          )
                        }
                        className="rounded-lg bg-[#151512] px-4 py-2 text-sm font-semibold text-[#d4af37]"
                      >
                        Mark as Read
                      </button>
                    )}

                    {request.status !== "prayed" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "prayed"
                          )
                        }
                        className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        <CheckCircle size={16} />
                        Prayed
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteRequest(request.id)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}