"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Search,
  Music,
  ArrowRight,
  ExternalLink,
  Repeat,
  SkipBack,
  SkipForward,
  Disc3,
  Volume2,
} from "lucide-react";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Song = {
  id: number;
  title: string;
  tamilTitle?: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  youtubeUrl: string;
  youtubeId: string;
};

const songs: Song[] = [
  {
    id: 1,
    tamilTitle: "உம் பாதம் பணிந்தேன் (FAST BEAT)",
    title: "Um Patham Paninthen",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "04:45",
    image: "/images/umakkaga-cd.jpeg",
    youtubeUrl: "https://youtu.be/Z1kjbqrFZuA?si=5cK7wqPDTSjnm50I",
    youtubeId: "Z1kjbqrFZuA",
  },
  {
    id: 2,
    tamilTitle: "இயேசுவே உமக்காக...",
    title: "Yesuvae Umakkaga (Title Track)",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "05:12",
    image: "/images/umakkaga-cd.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=Z1kjbqrFZuA",
    youtubeId: "Z1kjbqrFZuA",
  },
  {
    id: 3,
    tamilTitle: "கிருபையின் தேவனே",
    title: "Kirubaiyin Devanae",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "04:30",
    image: "/images/pastor.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=Z1kjbqrFZuA",
    youtubeId: "Z1kjbqrFZuA",
  },
  {
    id: 4,
    tamilTitle: "என் நம்பிக்கை நீரே",
    title: "En Nambikkai Neerae",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "05:05",
    image: "/images/pastor.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=Z1kjbqrFZuA",
    youtubeId: "Z1kjbqrFZuA",
  },
  {
    id: 5,
    tamilTitle: "ஆராதனை உமக்கே",
    title: "Aaradhanai Umakkae",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "04:50",
    image: "/images/umakkaga-cd.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=Z1kjbqrFZuA",
    youtubeId: "Z1kjbqrFZuA",
  },
  {
    id: 6,
    tamilTitle: "மகிமையின் ராஜாவே",
    title: "Magimaiyin Rajavae",
    artist: "Rev. Samuel Issac Newton J",
    album: "Yesuvae Umakkaga... Vol. 1",
    duration: "05:20",
    image: "/images/pastor.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=Z1kjbqrFZuA",
    youtubeId: "Z1kjbqrFZuA",
  },
];

export default function HitSongsPage() {
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      (song.tamilTitle &&
        song.tamilTitle.toLowerCase().includes(search.toLowerCase())) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSong = (song: Song) => {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = currentIndex >= songs.length - 1 ? 0 : currentIndex + 1;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  // YouTube Embed URL with Loop Support
  const embedUrl = `https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=${
    isPlaying ? 1 : 0
  }${isLooping ? `&loop=1&playlist=${currentSong.youtubeId}` : ""}`;

  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />

      {/* SPINNING CD ANIMATION KEYFRAMES */}
      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-cd-spin {
          animation: spinSlow 14s linear infinite;
        }
        .animate-cd-paused {
          animation: spinSlow 14s linear infinite;
          animation-play-state: paused;
        }
      `}</style>

      {/* HERO & FEATURED AUDIOBOOK / CD PLAYER */}
      <section className="relative overflow-hidden bg-[#151512] px-6 py-16 md:py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,30,30,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.15),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Grace Apostolic Faith Church Trust Presents
            </p>
            <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold md:text-5xl">
              இயேசுவே உமக்காக... <span className="text-[#d4af37]">Audio Worship</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65">
              Tune, Lyrics &amp; Vocals by <strong>Rev. Samuel Issac Newton</strong> • Music by{" "}
              <strong>Allen T. Onesimus</strong>
            </p>
          </div>

          {/* AUDIOBOOK / YOUTUBE LOOP STUDIO DECK */}
          <div className="grid items-center gap-8 rounded-3xl border border-[#d4af37]/30 bg-white/5 p-6 backdrop-blur-md md:grid-cols-12 md:p-8 shadow-2xl">
            {/* LEFT: SPINNING CD DISC ARTWORK */}
            <div className="flex flex-col items-center justify-center md:col-span-5">
              <div className="relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center">
                {/* Outer Golden Glow */}
                <div
                  className={`absolute inset-0 rounded-full bg-[#d4af37]/20 blur-xl transition-opacity duration-500 ${
                    isPlaying ? "opacity-100" : "opacity-30"
                  }`}
                />

                {/* Spinning Circular CD */}
                <div
                  className={`relative h-full w-full overflow-hidden rounded-full border-4 border-[#d4af37]/70 shadow-2xl ${
                    isPlaying ? "animate-cd-spin" : "animate-cd-paused"
                  }`}
                >
                  <img
                    src={currentSong.image}
                    alt={currentSong.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Center Vinyl Spindle Hole */}
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#d4af37] bg-[#151512] shadow-inner" />
                </div>
              </div>

              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#d4af37]/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                <Disc3 size={13} className={isPlaying ? "animate-spin" : ""} />
                {isPlaying ? "Now Playing • Audio Loop Active" : "Audio CD • Vol. 1"}
              </span>
            </div>

            {/* RIGHT: YOUTUBE PLAYER & AUDIOBOOK CONTROLS */}
            <div className="flex flex-col justify-between space-y-5 md:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-[#8b1e1e] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    {currentSong.album}
                  </span>
                  <span className="text-xs text-white/50">
                    Track {currentSong.id} of {songs.length} • {currentSong.duration}
                  </span>
                </div>

                <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-bold text-white md:text-3xl">
                  {currentSong.tamilTitle || currentSong.title}
                </h2>
                <p className="text-sm font-medium text-[#d4af37]">
                  {currentSong.title} — {currentSong.artist}
                </p>
              </div>

              {/* EMBEDDED YOUTUBE PLAYER */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg">
                <iframe
                  src={embedUrl}
                  title={currentSong.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* AUDIOBOOK / LOOP TRANSPORT CONTROLS */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#151512]/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Track"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#d4af37] hover:text-[#151512]"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-11 px-5 items-center gap-2 rounded-full bg-[#d4af37] text-xs font-bold text-[#151512] shadow-md transition hover:bg-white"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                    {isPlaying ? "Pause" : "Play Track"}
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Track"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#d4af37] hover:text-[#151512]"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* LOOP & YOUTUBE EXTERNAL LINK */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLooping(!isLooping)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${
                      isLooping
                        ? "bg-[#8b1e1e] text-white border border-[#d4af37]/50"
                        : "bg-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <Repeat size={14} />
                    {isLooping ? "Loop: ON" : "Loop: OFF"}
                  </button>

                  <a
                    href={currentSong.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-[#d4af37] transition hover:bg-white/10"
                  >
                    YouTube <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIOBOOK CHAPTERS / WORSHIP TRACKLIST SECTION */}
      <section className="px-5 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* HEADER & SEARCH */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e1e]">
                Audio Tracks &amp; Chapters
              </p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold md:text-4xl">
                Worship Album Tracklist
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-[#d4af37]" />
            </div>

            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Tamil or English title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-black/15 bg-white py-3 pl-11 pr-5 text-sm outline-none transition focus:border-[#8b1e1e]"
              />
            </div>
          </div>

          {/* TRACKLIST CARDS (AUDIOBOOK STYLE) */}
          {filteredSongs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredSongs.map((song) => {
                const isActive = currentSong.id === song.id;

                return (
                  <div
                    key={song.id}
                    onClick={() => handleSelectSong(song)}
                    className={`group cursor-pointer flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                      isActive
                        ? "border-[#8b1e1e] bg-[#151512] text-white shadow-lg"
                        : "border-black/10 bg-white hover:border-[#d4af37] hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Circular Mini Disc Thumbnail */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#d4af37]/60 bg-[#151512]">
                        <img
                          src={song.image}
                          alt={song.title}
                          className={`h-full w-full object-cover ${
                            isActive && isPlaying ? "animate-cd-spin" : ""
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                          {isActive && isPlaying ? (
                            <Volume2 size={20} className="text-[#d4af37] animate-pulse" />
                          ) : (
                            <Play
                              size={18}
                              fill="currentColor"
                              className="text-white transition-transform group-hover:scale-110"
                            />
                          )}
                        </div>
                      </div>

                      {/* Song Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                              isActive
                                ? "bg-[#8b1e1e] text-[#d4af37]"
                                : "bg-[#faf8f2] text-[#8b1e1e]"
                            }`}
                          >
                            Track 0{song.id}
                          </span>
                          <span
                            className={`text-xs ${
                              isActive ? "text-white/60" : "text-gray-400"
                            }`}
                          >
                            {song.duration}
                          </span>
                        </div>

                        <h3 className="mt-1 truncate font-[var(--font-playfair)] text-base font-bold">
                          {song.tamilTitle || song.title}
                        </h3>
                        <p
                          className={`truncate text-xs ${
                            isActive ? "text-[#d4af37]" : "text-gray-500"
                          }`}
                        >
                          {song.title} • {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* Right Action Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Open on YouTube"
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                          isActive
                            ? "border-white/15 text-[#d4af37] hover:bg-white/10"
                            : "border-black/10 text-gray-500 hover:border-[#8b1e1e] hover:text-[#8b1e1e]"
                        }`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-black/5 bg-white px-6 py-16 text-center shadow-xs">
              <Music size={42} className="mx-auto text-[#d4af37]" />
              <h3 className="mt-4 font-[var(--font-playfair)] text-2xl font-bold">
                No worship songs found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try searching with another Tamil or English song name.
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
            Worship with us and experience God&apos;s presence through music, praise
            and prayer.
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