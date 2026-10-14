"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Loader2,
  Trash2,
  CheckCircle,
  Mail,
  Phone,
  Mic,
  Square,
  Send,
  RotateCcw,
  Clock,
  CheckCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import PastorSidebar from "@/components/PastorSidebar";

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

  // Audio Recording States
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/admin/login");
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

  // AUDIO RECORDING FUNCTIONS
  const startRecording = async (requestId: string) => {
    setRecordingId(requestId);
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission is required to record prayer voice notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const resetRecording = () => {
    setRecordingId(null);
    setIsRecording(false);
    setAudioBlob(null);
    setAudioUrl(null);
  };

  // SEND VOICE NOTE TO WHATSAPP
  const sendWhatsAppVoice = async (request: PrayerRequest) => {
    if (!request.phone) {
      alert("No phone number provided for this request.");
      return;
    }

    let voicePublicUrl = "";

    if (audioBlob) {
      setUploadingAudio(true);
      const fileName = `prayer-voice-${request.id}-${Date.now()}.mp3`;

      const { error: uploadError } = await supabase.storage
        .from("prayers")
        .upload(fileName, audioBlob, { contentType: "audio/mp3" });

      if (uploadError) {
        alert("Audio upload failed: " + uploadError.message);
        setUploadingAudio(false);
        return;
      }

      const { data } = supabase.storage.from("prayers").getPublicUrl(fileName);
      voicePublicUrl = data.publicUrl;
      setUploadingAudio(false);
    }

    let cleanPhone = request.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone;
    }

    const message = voicePublicUrl
      ? `Grace & Peace ${request.name},\n\nPastor has prayed for your prayer request: "${request.prayer_request}"\n\nListen to Pastor's Prayer Voice Note here:\n${voicePublicUrl}\n\nGod Bless You!`
      : `Grace & Peace ${request.name},\n\nPastor has prayed for your request: "${request.prayer_request}". May God grant your heart's desires according to His will!\n\nGrace Apostolic Faith Church Trust`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    await updateStatus(request.id, "prayed");
    window.open(whatsappUrl, "_blank");
    resetRecording();
  };

  const newCount = requests.filter((item) => item.status === "new").length;
  const prayedCount = requests.filter((item) => item.status === "prayed").length;

  return (
    <PastorSidebar>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
          Prayer Requests & Tracker
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track prayer statuses and send voice notes directly to visitors.
        </p>
      </div>

      {/* SUMMARY BANNER */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#151512] text-[#d4af37]">
            <Heart size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#151512]">Pending Review</h2>
            <p className="text-sm text-gray-600">{newCount} new requests</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white">
            <CheckCheck size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#151512]">Prayed & Completed</h2>
            <p className="text-sm text-gray-600">{prayedCount} answered / prayed</p>
          </div>
        </div>
      </div>

      {/* CONTENT LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#8b1e1e]" size={30} />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-black/5">
          <Heart size={35} className="mx-auto text-[#d4af37]" />
          <h2 className="mt-4 font-[var(--font-playfair)] text-xl font-bold">
            No Prayer Requests
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            New prayer requests submitted on the website will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => {
            // Determine progress tracking step
            const isNew = request.status === "new";
            const isRead = request.status === "read";
            const isPrayed = request.status === "prayed";

            return (
              <div
                key={request.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                  isNew
                    ? "border-[#d4af37] ring-1 ring-[#d4af37]/20"
                    : "border-black/5"
                }`}
              >
                {/* TOP HEADER & TRACKER PROGRESS BAR */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/5 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#151512]">
                        {request.name}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Received: {new Date(request.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>

                  {/* VISUAL PROCESS TRACKER */}
                  <div className="flex items-center gap-2">
                    {/* Step 1: Received */}
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-700">
                      <Clock size={12} /> Received
                    </div>

                    <span className="text-gray-300">→</span>

                    {/* Step 2: Read / Reviewed */}
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                        isRead || isPrayed
                          ? "bg-yellow-100 text-yellow-800 font-bold"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      Reviewed
                    </div>

                    <span className="text-gray-300">→</span>

                    {/* Step 3: Prayed & Voice Note Sent */}
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                        isPrayed
                          ? "bg-green-100 text-green-800 font-bold shadow-xs"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <CheckCircle size={12} /> {isPrayed ? "Prayed & Sent" : "Pending Prayer"}
                    </div>
                  </div>
                </div>

                {/* CONTACT INFO */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  {request.email && (
                    <span className="flex items-center gap-2">
                      <Mail size={15} className="text-[#8b1e1e]" />
                      {request.email}
                    </span>
                  )}

                  {request.phone && (
                    <span className="flex items-center gap-2 font-semibold text-[#151512]">
                      <Phone size={15} className="text-[#8b1e1e]" />
                      {request.phone}
                    </span>
                  )}
                </div>

                {/* REQUEST TEXT */}
                <div className="mt-4 rounded-xl bg-[#faf8f2] p-4 border border-black/5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#8b1e1e]">
                    Prayer Request
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                    {request.prayer_request}
                  </p>
                </div>

                {/* VOICE RECORDER PANEL */}
                {recordingId === request.id ? (
                  <div className="mt-4 rounded-xl bg-red-50/60 p-4 border border-red-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8b1e1e] mb-3">
                      Record Prayer Voice Message
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      {isRecording ? (
                        <button
                          onClick={stopRecording}
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white animate-pulse"
                        >
                          <Square size={14} /> Stop Recording
                        </button>
                      ) : (
                        <>
                          {audioUrl && (
                            <audio src={audioUrl} controls className="h-9 w-60" />
                          )}

                          <button
                            onClick={resetRecording}
                            className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600"
                          >
                            <RotateCcw size={14} /> Re-record
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* STATUS & WHATSAPP ACTIONS */}
                <div className="mt-5 flex flex-wrap gap-3 pt-2 items-center">
                  {recordingId !== request.id && (
                    <button
                      onClick={() => startRecording(request.id)}
                      className="flex items-center gap-2 rounded-lg border border-[#8b1e1e] bg-[#faf8f2] px-4 py-2 text-xs font-bold text-[#8b1e1e] hover:bg-[#8b1e1e] hover:text-white transition"
                    >
                      <Mic size={15} />
                      Record Prayer Voice
                    </button>
                  )}

                  {request.phone && (
                    <button
                      onClick={() => sendWhatsAppVoice(request)}
                      disabled={uploadingAudio}
                      className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-xs"
                    >
                      {uploadingAudio ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      Send via WhatsApp
                    </button>
                  )}

                  {isNew && (
                    <button
                      onClick={() => updateStatus(request.id, "read")}
                      className="rounded-lg bg-[#151512] px-4 py-2 text-xs font-semibold text-[#d4af37] transition hover:bg-black/80"
                    >
                      Mark as Read
                    </button>
                  )}

                  {!isPrayed && (
                    <button
                      onClick={() => updateStatus(request.id, "prayed")}
                      className="flex items-center gap-2 rounded-lg border border-green-700 px-4 py-2 text-xs font-semibold text-green-700 hover:bg-green-50 transition"
                    >
                      <CheckCircle size={15} />
                      Mark as Prayed
                    </button>
                  )}

                  <button
                    onClick={() => deleteRequest(request.id)}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 ml-auto"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PastorSidebar>
  );
}