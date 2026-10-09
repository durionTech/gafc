"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Search,
  Music,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const songs = [
  {
    title: "உம் பாதம் பணிந்தேன் (FAST BEAT) | Um Patham Paninthen",
    artist: "Rev. Samuel Issac Newton J",
    image: "/images/pastor.jpeg",
    youtube: "https://youtu.be/Z1kjbqrFZuA?si=5cK7wqPDTSjnm50I",
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#151512] px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.18),transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-[#151512]">
            <Music size={30} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Grace Apostolic Faith Church
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold text-white md:text-6xl">
            Worship Songs
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">
            A collection of worship and praise songs to fill your
            heart with faith, hope and love.
          </p>
        </div>
      </section>

      {/* SONG SECTION */}
      <section className="px-5 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e1e]">
                Listen & Worship
              </p>

              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
                Our Song Collection
              </h2>

              <div className="mt-4 h-1 w-14 rounded-full bg-[#d4af37]" />
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
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

          {/* SONG ROW */}
          {filteredSongs.length > 0 ? (
            <div className="space-y-12">

              {/* ROW 1 */}
              <SongRow
                title="Latest Worship Songs"
                songs={filteredSongs.slice(0, 3)}
              />

              {/* ROW 2 */}
              {filteredSongs.length > 3 && (
                <SongRow
                  title="More Praise Songs"
                  songs={filteredSongs.slice(3)}
                />
              )}

            </div>
          ) : (
            <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
              <Music
                size={45}
                className="mx-auto text-[#d4af37]"
              />

              <h3 className="mt-5 font-[var(--font-playfair)] text-2xl font-bold">
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
      <section className="bg-[#8b1e1e] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">

          <Music className="mx-auto text-[#d4af37]" size={42} />

          <h2 className="mt-6 font-[var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
            Let Every Song Become a Prayer
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
            Worship with us and experience God's presence through
            music, praise and prayer.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3 font-semibold text-[#151512] transition hover:bg-white"
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


/* =====================================================
   SONG ROW
===================================================== */

function SongRow({
  title,
  songs,
}: {
  title: string;
  songs: typeof songs;
}) {
  return (
    <div>

      {/* ROW TITLE */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#151512]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Swipe to explore
          </p>
        </div>

        <div className="hidden items-center gap-2 text-sm text-[#8b1e1e] md:flex">
          <span>View all</span>
          <ArrowRight size={16} />
        </div>
      </div>

      {/* HORIZONTAL SCROLL */}
      <div
        className="
          flex
          gap-5
          overflow-x-auto
          pb-5
          snap-x
          snap-mandatory
          scrollbar-hide
        "
      >

        {songs.map((song, index) => (
          <SongCard
            key={index}
            song={song}
          />
        ))}

      </div>
    </div>
  );
}


/* =====================================================
   SONG CARD
===================================================== */

function SongCard({
  song,
}: {
  song: (typeof songs)[number];
}) {
  return (
    <div
      className="
        group
        relative
        w-[210px]
        flex-shrink-0
        snap-start
        overflow-hidden
        rounded-2xl
        bg-[#151512]
        shadow-lg
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        sm:w-[230px]
        md:w-[250px]
      "
    >

      {/* IMAGE */}
      <div className="relative aspect-[9/12] overflow-hidden">

        <img
          src={song.image}
          alt={song.title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />

        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {/* PLAY BUTTON */}
        <a
          href={song.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play ${song.title}`}
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-14
            w-14
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#d4af37]
            text-[#151512]
            shadow-xl
            opacity-90
            transition
            duration-300
            hover:scale-110
            group-hover:opacity-100
          "
        >
          <Play
            size={24}
            fill="currentColor"
          />
        </a> 

        {/* SONG INFO */}
        <div className="absolute bottom-0 left-0 right-0 p-4">

          <h4 className="line-clamp-2 font-[var(--font-playfair)] text-lg font-bold text-white">
            {song.title}
          </h4>

          <p className="mt-1 truncate text-xs text-white/65">
            {song.artist}
          </p>

        </div>
      </div>

      {/* BOTTOM ACTION */}
      <div className="flex items-center justify-between bg-[#151512] px-4 py-3">

        <span className="text-[11px] uppercase tracking-wider text-white/40">
          YouTube
        </span>

        <a
          href={song.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-[#d4af37] transition hover:text-white"
        >
          Listen
          <ExternalLink size={13} />
        </a>

      </div>
    </div>
  );
}