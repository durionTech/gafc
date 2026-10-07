import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#151512] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Church Info */}
          <div className="lg:col-span-1">

            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/images/gafc_logo.jpeg"
                alt="Grace Apostolic Faith Church"
                width={65}
                height={65}
                className="rounded-full object-contain"
              />

              <div>
                <h2 className="text-lg font-bold leading-tight">
                  Grace Apostolic
                  <br />
                  Faith Church
                </h2>

                <p className="mt-1 text-xs tracking-wider text-[#D4AF37]">
                  FAITH • HOPE • LOVE
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              A Christ-centered church committed to worship,
              fellowship, prayer and sharing the love of Jesus Christ
              with our community.
            </p>
     <div className="mt-7 flex gap-3">

  {/* Facebook */}
  <a
    href="#"
    aria-label="Facebook"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
  >
    <span className="text-sm font-bold">f</span>
  </a>

  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
  >
    <span className="text-[11px] font-bold">IG</span>
  </a>

  {/* YouTube */}
  <a
    href="#"
    aria-label="YouTube"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
  >
    <span className="text-[11px] font-bold">YT</span>
  </a>

</div>
            
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  href="/"
                  className="text-gray-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/sermons"
                  className="text-gray-400 transition hover:text-white"
                >
                  Sermons
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className="text-gray-400 transition hover:text-white"
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 transition hover:text-white"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>


          {/* Worship */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Worship With Us
            </h3>

            <div className="space-y-5">

              <div>
                <p className="text-sm font-semibold text-white">
                  Lord's Day Gathering
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Sunday • 9:00 AM
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Midweek Gathering
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Wednesday • 7:00 PM
                </p>
              </div>

              <Link
                href="/watch-online"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition hover:text-white"
              >
                Watch Online
                <ArrowUpRight className="h-4 w-4" />
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />

                <p className="text-sm leading-6 text-gray-400">
                  Grace Apostolic Faith Church Trust
                  <br />
                  Chennai, Tamil Nadu
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#D4AF37]" />

                <a
                  href="tel:+919XXXXXXXXX"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  +91 9XXXXXXXXX
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#D4AF37]" />

                <a
                  href="mailto:info@gafc.org"
                  className="break-all text-sm text-gray-400 transition hover:text-white"
                >
                  info@gafc.org
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* Red CTA Section */}
      <div className="border-t border-white/10 bg-[#8B1E1E]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-center md:flex-row md:text-left lg:px-8">

          <div>
            <h3 className="text-lg font-bold">
              Need Prayer?
            </h3>

            <p className="mt-1 text-sm text-white/75">
              We would love to pray with you and stand with you.
            </p>
          </div>

          <Link
            href="/prayer-request"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#8B1E1E] transition hover:bg-[#D4AF37] hover:text-black"
          >
            Submit Prayer Request
            <ArrowUpRight className="h-4 w-4" />
          </Link>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#0F0F0D]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center md:flex-row md:text-left lg:px-8">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Grace Apostolic Faith Church Trust.
            All rights reserved.
          </p>

          

        </div>

      </div>

    </footer>
  );
}