"use client";

import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import NextImage from "next/image";
import {
  Upload,
  Trash2,
  MapPin,
  Loader2,
  AlertCircle,
  X,
  ImageIcon,
} from "lucide-react";
import { galleryService } from "@/lib/services/gallery.service";

interface GalleryImage {
  id: string;
  imageUrl: string;
  alt?: string;
  caption?: string;
  location: string;
  height?: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Upload form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setLoading(true);
    setError("");
    try {
      const data = await galleryService.adminGetAll();
      setImages(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      setError("Failed to load gallery. Displaying mock data.");
      const { galleryImages: staticImages } = await import("@/lib/data");
      // Map static data shape to GalleryImage shape
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setImages((staticImages as any[]).map((img: any) => ({ ...img, imageUrl: img.imageUrl ?? img.src ?? "" })));
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  function clearSelection() {
    setSelectedFile(null);
    setPreviewUrl("");
    setCaption("");
    setLocation("");
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setUploadError("");
    try {
      await galleryService.upload(selectedFile, {
        alt: caption || selectedFile.name,
        location: location || undefined,
        height: "medium",
      });
      clearSelection();
      fetchImages();
    } catch (err: any) {
      setUploadError(
        err?.response?.data?.message ?? "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await galleryService.remove(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      setError("Failed to delete image.");
    } finally {
      setDeleteConfirm(null);
    }
  }

  return (
    <AdminShell title="Gallery">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Gallery</h2>
          <p className="text-[#6B7280] text-sm">{images.length} photos</p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Upload Area */}
      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6 mb-6">
        <h3 className="text-base font-bold text-white mb-4">Upload Photo</h3>

        {!selectedFile ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full py-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              dragOver
                ? "border-[#F97316] bg-[#F97316]/5"
                : "border-[#374151] hover:border-[#14532D] hover:bg-[#14532D]/5"
            }`}
          >
            <div className="w-14 h-14 bg-[#1F2937] rounded-2xl flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-[#6B7280]" />
            </div>
            <p className="text-[#F5F5DC] font-medium mb-1">
              Drag & drop a photo here
            </p>
            <p className="text-sm text-[#6B7280] mb-4">
              or click to browse — PNG, JPG, WEBP up to 10MB
            </p>
            <button
              type="button"
              className="px-5 py-2 bg-[#1F2937] hover:bg-[#374151] text-[#F5F5DC] text-sm font-medium rounded-xl transition-colors"
            >
              Choose File
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Preview */}
            <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-[#1F2937] flex-shrink-0">
              <NextImage
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                onClick={clearSelection}
                className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Meta */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Caption / Alt Text
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe this photo..."
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hunza Valley, Gilgit-Baltistan"
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-[#F5F5DC] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                />
              </div>

              {uploadError && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {uploadError}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-[#F5F5DC] text-sm font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-5 py-2 bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Gallery Grid */}
      <div>
        <h3 className="text-base font-bold text-white mb-4">
          All Photos
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 text-[#F97316] animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#6B7280]">
            <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
            <p className="font-medium">No photos yet</p>
            <p className="text-sm mt-1">Upload your first photo above</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-[#111827] border border-[#1F2937]"
              >
                <div
                  className={`relative w-full overflow-hidden rounded-2xl ${
                    img.height === "tall"
                      ? "h-64"
                      : img.height === "short"
                      ? "h-36"
                      : "h-48"
                  }`}
                >
                  <NextImage
                    src={img.imageUrl}
                    alt={img.alt ?? img.caption ?? 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3">
                    {/* Delete button */}
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setDeleteConfirm(img.id)}
                        className="w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Caption */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                          <span className="text-white text-xs truncate">
                            {img.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-2">Delete Photo</h3>
            <p className="text-[#6B7280] text-sm mb-6">
              Are you sure you want to permanently delete this photo? This
              action cannot be undone.
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
