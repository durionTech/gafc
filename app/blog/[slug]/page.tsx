import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // UNWRAP PARAMS PROMISE (NEXT.JS 15 FIX)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#151512]">
      <TopBar />
      <Navbar />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8b1e1e] mb-6 hover:underline"
        >
          <ArrowLeft size={14} /> Back to All Articles
        </Link>

        <h1 className="font-[var(--font-playfair)] text-3xl font-bold sm:text-4xl lg:text-5xl text-[#151512] leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-600 border-y border-black/10 py-3 my-6">
          <span className="flex items-center gap-1.5 font-semibold text-black">
            <User size={14} className="text-[#8b1e1e]" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#8b1e1e]" />
            {new Date(post.published_at).toLocaleDateString("en-IN", {
              dateStyle: "long",
            })}
          </span>
        </div>

        {post.cover_image && (
          <div className="relative mb-8 h-[350px] w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap font-[var(--font-inter)]">
          {post.content}
        </div>
      </article>

      <Footer />
    </main>
  );
}