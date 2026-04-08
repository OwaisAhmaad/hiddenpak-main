import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, Share2, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { blogs } from "@/lib/data";

type Props = { params: { slug: string } };

const categoryColors: Record<string, "emerald" | "blue" | "orange" | "purple"> = {
  Trekking: "emerald",
  Culture: "blue",
  Adventure: "orange",
  "Road Trip": "purple",
  Wildlife: "emerald",
  Story: "blue",
};

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default function BlogDetailPage({ params }: Props) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => blog.relatedSlugs.includes(b.slug));

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>

        {/* Title Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={categoryColors[blog.category] || "emerald"}>
                {blog.category}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Author + Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-gray-100 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image
                src={blog.authorImage}
                alt={blog.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-500 max-w-xs">{blog.authorBio}</p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-gray-800 prose-a:text-emerald-600 prose-li:text-gray-600">
          {blog.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-gray-900 font-heading mt-10 mb-4"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <p key={i} className="font-semibold text-gray-800 mt-4 mb-2">
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="text-gray-600 ml-4 mb-1">
                  {line.replace("- ", "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <div key={i} className="h-4" />;
            }
            return (
              <p key={i} className="text-gray-600 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
            <Tag className="w-4 h-4" />
            Tags:
          </div>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} href={`/blogs/${rel.slug}`} className="group">
                  <div className="card bg-white flex gap-4 p-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge
                        variant={categoryColors[rel.category] || "emerald"}
                        className="mb-2"
                      >
                        {rel.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors font-heading">
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {rel.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 flex-shrink-0 mt-1 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
