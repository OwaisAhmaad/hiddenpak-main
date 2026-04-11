"use client";

import { useState, useRef, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  X,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { blogsService, CreateBlogPayload } from "@/lib/services/blogs.service";

interface BlogRow {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  createdAt: string;
  readTime?: string;
  published: boolean;
  slug: string;
}

const CATEGORIES = ["Trekking", "Culture", "Adventure", "Road Trip", "Wildlife", "Food", "Photography"];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Form
  const [form, setForm] = useState<CreateBlogPayload>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    readTime: "",
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search / filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  async function fetchBlogs() {
    setLoadingList(true);
    setListError("");
    try {
      const res = await blogsService.getAll({ search, category: categoryFilter });
      setBlogs(res.data ?? []);
    } catch {
      setListError("Failed to load blog posts.");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryFilter]);

  function openModal() {
    setForm({ title: "", excerpt: "", content: "", category: "", author: "", readTime: "", published: false });
    setImageFile(null);
    setImagePreview("");
    setFormError("");
    setSuccessMsg("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!form.title || !form.excerpt || !form.content || !form.category) {
      setFormError("Title, excerpt, content and category are required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateBlogPayload = { ...form };
      if (imageFile) payload.coverImage = imageFile;
      await blogsService.create(payload);
      setSuccessMsg("Blog post created successfully!");
      fetchBlogs();
      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        (Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(", ")
          : null) ??
        "Failed to create blog post.";
      setFormError(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await blogsService.remove(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete blog post.");
    }
  }

  return (
    <AdminShell title="Blogs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading mb-1">Blog Posts</h2>
          <p className="text-gray-400">{blogs.length} total posts</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-2xl overflow-hidden">
        {loadingList ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading posts...
          </div>
        ) : listError ? (
          <div className="flex items-center justify-center py-16 text-red-400 gap-2">
            <AlertCircle className="w-5 h-5" />
            {listError}
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-gray-500">No blog posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/80">
                  <th className="text-left text-gray-400 font-medium px-5 py-4">Title</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Author</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Category</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Date</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Read Time</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Status</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="max-w-xs">
                        <p className="text-gray-200 font-medium truncate">{blog.title}</p>
                        <p className="text-gray-500 text-xs truncate mt-0.5">
                          {blog.excerpt?.slice(0, 60)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-400">{blog.author}</td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-gray-500">{blog.readTime ?? "—"}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          blog.published
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-colors"
                          title="View"
                          onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="w-8 h-8 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="w-8 h-8 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination placeholder */}
        {!loadingList && !listError && blogs.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              Showing 1 – {blogs.length} of {blogs.length} entries
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1.5 bg-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white font-heading">New Blog Post</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {formError && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {formError}
                </div>
              )}
              {successMsg && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  {successMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Exploring Hunza Valley"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="e.g. Ali Raza"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Excerpt <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Short description for the blog listing..."
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Content */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Full blog content..."
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Published toggle */}
                <div className="flex items-center gap-3 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published ?? false}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                  </label>
                  <span className="text-sm text-gray-300">Publish immediately</span>
                </div>

                {/* Cover Image */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Cover Image</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-700 hover:border-emerald-500/50 rounded-xl p-5 text-center cursor-pointer transition-colors"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 mx-auto object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Upload className="w-6 h-6" />
                        <span className="text-sm">Click to upload cover image</span>
                        <span className="text-xs">PNG, JPG, WEBP up to 5MB</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-700">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
