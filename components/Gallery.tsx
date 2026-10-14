"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
};

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setGalleryImages(data);
      }
      setLoading(false);
    }

    fetchGallery();
  }, []);

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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#8b1e1e]" size={32} />
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white p-12 text-center border border-black/5">
            <ImageIcon size={36} className="mx-auto text-[#c69b32]" />
            <p className="mt-3 text-sm font-semibold text-gray-700">No photos uploaded yet.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.image_url)}
                className="group relative overflow-hidden rounded-lg bg-white shadow-xs"
              >
                <img
                  src={image.image_url}
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
        )}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={selectedImage}
            alt="Church event expanded"
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}