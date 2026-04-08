import AdminShell from "@/components/admin/AdminShell";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react";
import { places } from "@/lib/data";

export default function AdminPlacesPage() {
  return (
    <AdminShell title="Places">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading mb-1">
            Places
          </h2>
          <p className="text-gray-400">{places.length} total places</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          Add Place
        </button>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search places..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors">
          <option value="">All Regions</option>
          <option>Gilgit-Baltistan</option>
          <option>Khyber Pakhtunkhwa</option>
          <option>Punjab</option>
        </select>
        <select className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors">
          <option value="">All Categories</option>
          <option>Mountain</option>
          <option>Valley</option>
          <option>Lake</option>
          <option>Plateau</option>
          <option>Town</option>
          <option>City</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-emerald-500/30 transition-all duration-200 group"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {place.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg font-medium">
                  {place.category}
                </span>
                <span className="text-xs text-gray-500">{place.region}</span>
              </div>
              <h3 className="font-bold text-gray-200 mb-1 font-heading">
                {place.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                {place.description}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl text-xs font-medium transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-xl text-xs font-medium transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700 hover:border-emerald-500/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 min-h-[300px] group">
          <div className="w-12 h-12 bg-gray-700 group-hover:bg-emerald-600/20 rounded-2xl flex items-center justify-center mb-3 transition-colors">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-gray-400 group-hover:text-emerald-400 font-medium text-sm transition-colors">
            Add New Place
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
