"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Loader2, ImagePlus, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import PastorSidebar from "@/components/PastorSidebar";

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
};

export default function PastorGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/admin/login");
      return;
    }
    fetchGallery();
  }

  async function fetchGallery() {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !imageFile) {
      alert("Please enter a title and select an image file.");
      return;
    }

    setUploading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    // Upload to Storage bucket ('promises' or 'gallery')
    const { error: uploadError } = await supabase.storage
      .from("promises")
      .upload(filePath, imageFile, { upsert: true });

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("promises")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // Save record to table
    const { error: insertError } = await supabase.from("gallery").insert({
      title: title.trim(),
      image_url: imageUrl,
    });

    if (insertError) {
      alert("Error saving record: " + insertError.message);
    } else {
      alert("Gallery photo published successfully!");
      setTitle("");
      setImageFile(null);
      fetchGallery();
    }

    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchGallery();
    }
  }

  return (
    <PastorSidebar>
      <div className="mb-8">
        <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
          Manage Gallery Photos
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload and remove photos displayed in the homepage gallery section.
        </p>
      </div>

      {/* UPLOAD FORM */}
      <div className="mb-10 rounded-2xl border border-[#d4af37]/30 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#151512] mb-4">Add New Photo</h2>

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
              Photo Title / Caption
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunday Worship Service"
              className="w-full rounded-lg border border-black/15 bg-[#faf8f2] px-4 py-3 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#151512]">
              Image File
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d4af37]/50 bg-[#faf8f2] p-6 text-sm font-semibold text-[#151512] hover:bg-[#fffaf0] transition">
              <Upload size={20} className="text-[#8b1e1e]" />
              {imageFile ? imageFile.name : "Choose Photo from Computer"}
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#151512] py-3.5 font-semibold text-[#d4af37] transition hover:bg-[#8b1e1e] hover:text-white disabled:opacity-60 shadow-md"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Uploading Photo...
              </>
            ) : (
              <>
                <Plus size={18} />
                Publish to Gallery
              </>
            )}
          </button>
        </form>
      </div>

      {/* EXISTING ITEMS GRID */}
      <h2 className="text-xl font-bold text-[#151512] mb-4">Uploaded Gallery Photos</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#8b1e1e]" size={30} />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center border border-black/5">
          <ImagePlus size={36} className="mx-auto text-[#d4af37]" />
          <p className="mt-3 text-sm text-gray-500">No photos added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-black/10 bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-lg"
                />
                <p className="mt-3 text-sm font-bold text-[#151512] truncate">
                  {item.title}
                </p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/50 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={14} />
                Delete Photo
              </button>
            </div>
          ))}
        </div>
      )}
    </PastorSidebar>
  );
}