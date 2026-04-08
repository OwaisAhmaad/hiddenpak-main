import AdminShell from "@/components/admin/AdminShell";
import Image from "next/image";
import { Plus, Search, Trash2, Edit, Upload, MapPin } from "lucide-react";
import { galleryImages } from "@/lib/data";

export default function AdminGalleryPage() {
  return (
    <AdminShell title="Gallery">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading mb-1">
            Gallery
          </h2>
          <p className="text-gray-400">{galleryImages.length} photos</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium px-5 py-2.5 rounded-xl transition-colors border border-gray-600">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" />
            Add Photo
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-gray-800 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search photos by location or description..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors">
          <option value="">All Locations</option>
          <option>Gilgit-Baltistan</option>
          <option>Khyber Pakhtunkhwa</option>
          <option>Punjab</option>
        </select>
      </div>

      {/* Upload Area */}
      <div className="bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700 hover:border-emerald-500/50 transition-colors p-8 mb-6 text-center cursor-pointer group">
        <div className="w-14 h-14 bg-gray-700 group-hover:bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors">
          <Upload className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
        </div>
        <p className="text-gray-300 font-medium mb-1">
          Drag and drop photos here
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse — PNG, JPG up to 10MB each
        </p>
        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors">
          Choose Files
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid group relative overflow-hidden rounded-2xl"
          >
            <div
              className={`relative w-full overflow-hidden rounded-2xl ${
                img.height === "tall"
                  ? "h-64"
                  : img.height === "medium"
                  ? "h-48"
                  : "h-36"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3">
                {/* Top Actions */}
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-amber-500/80 transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-red-500/80 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Caption */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-white text-xs truncate">{img.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
