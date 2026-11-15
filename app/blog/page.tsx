import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export const revalidate = 0; // Disable cache to see new blogs instantly

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />

      {/* HEADER */}
      <section className="bg-[#151512] px-6 py-14 text-white text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Church Insights & Messages
          </span>
          <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold md:text-5xl">
            Faith & Grace Blog
          </h1>
          <p className="mt-3 text-sm text-gray-300">
            Read inspiring devotionals, spiritual insights, and updates from Grace Apostolic Faith Church.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {!blogs || blogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-xs border border-black/5">
            <BookOpen size={40} className="mx-auto text-[#d4af37]" />
            <h2 className="mt-4 font-[var(--font-playfair)] text-xl font-bold">
              No Articles Published Yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Check back soon for inspiring devotionals and articles from our pastors.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/10 shadow-sm transition hover:shadow-md"
              >
                {post.cover_image && (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar size={13} className="text-[#8b1e1e]" />
                      {new Date(post.published_at).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </div>

                    <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#151512] group-hover:text-[#8b1e1e] transition">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#8b1e1e] hover:underline"
                    >
                      Read Full Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}