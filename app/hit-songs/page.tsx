"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Search,
  Music,
  ArrowRight,
} from "lucide-react";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const songs = [
  {
    title: "Song Name 1",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/pastor.jpeg",
    youtube: "https://youtu.be/Z1kjbqrFZuA?si=5nEDLM7I12hGZV4S",
  },
  {
    title: "Song Name 2",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/pastor.jpeg",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  },
  {
    title: "Song Name 3",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/songs/song-3.jpg",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  },
  {
    title: "Song Name 4",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/songs/song-4.jpg",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  },
  {
    title: "Song Name 5",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/songs/song-5.jpg",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  },
  {
    title: "Song Name 6",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/songs/song-6.jpg",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  },
];

export default function HitSongsPage() {
  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#faf8f2]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#151512] px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-[#151512]">
            <Music size={30} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Grace Apostolic Faith Church
          </p>

          <h1 className="font-[var(--font-playfair)] text-4xl font-bold text-white md:text-6xl">
            Hit Songs
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Listen to our favourite worship songs and praise tracks
            that inspire faith, hope and love.
          </p>
        </div>
      </section>

      {/* Songs */}
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1e1e]">
                Worship & Praise
              </p>

              <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512] md:text-4xl">
                Our Hit Song List
              </h2>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#d4af37]" />
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search songs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-5 text-sm outline-none transition focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Song Grid */}
          {filteredSongs.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {filteredSongs.map((song, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-[#151512]">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Play Button */}
                    <a
                      href={song.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d4af37] text-[#151512] shadow-lg transition hover:scale-110"
                    >
                      <Play size={23} fill="currentColor" />
                    </a>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8b1e1e]">
                      Worship Song
                    </p>

                    <h3 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512]">
                      {song.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {song.artist}
                    </p>

                    <a
                      href={song.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1e1e] transition hover:text-[#d4af37]"
                    >
                      Listen Now
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <Music className="mx-auto mb-4 text-[#d4af37]" size={40} />

              <h3 className="font-[var(--font-playfair)] text-2xl font-bold">
                No songs found
              </h3>

              <p className="mt-2 text-gray-500">
                Try searching with another song name.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8b1e1e] px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
            Let Every Song Become a Prayer
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
            Worship with us, grow in faith and experience the
            presence of God through music.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3 font-semibold text-[#151512] transition hover:bg-white"
          >
            Back to Home
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}