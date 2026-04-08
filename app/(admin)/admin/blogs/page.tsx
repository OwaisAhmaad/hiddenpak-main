import AdminShell from "@/components/admin/AdminShell";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { blogs } from "@/lib/data";

export default function AdminBlogsPage() {
  return (
    <AdminShell title="Blogs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading mb-1">
            Blog Posts
          </h2>
          <p className="text-gray-400">{blogs.length} total posts</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
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
            placeholder="Search blog posts..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors">
            <option value="">All Categories</option>
            <option>Trekking</option>
            <option>Culture</option>
            <option>Adventure</option>
            <option>Road Trip</option>
            <option>Wildlife</option>
          </select>
          <select className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors">
            <option value="">All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800/80">
                <th className="text-left text-gray-400 font-medium px-5 py-4">
                  Title
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Author
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Category
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Date
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Read Time
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Status
                </th>
                <th className="text-left text-gray-400 font-medium px-4 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="max-w-xs">
                      <p className="text-gray-200 font-medium truncate">
                        {blog.title}
                      </p>
                      <p className="text-gray-500 text-xs truncate mt-0.5">
                        {blog.excerpt.slice(0, 60)}...
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{blog.author}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{blog.date}</td>
                  <td className="px-4 py-4 text-gray-500">{blog.readTime}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium">
                      Published
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-colors" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            Showing 1 – {blogs.length} of {blogs.length} entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 bg-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
