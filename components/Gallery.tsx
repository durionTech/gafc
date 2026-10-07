"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "/images/gallery/event-6.jpeg",
    title: "Sunday Worship",
  },
  {
    src: "/images/gallery/event-2.jpeg",
    title: "Church Fellowship",
  },
  {
    src: "/images/gallery/event-3.jpeg",
    title: "Youth Fellowship",
  },
  {
    src: "/images/gallery/event-4.jpeg",
    title: "Special Worship",
  },
  {
    src: "/images/gallery/event-5.jpeg",
    title: "Community Outreach",
  },
  {
    src: "/images/gallery/event-6.jpeg",
    title: "Church Gathering",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-[#f6f4ef] px-4 py-20 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c69b32]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b751b]">
              Church Life
            </span>

            <span className="h-px w-8 bg-[#c69b32]" />
          </div>

          <h2 className="font-serif text-3xl text-[#17130f] sm:text-4xl">
            Moments From Our Church
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6d6259]">
            A glimpse into worship, fellowship, outreach, and special
            moments shared together as a church family.
          </p>

        </div>


        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">

          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.src)}
              className="group relative overflow-hidden rounded-lg bg-white"
            >

              <img
                src={image.src}
                alt={image.title}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/40" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/70 px-4 py-3 text-left transition duration-300 group-hover:translate-y-0">

                <p className="text-xs font-semibold text-white">
                  {image.title}
                </p>

              </div>

            </button>
          ))}

        </div>


        {/* View Gallery Button */}
        <div className="mt-8 flex justify-center">

          <button className="group flex items-center gap-2 rounded-md border border-[#c69b32] px-5 py-3 text-xs font-bold text-[#8d6815] transition hover:bg-[#c69b32] hover:text-white">

            View All Photos

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />

          </button>

        </div>

      </div>


      {/* =================================
          IMAGE LIGHTBOX
      ================================= */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >

          {/* Close */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Large Image */}
          <img
            src={selectedImage}
            alt="Church event"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}

    </section>
  );
}