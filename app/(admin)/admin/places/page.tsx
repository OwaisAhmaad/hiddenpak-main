"use client";

import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import NextImage from "next/image";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  X,
  Star,
  Upload,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { placesService } from "@/lib/services/places.service";

interface Place {
  id: string;
  name: string;
  region: string;
  category: string;
  description: string;
  rating: number;
  image?: string;
  published?: boolean;
  altitude?: string;
  bestTime?: string;
}

const REGIONS = [
  "Gilgit-Baltistan",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Azad Kashmir",
  "Balochistan",
  "Sindh",
];

const CATEGORIES = [
  "Mountain",
  "Valley",
  "Lake",
  "Plateau",
  "Town",
  "City",
  "Forest",
  "Desert",
  "Beach",
];

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRegion, setFormRegion] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLongDescription, setFormLongDescription] = useState("");
  const [formAltitude, setFormAltitude] = useState("");
  const [formBestTime, setFormBestTime] = useState("");
  const [formRating, setFormRating] = useState("4.5");
  const [formPublished, setFormPublished] = useState(true);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [formImagePreview, setFormImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPlaces();
  }, [search, regionFilter, categoryFilter]);

  async function fetchPlaces() {
    setLoading(true);
    setError("");
    try {
      const data = await placesService.getAll({
        search: search || undefined,
        region: regionFilter || undefined,
        category: categoryFilter || undefined,
      });
      setPlaces(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      setError("Failed to load places. Displaying mock data.");
      // Fallback to static import for UI preview
      const { places: staticPlaces } = await import("@/lib/data");
      setPlaces(staticPlaces as Place[]);
    } finally {
      setLoading(false);
    }
  }

  function openModal() {
    setFormName("");
    setFormRegion("");
    setFormCategory("");
    setFormDescription("");
    setFormLongDescription("");
    setFormAltitude("");
    setFormBestTime("");
    setFormRating("4.5");
    setFormPublished(true);
    setFormImage(null);
    setFormImagePreview("");
    setSubmitError("");
    setShowModal(true);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormImage(file);
    setFormImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!formName || !formRegion || !formCategory) {
      setSubmitError("Name, region, and category are required.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", formName);
      fd.append("region", formRegion);
      fd.append("category", formCategory);
      fd.append("description", formDescription);
      fd.append("longDescription", formLongDescription);
      fd.append("altitude", formAltitude);
      fd.append("bestTime", formBestTime);
      fd.append("rating", formRating);
      fd.append("published", String(formPublished));
      if (formImage) fd.append("image", formImage);
      await placesService.create(fd);
      setShowModal(false);
      fetchPlaces();
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message ?? "Failed to create place. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await placesService.remove(id);
      setPlaces((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete place.");
    } finally {
      setDeleteConfirm(null);
    }
  }

  const filtered = places.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchRegion = !regionFilter || p.region === regionFilter;
    const matchCategory = !categoryFilter || p.category === categoryFilter;
    return matchSearch && matchRegion && matchCategory;
  });

  return (
    <AdminShell title="Places">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Places</h2>
          <p className="text-[#6B7280] text-sm">{places.length} total places</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Place
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-5 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search places..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-sm text-[#F5F5DC] placeholder-[#6B7280] focus:outline-none focus:border-[#14532D] transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-sm text-[#F5F5DC] focus:outline-none focus:border-[#14532D] transition-colors cursor-pointer"
          >
            <option value="">All Regions</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-sm text-[#F5F5DC] focus:outline-none focus:border-[#14532D] transition-colors cursor-pointer"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 text-[#F97316] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#6B7280]">
            No places found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1F2937]">
                  <th className="text-left text-[#6B7280] font-medium py-3 px-5">
                    Place
                  </th>
                  <th className="text-left text-[#6B7280] font-medium py-3 px-4 hidden sm:table-cell">
                    Region
                  </th>
                  <th className="text-left text-[#6B7280] font-medium py-3 px-4 hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left text-[#6B7280] font-medium py-3 px-4 hidden lg:table-cell">
                    Rating
                  </th>
                  <th className="text-left text-[#6B7280] font-medium py-3 px-4 hidden xl:table-cell">
                    Status
                  </th>
                  <th className="text-left text-[#6B7280] font-medium py-3 px-5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]/60">
                {filtered.map((place) => (
                  <tr key={place.id} className="group hover:bg-[#1a2235] transition-colors">
                    {/* Image + Name */}
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-xl overflow-hidden bg-[#1F2937] flex-shrink-0">
                          {place.image ? (
                            <NextImage
                              src={place.image}
                              alt={place.name}
                              width={48}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#6B7280]">
                              <Search className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[#F5F5DC] font-medium">{place.name}</p>
                          <p className="text-[#6B7280] text-xs truncate max-w-[180px] sm:hidden">
                            {place.region}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#6B7280] hidden sm:table-cell">
                      {place.region}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="px-2.5 py-1 bg-[#14532D]/20 text-emerald-400 rounded-lg text-xs font-medium">
                        {place.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316]" />
                        <span className="text-[#F5F5DC] font-medium text-sm">
                          {place.rating?.toFixed(1) ?? "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden xl:table-cell">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          place.published !== false
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-[#1F2937] text-[#6B7280]"
                        }`}
                      >
                        {place.published !== false ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 bg-[#1F2937] hover:bg-blue-500/20 text-[#6B7280] hover:text-blue-400 rounded-lg transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(place.id)}
                          className="p-1.5 bg-[#1F2937] hover:bg-red-500/20 text-[#6B7280] hover:text-red-400 rounded-lg transition-colors"
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
      </div>

      {/* Create Place Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
              <h2 className="text-lg font-bold text-white">New Place</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#1F2937] text-[#6B7280] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {submitError && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Cover Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-36 bg-[#1F2937] border-2 border-dashed border-[#374151] hover:border-[#14532D] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative"
                >
                  {formImagePreview ? (
                    <NextImage
                      src={formImagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[#6B7280] mb-2" />
                      <p className="text-sm text-[#6B7280]">
                        Click to upload cover image
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Hunza Valley"
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                />
              </div>

              {/* Region + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Region <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                  >
                    <option value="">Select region</option>
                    {REGIONS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="A brief description of the place..."
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors resize-none"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Long Description
                </label>
                <textarea
                  rows={4}
                  value={formLongDescription}
                  onChange={(e) => setFormLongDescription(e.target.value)}
                  placeholder="Detailed description with history, attractions, tips..."
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors resize-none"
                />
              </div>

              {/* Altitude + Best Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Altitude
                  </label>
                  <input
                    type="text"
                    value={formAltitude}
                    onChange={(e) => setFormAltitude(e.target.value)}
                    placeholder="e.g. 3,300m"
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    value={formBestTime}
                    onChange={(e) => setFormBestTime(e.target.value)}
                    placeholder="e.g. May – September"
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                  />
                </div>
              </div>

              {/* Rating + Published */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Rating (0 – 5)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                    Visibility
                  </label>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl">
                    <button
                      type="button"
                      onClick={() => setFormPublished(!formPublished)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        formPublished ? "bg-[#14532D]" : "bg-[#374151]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          formPublished ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-[#F5F5DC]">
                      {formPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-[#1F2937] hover:bg-[#374151] text-[#F5F5DC] font-medium rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm flex items-center gap-2"
                >
                  {submitting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {submitting ? "Creating..." : "Create Place"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-2">Delete Place</h3>
            <p className="text-[#6B7280] text-sm mb-6">
              Are you sure you want to delete this place? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-[#1F2937] hover:bg-[#374151] text-[#F5F5DC] font-medium rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
