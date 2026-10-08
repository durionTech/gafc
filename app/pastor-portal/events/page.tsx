"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Clock3,
  MapPin,
  Loader2,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  created_at: string;
};

export default function PastorEventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState(
    "Grace Apostolic Faith Church"
  );

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    fetchEvents();
  }

  async function fetchEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setEvents(data || []);
    }

    setLoading(false);
  }

  function resetForm() {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("Grace Apostolic Faith Church");
    setEditingId(null);
    setShowForm(false);
  }

  function openAddForm() {
    setEditingId(null);
    setTitle("");
    setDate("");
    setTime("");
    setLocation("Grace Apostolic Faith Church");
    setShowForm(true);
  }

  function openEditForm(event: Event) {
    setEditingId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !date || !time || !location) {
      return;
    }

    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("events")
        .update({
          title,
          date,
          time,
          location,
        })
        .eq("id", editingId);

      if (error) {
        alert(error.message);
      } else {
        alert("Event updated successfully!");
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from("events")
        .insert({
          title,
          date,
          time,
          location,
        });

      if (error) {
        alert(error.message);
      } else {
        alert("Event added successfully!");
        resetForm();
        fetchEvents();
      }
    }

    setSaving(false);
  }

  async function deleteEvent(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchEvents();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#faf8f2]">

      {/* HEADER */}
      <header className="bg-[#151512] px-5 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Pastor Portal
            </p>

            <h1 className="font-[var(--font-playfair)] text-2xl font-bold">
              Manage Church Events
            </h1>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-6xl">

          {/* TOP */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
                Church Events
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add and manage upcoming church events.
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#8b1e1e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6e1818]"
            >
              <Plus size={18} />
              Add Event
            </button>

          </div>

          {/* FORM */}
          {showForm && (
            <div className="mb-10 rounded-2xl border border-[#d4af37]/30 bg-white p-6 shadow-lg">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8b1e1e]">
                    {editingId ? "Edit Event" : "New Event"}
                  </p>

                  <h3 className="mt-1 font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
                    {editingId
                      ? "Update Church Event"
                      : "Add Church Event"}
                  </h3>
                </div>

                <button
                  onClick={resetForm}
                  className="text-sm text-gray-500 hover:text-[#8b1e1e]"
                >
                  Cancel
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >

                {/* TITLE */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                    Event Name
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Holy Communion"
                    required
                    className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                {/* TIME */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                    Time
                  </label>

                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="9:30 AM – 11:30 AM"
                    required
                    className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                {/* LOCATION */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white"
                  />
                </div>

                {/* BUTTON */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b1e1e] py-3 text-sm font-bold text-white transition hover:bg-[#6e1818] disabled:opacity-50"
                  >
                    {saving && (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    )}

                    {editingId
                      ? "Update Event"
                      : "Publish Event"}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* EVENT LIST */}
          <div className="space-y-4">

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2
                  size={28}
                  className="animate-spin text-[#8b1e1e]"
                />
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                <CalendarDays
                  size={40}
                  className="mx-auto text-[#d4af37]"
                />

                <h3 className="mt-4 font-[var(--font-playfair)] text-xl font-bold">
                  No Events Yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Click "Add Event" to create your first church event.
                </p>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fff4d6]">
                        <CalendarDays
                          size={22}
                          className="text-[#8b1e1e]"
                        />
                      </div>

                      <div>
                        <h3 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                          {event.title}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">

                          <span className="flex items-center gap-2">
                            <CalendarDays size={15} />
                            {new Date(
                              event.date + "T00:00:00"
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock3 size={15} />
                            {event.time}
                          </span>

                          <span className="flex items-center gap-2">
                            <MapPin size={15} />
                            {event.location}
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2">

                      <button
                        onClick={() => openEditForm(event)}
                        className="flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-[#151512] transition hover:border-[#d4af37] hover:bg-[#fffaf0]"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </section>
    </main>
  );
}