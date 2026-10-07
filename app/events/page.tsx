"use client";

import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

const churchEvents = [
  {
    date: "2026-10-11",
    title: "Holy Communion",
    time: "9:30 AM – 11:30 AM",
    location: "Grace Apostolic Faith Church",
  },
  {
    date: "2026-10-17",
    title: "Youth Fellowship",
    time: "5:00 PM – 7:00 PM",
    location: "Grace Apostolic Faith Church",
  },
  {
    date: "2026-10-24",
    title: "Sisters' Prayer",
    time: "10:00 AM – 12:00 PM",
    location: "Grace Apostolic Faith Church",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function EventsPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2026);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const calendarDays = useMemo(() => {
    const previousMonthDays = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    const days = [];

    // Previous month dates
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        currentMonth: false,
      });
    }

    // Current month dates
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
      });
    }

    // Next month dates
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay++,
        currentMonth: false,
      });
    }

    return days;
  }, [currentMonth, currentYear, daysInMonth, firstDay]);

  function getDateString(day: number) {
    return `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  }

  function getEvent(day: number) {
    if (!day) return undefined;

    const date = getDateString(day);

    return churchEvents.find((event) => event.date === date);
  }

  function previousMonth() {
    setSelectedDate(null);

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  }

  function nextMonth() {
    setSelectedDate(null);

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  }

  function goToday() {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());

    setSelectedDate(
      `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    );
  }

  const selectedEvent = churchEvents.find(
    (event) => event.date === selectedDate
  );

  return (
    <main className="min-h-screen bg-[#faf8f2]">
      <TopBar />
      <Navbar />

      {/* HEADER */}
      <section className="bg-[#151512] px-5 py-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
          Grace Apostolic Faith Church
        </p>

        <h1 className="mt-2 font-[var(--font-playfair)] text-4xl font-bold text-white">
          Church Events
        </h1>

        <p className="mt-3 text-sm text-white/70">
          Worship • Prayer • Fellowship
        </p>
      </section>

      {/* CALENDAR */}
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-[850px]">

          {/* CALENDAR TOP */}
          <div className="rounded-t-2xl border border-black/10 bg-white px-4 py-5 md:px-6">

            {/* MONTH TITLE */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Church Calendar
                </p>

                <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
              </div>

              <CalendarDays
                size={26}
                className="text-[#8b1e1e]"
              />
            </div>

            {/* CONTROLS */}
            <div className="flex flex-wrap items-center gap-2">

              {/* PREVIOUS */}
              <button
                onClick={previousMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white transition hover:border-[#d4af37] hover:bg-[#fff8e1]"
              >
                <ChevronLeft size={18} />
              </button>

              {/* MONTH */}
              <div className="relative">
                <select
                  value={currentMonth}
                  onChange={(e) => {
                    setCurrentMonth(Number(e.target.value));
                    setSelectedDate(null);
                  }}
                  className="h-10 appearance-none rounded-lg border border-black/10 bg-white py-2 pl-4 pr-9 text-sm font-medium outline-none focus:border-[#d4af37]"
                >
                  {shortMonths.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3"
                />
              </div>

              {/* YEAR */}
              <div className="relative">
                <select
                  value={currentYear}
                  onChange={(e) => {
                    setCurrentYear(Number(e.target.value));
                    setSelectedDate(null);
                  }}
                  className="h-10 appearance-none rounded-lg border border-black/10 bg-white py-2 pl-4 pr-9 text-sm font-medium outline-none focus:border-[#d4af37]"
                >
                  {Array.from({ length: 11 }, (_, i) => 2024 + i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3"
                />
              </div>

              {/* EVENT TYPE */}
              <div className="relative">
                <select
                  className="h-10 appearance-none rounded-lg border border-black/10 bg-white py-2 pl-4 pr-9 text-sm font-medium outline-none"
                  defaultValue="church"
                >
                  <option value="church">Church Events</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3"
                />
              </div>

              {/* NEXT */}
              <button
                onClick={nextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white transition hover:border-[#d4af37] hover:bg-[#fff8e1]"
              >
                <ChevronRight size={18} />
              </button>

              {/* TODAY */}
              <button
                onClick={goToday}
                className="ml-auto h-10 rounded-lg border border-black/10 bg-white px-4 text-sm font-medium transition hover:border-[#d4af37] hover:bg-[#fff8e1]"
              >
                Today
              </button>
            </div>
          </div>

          {/* CALENDAR BODY */}
          <div className="overflow-hidden rounded-b-2xl border-x border-b border-black/10 bg-white shadow-sm">

            {/* WEEK DAYS */}
            <div className="grid grid-cols-7 border-b border-black/10 bg-[#151512]">
              {[
                "SUN",
                "MON",
                "TUE",
                "WED",
                "THU",
                "FRI",
                "SAT",
              ].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-[11px] font-bold tracking-wider text-[#d4af37]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7">
              {calendarDays.map((item, index) => {
                const event = item.currentMonth
                  ? getEvent(item.day)
                  : undefined;

                const dateString = item.currentMonth
                  ? getDateString(item.day)
                  : "";

                const isSelected =
                  selectedDate === dateString;

                const isToday =
                  item.currentMonth &&
                  item.day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.currentMonth) {
                        setSelectedDate(dateString);
                      }
                    }}
                    className={`relative min-h-[72px] border-b border-r border-black/5 p-2 text-left transition md:min-h-[88px] ${
                      !item.currentMonth
                        ? "bg-[#fafafa] text-gray-300"
                        : event
                        ? "bg-[#fffaf0] hover:bg-[#fff4d6]"
                        : "bg-white hover:bg-[#faf8f2]"
                    } ${
                      isSelected
                        ? "ring-2 ring-inset ring-[#8b1e1e]"
                        : ""
                    }`}
                  >
                    {/* DATE */}
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                        isToday
                          ? "bg-[#8b1e1e] text-white"
                          : event
                          ? "bg-[#d4af37] text-[#151512]"
                          : item.currentMonth
                          ? "text-[#151512]"
                          : "text-gray-300"
                      }`}
                    >
                      {item.day}
                    </div>

                    {/* EVENT DOT */}
                    {event && (
                      <span className="absolute right-2 top-3 h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
                    )}

                    {/* EVENT NAME */}
                    {event && (
                      <div className="mt-2 hidden md:block">
                        <p className="line-clamp-2 text-[10px] font-bold leading-3 text-[#8b1e1e]">
                          {event.title}
                        </p>

                        <p className="mt-1 text-[9px] text-gray-500">
                          {event.time}
                        </p>
                      </div>
                    )}

                    {/* MOBILE EVENT */}
                    {event && (
                      <div className="mt-1 md:hidden">
                        <p className="truncate text-[8px] font-bold text-[#8b1e1e]">
                          {event.title}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SELECTED EVENT */}
          {selectedEvent && (
            <div className="mt-5 rounded-xl border border-[#d4af37]/40 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff3c4]">
                  <CalendarDays
                    size={22}
                    className="text-[#8b1e1e]"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8b1e1e]">
                    Church Event
                  </p>

                  <h3 className="mt-1 font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                    {selectedEvent.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Clock3 size={15} />
                      {selectedEvent.time}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEGEND */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
            Church Event
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}