"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import PastorSidebar from "@/components/PastorSidebar";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  published_at: string;
};

export default function PastorBlogsPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Pastor Samuel");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/admin/login");
      return;
    }
    loadBlogs();
  };

  const loadBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  // Auto-generate URL slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    setSubmitting(true);
    const slug = generateSlug(title);

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        excerpt: excerpt || title,
        content,
        cover_image: coverImage || null,
        author,
      },
    ]);

    setSubmitting(false);

    if (error) {
      alert("Error publishing blog: " + error.message);
    } else {
      alert("Blog published successfully!");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setShowForm(false);
      loadBlogs();
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <PastorSidebar>
      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#151512]">
            Church Blogs & Articles
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Publish devotionals, spiritual insights, and updates for church members.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#8b1e1e] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#6e1818]"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "Write New Article"}
        </button>
      </div>

      {/* CREATE BLOG FORM MODAL / SECTION */}
      {showForm && (
        <div className="mb-10 rounded-2xl border border-[#d4af37]/40 bg-white p-6 shadow-md">
          <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512] mb-4">
            Publish New Blog Post
          </h2>

          <form onSubmit={handleCreateBlog} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Walking in Divine Grace"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Pastor Samuel"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Cover Image URL (Optional)
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Short Excerpt (Summary for Cards)
              </label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief 1-2 sentence summary of the message..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Article Content *
              </label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your devotional or article content here..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8b1e1e] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#151512] px-6 py-3 text-xs font-bold text-[#d4af37] shadow-md transition hover:bg-black disabled:opacity-50"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              Publish Article
            </button>
          </form>
        </div>
      )}

      {/* EXISTING BLOG LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#8b1e1e]" size={30} />
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-black/5">
          <BookOpen size={35} className="mx-auto text-[#d4af37]" />
          <h2 className="mt-4 font-[var(--font-playfair)] text-xl font-bold">
            No Blog Posts Yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Click &quot;Write New Article&quot; above to publish your first church blog.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#8b1e1e]" />
                    {new Date(post.published_at).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </span>
                  <span>•</span>
                  <span>By {post.author}</span>
                </div>

                <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[#151512]">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                  {post.excerpt || post.content}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-black/10 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  View Live
                </a>

                <button
                  onClick={() => deleteBlog(post.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PastorSidebar>
  );
}