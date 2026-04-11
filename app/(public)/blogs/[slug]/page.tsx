import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Tag,
  Share2,
  MessageCircle,
  User,
  BookOpen,
  Hash,
} from "lucide-react";
import { blogs } from "@/lib/data";
import ReadingProgress from "@/components/ui/ReadingProgress";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

const categoryColors: Record<string, string> = {
  Trekking: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Culture: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Adventure: "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30",
  "Road Trip": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Wildlife: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Story: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  Food: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Photography: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      text: line.replace("## ", "").trim(),
      id: line.replace("## ", "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));
}

function parseContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return (
        <h2 key={i} id={id} className="text-2xl font-bold text-white font-heading mt-12 mb-5 scroll-mt-24">
          {text}
        </h2>
      );
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-[#F5F5DC] mt-6 mb-2">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.match(/^\d+\. /)) {
      return <li key={i} className="text-[#F5F5DC]/80 ml-6 mb-2 list-decimal leading-relaxed">{line.replace(/^\d+\. /, "")}</li>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-[#F5F5DC]/80 ml-6 mb-2 list-disc leading-relaxed">{line.replace("- ", "")}</li>;
    }
    if (line.trim() === "") return <div key={i} className="h-3" />;
    return <p key={i} className="text-[#F5F5DC]/80 leading-[1.85] text-base">{line}</p>;
  });
}

export default function BlogDetailPage({ params }: Props) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => blog.relatedSlugs.includes(b.slug));
  const headings = extractHeadings(blog.content);
  const pageUrl = `https://hiddenpak.com/blogs/${blog.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    author: { "@type": "Person", name: blog.author },
    datePublished: blog.date,
    publisher: { "@type": "Organization", name: "HiddenPak", url: "https://hiddenpak.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />

      <div className="min-h-screen bg-[#0B0F19]">
        {/* Hero */}
        <div className="relative h-[65vh] min-h-[480px]">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />
          <div className="absolute top-24 left-4 sm:left-8">
            <Link href="/blogs" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${categoryColors[blog.category] || "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30"}`}>
                  {blog.category}
                </span>
                <div className="flex items-center gap-1.5 text-white/70 text-sm"><Calendar className="w-4 h-4" />{blog.date}</div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm"><Clock className="w-4 h-4" />{blog.readTime}</div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading leading-tight">{blog.title}</h1>
            </div>
          </div>
        </div>

        {/* Article Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex gap-10">
            {/* Body */}
            <div className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
              {/* Author strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#1F2937] mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F97316]/20 border border-[#F97316]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5DC]">{blog.author}</p>
                    <p className="text-xs text-[#6B7280] max-w-xs leading-relaxed">{blog.authorBio}</p>
                  </div>
                </div>
                {/* Share */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B7280] mr-1">Share:</span>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-xl flex items-center justify-center text-[#6B7280] hover:border-sky-500/60 hover:text-sky-400 transition-all">
                    <Share2 className="w-4 h-4" />
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-xl flex items-center justify-center text-[#6B7280] hover:border-blue-500/60 hover:text-blue-400 transition-all">
                    <Share2 className="w-4 h-4" />
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(blog.title + " " + pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-xl flex items-center justify-center text-[#6B7280] hover:border-green-500/60 hover:text-green-400 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">{parseContent(blog.content)}</div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-[#1F2937]">
                <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mr-1"><Tag className="w-4 h-4" />Tags:</div>
                {blog.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Hash className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <div className="mt-10 bg-[#111827] border border-[#1F2937] rounded-2xl p-6 flex items-start gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#14532D] rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                  {blog.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-[#F97316]" />
                    <p className="text-xs text-[#6B7280] font-medium uppercase tracking-widest">About the Author</p>
                  </div>
                  <p className="font-bold text-white text-lg mb-2">{blog.author}</p>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{blog.authorBio}</p>
                </div>
              </div>
            </div>

            {/* TOC sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-[#F97316]" />
                    Table of Contents
                  </p>
                  <nav className="space-y-1">
                    {headings.map((h) => (
                      <a key={h.id} href={`#${h.id}`} className="block text-sm text-[#6B7280] hover:text-[#F97316] transition-colors py-1.5 px-2 rounded-lg hover:bg-[#F97316]/5 leading-snug">
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="border-t border-[#1F2937] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white font-heading mb-8">Related Stories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/blogs/${rel.slug}`} className="group block">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#F97316]/40 hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={rel.coverImage} alt={rel.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${categoryColors[rel.category] || "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30"}`}>
                            {rel.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-[#F97316] transition-colors font-heading mb-2">{rel.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#6B7280]">{rel.readTime}</span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F97316]">Read <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
