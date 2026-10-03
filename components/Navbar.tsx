"use client";

import { useState } from "react";
import {
  Menu,
  X,
  UserCircle,
  HeartHandshake,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About Us", href: "#about" },
    { name: "Ministries", href: "#ministries" },
    { name: "Sermons", href: "#sermons" },
    { name: "Events", href: "#events" },
    { name: "Give", href: "#give" },
    { name: "Visit Us", href: "#visit" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e3d8] bg-[#faf9f5]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/images/gafc_logo.jpeg"
            alt="Grace Apostolic Faith Church Trust"
            className="h-11 w-auto object-contain"
          />

          <div className="hidden sm:block">
            <div className="font-serif text-[17px] font-semibold text-[#641b23]">
              Grace Apostolic
            </div>

            <div className="text-[10px] uppercase tracking-[0.22em] text-[#a17d24]">
              Faith Church Trust
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#4d4641] transition hover:text-[#8c1f2b]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">

          <button className="flex items-center gap-2 rounded-md border border-[#d8ccb4] bg-[#f9f6ed] px-4 py-2 text-sm font-medium text-[#4d463d] transition hover:border-[#b18a2b]">
            <HeartHandshake className="h-4 w-4 text-[#9d7b22]" />
            Prayer
          </button>

          <button className="flex items-center gap-2 rounded-md bg-[#8a1724] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#70131e]">
            <span>▶</span>
            Watch Online
          </button> 
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#ddd4c4] lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#e5dfd4] bg-[#faf9f5] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#3e3935]"
              >
                {link.name}
              </a>
            ))}

            <button className="mt-2 rounded-md bg-[#8a1724] px-4 py-3 font-semibold text-white">
              Watch Online
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}