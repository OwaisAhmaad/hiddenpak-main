"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.login(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? "Invalid email or password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14532D]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#F5F5DC 1px, transparent 1px), linear-gradient(90deg, #F5F5DC 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to site
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#14532D] rounded-2xl flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="w-10 h-10 bg-[#1F2937] border border-[#374151] rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#F97316]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 font-heading">
            Hidden<span className="text-[#F97316]">Pak</span>
          </h1>
          <p className="text-[#6B7280] text-sm flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#14532D]" />
            Admin Portal — Authorized Access Only
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 font-heading">Sign In</h2>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hiddenpak.com"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#F5F5DC] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#6B7280] text-xs mt-6">
          &copy; {new Date().getFullYear()} HiddenPak. Admin access only.
        </p>
      </div>
    </div>
  );
}
