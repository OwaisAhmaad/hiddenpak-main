'use client';

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
const API = `${BACKEND}/api`;

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, MapPin, FileText, Image, BarChart3, TrendingUp,
  Menu, X, Bell, Plus, ArrowRight, Pencil,
  Trash2, Eye, Lock, Mail, ArrowLeft, AlertCircle, Settings,
  LogOut, Star, Facebook, Twitter, Youtube,
  Instagram, Mountain, TreePine, Building2, Droplets, Globe,
  Clock, ChevronDown, Home, BookOpen, Camera, Info, Phone,
  ExternalLink, Calendar, CheckCircle2, Loader2, MessageCircle
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface Place {
  id: string; slug: string; name: string; region: string;
  description: string; longDescription: string; image: string;
  gallery: string[]; rating: number; altitude: string;
  bestTime: string; category: string; featured: boolean;
}

interface Blog {
  id: string; slug: string; title: string; excerpt: string;
  content: string; coverImage: string; author: string;
  authorImage: string; authorBio: string; date: string;
  readTime: string; category: string; tags: string[]; published: boolean;
}

interface GalleryImage {
  id: string; src: string; alt: string; location: string; height: string;
}

interface Testimonial {
  id: string; name: string; location: string; avatar: string;
  rating: number; text: string;
}

interface AnalyticsData {
  totalEvents: number;
  eventTypes: { _id: string; count: number }[];
  recentEvents: { eventType: string; page: string; timestamp: string }[];
}

type View = 'home' | 'places' | 'blogs' | 'gallery' | 'about' | 'contact' | 'login' | 'dashboard' | 'admin-blogs' | 'admin-places' | 'admin-gallery' | 'admin-analytics' | 'admin-settings' | 'blog-detail';

// ============================================
// MAIN APP
// ============================================
export default function HiddenPakApp() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Data states
  const [places, setPlaces] = useState<Place[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch all data on mount
  const fetchData = useCallback(async () => {
    try {
      setFetchError(null);
      const [placesRes, blogsRes, galleryRes, testimonialsRes] = await Promise.all([
        fetch(`${API}/places`), fetch(`${API}/blogs`),
        fetch(`${API}/gallery`), fetch(`${API}/testimonials`)
      ]);
      const [placesData, blogsData, galleryData, testimonialsData] = await Promise.all([
        placesRes.json(), blogsRes.json(), galleryRes.json(), testimonialsRes.json()
      ]);
      const norm = (arr: any[]) => arr.map((d: any) => ({ ...d, id: d._id || d.id }));
      if (placesData.success) setPlaces(norm(placesData.data));
      if (blogsData.success) setBlogs(norm(blogsData.data));
      if (galleryData.success) setGalleryImages(norm(galleryData.data));
      if (testimonialsData.success) setTestimonials(norm(testimonialsData.data));
      const failed = [placesData, blogsData, galleryData, testimonialsData].find(d => !d.success);
      if (failed) setFetchError(failed.message || 'Failed to load data from backend.');
    } catch {
      setFetchError('Failed to connect to backend. Please make sure API server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fetchAnalytics = useCallback(async () => {
    try {
      let token = '';
      try { const s = sessionStorage.getItem('hiddenpak_admin'); if (s) { const u = JSON.parse(s); if (u.token) token = u.token; } } catch { /* ignore */ }
      const res = await fetch(`${API}/analytics`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const data = await res.json();
      if (data.success) setAnalytics(data.data);
    } catch { /* silent */ }

  }, []);

  // Check auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('hiddenpak_admin');
    if (auth) {
      try {
        const user = JSON.parse(auth);
        if (user && user.email) {
          setIsAdmin(true);
          setAdminUser({ email: user.email, name: user.name });
          fetchAnalytics();
        }
      } catch { /* ignore */ }
    }
  }, [fetchAnalytics]);

  const navigate = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = async (email: string, password: string) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    // Auth route returns { success, token, admin } directly (not nested under data)
    if (data.success && (data.token || data.data?.token)) {
      const admin = data.admin || data.data?.admin;
      const token = data.token || data.data?.token;
      setIsAdmin(true);
      setAdminUser(admin);
      sessionStorage.setItem('hiddenpak_admin', JSON.stringify({ ...admin, token }));
      navigate('dashboard');
      fetchAnalytics();
      return true;
    }
    throw new Error(data.message || 'Login failed');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    sessionStorage.removeItem('hiddenpak_admin');
    navigate('home');
  };

  const isPublicView = ['home', 'places', 'blogs', 'gallery', 'about', 'contact', 'blog-detail'].includes(currentView);
  const isAdminView = ['login', 'dashboard', 'admin-blogs', 'admin-places', 'admin-gallery', 'admin-analytics', 'admin-settings'].includes(currentView);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#14532D] rounded-2xl flex items-center justify-center animate-pulse">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#14532D] font-bold text-xl">Hidden</span>
            <span className="text-[#F97316] font-bold text-xl">Pak</span>
          </div>
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2E8B57] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {isPublicView ? (
          <PublicSite
            currentView={currentView}
            navigate={navigate}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            places={places}
            blogs={blogs}
            galleryImages={galleryImages}
            testimonials={testimonials}
            fetchError={fetchError}
            selectedBlogId={selectedBlogId}
            setSelectedBlogId={setSelectedBlogId}
            onAdminClick={() => navigate('login')}
          />
        ) : isAdminView ? (
          <AdminPanel
            currentView={currentView}
            navigate={navigate}
            isAdmin={isAdmin}
            adminUser={adminUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            places={places}
            blogs={blogs}
            galleryImages={galleryImages}
            analytics={analytics}
            fetchAnalytics={fetchAnalytics}
            fetchData={fetchData}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// PUBLIC SITE
// ============================================
function PublicSite({
  currentView, navigate, mobileMenuOpen, setMobileMenuOpen,
  places, blogs, galleryImages, testimonials, fetchError, selectedBlogId,
  setSelectedBlogId, onAdminClick
}: {
  currentView: View; navigate: (v: View) => void;
  mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void;
  places: Place[]; blogs: Blog[]; galleryImages: GalleryImage[];
  testimonials: Testimonial[]; fetchError: string | null; selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void; onAdminClick: () => void;
}) {
  const navItems = [
    { label: 'Home', view: 'home' as View, icon: Home },
    { label: 'Places', view: 'places' as View, icon: MapPin },
    { label: 'Blogs', view: 'blogs' as View, icon: BookOpen },
    { label: 'Gallery', view: 'gallery' as View, icon: Camera },
    { label: 'About', view: 'about' as View, icon: Info },
    { label: 'Contact', view: 'contact' as View, icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate('home')} className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/hiddenpak-logo.svg" alt="HiddenPak" className="w-full h-full" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:inline">
                <span className="text-[#14532D]">Hidden</span>
                <span className="text-[#F97316]">Pak</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.view}
                  onClick={() => navigate(item.view)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.view
                      ? 'text-[#14532D] bg-[#14532D]/10'
                      : 'text-gray-600 hover:text-[#14532D] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onAdminClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-[#14532D]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map(item => (
                  <button
                    key={item.view}
                    onClick={() => { navigate(item.view); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      currentView === item.view
                        ? 'text-[#14532D] bg-[#14532D]/10'
                        : 'text-gray-600 hover:text-[#14532D] hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => { onAdminClick(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#F97316] hover:bg-[#F97316]/10 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Admin Portal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {fetchError && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
              {fetchError}
            </div>
          </div>
        )}
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'home' && <HomePage navigate={navigate} places={places} blogs={blogs} galleryImages={galleryImages} testimonials={testimonials} setSelectedBlogId={setSelectedBlogId} />}
          {currentView === 'places' && <PlacesPage places={places} />}
          {currentView === 'blogs' && <BlogsPage blogs={blogs} navigate={navigate} setSelectedBlogId={setSelectedBlogId} />}
          {currentView === 'blog-detail' && <BlogDetailPage blogs={blogs} selectedBlogId={selectedBlogId} navigate={navigate} />}
          {currentView === 'gallery' && <GalleryPage images={galleryImages} />}
          {currentView === 'about' && <AboutPage />}
          {currentView === 'contact' && <ContactPage />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/hiddenpak-logo.svg" alt="HiddenPak" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-lg">
                  <span className="text-white">Hidden</span>
                  <span className="text-[#F97316]">Pak</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Travel deeper. Discover hidden beauty. Your gateway to Pakistan&apos;s most beautiful and hidden places.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Quick Links</h4>
              <div className="space-y-2">
                {navItems.map(item => (
                  <button key={item.view} onClick={() => navigate(item.view)} className="block text-gray-400 hover:text-[#F97316] text-sm transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Follow Us</h4>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://www.facebook.com/hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://x.com/hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.pinterest.com/hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <span className="text-sm font-bold">P</span>
                </a>
                <a href="https://www.youtube.com/@hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@hiddenpak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:bg-[#1F2937]/80 transition-colors">
                  <span className="text-sm font-bold">T</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1F2937] mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} HiddenPak. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp / Phone Floating Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <a
          href="https://wa.me/923119142765"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] rounded-full flex items-center justify-center text-white shadow-lg transition-colors animate-pulse"
          style={{ animationDuration: '2s' }}
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:03119142765"
          className="w-12 h-12 bg-[#0B0F19] hover:bg-[#1a1f2e] rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

// ============================================
// HOME PAGE
// ============================================
function HomePage({ navigate, places, blogs, galleryImages, testimonials, setSelectedBlogId }: {
  navigate: (v: View) => void; places: Place[]; blogs: Blog[];
  galleryImages: GalleryImage[]; testimonials: Testimonial[];
  setSelectedBlogId: (id: string | null) => void;
}) {
  const featuredPlaces = places.filter(p => p.featured).slice(0, 4);
  const recentBlogs = blogs.slice(0, 3);
  const previewImages = galleryImages.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full min-h-[78vh] overflow-hidden">
        {/* Full-width cinematic background — preloaded for LCP */}
        <img
          src="/images/rectangle-39389.png"
          alt="Woman hiking in the mountains of northern Pakistan"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="sync"
        />
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end min-h-[78vh] pt-20 pb-8 lg:pb-0 gap-6">

            {/* LEFT — Text content */}
            <div className="flex-1 flex flex-col justify-center lg:pb-16">
              {/* Eyebrow badge */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/25 rounded-full text-white/85 text-xs font-medium tracking-wide mb-7">
                  <Globe className="w-3 h-3 text-emerald-300" />
                  Explorer &amp; Travel
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] mb-6"
              >
                Explore Pakistan&apos;s{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-emerald-400">
                  Hidden Gems
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              >
                Discover the untouched wonders of nature, from majestic peaks to serene valleys.
                Immerse yourself in rich traditions, vibrant cultures, and timeless heritage.
                Uncover the hidden beauty of Pakistan that goes beyond the ordinary.
              </motion.p>

              {/* Location & Date selectors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* Location selector */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 sm:min-w-[210px] cursor-pointer hover:bg-white/15 transition-colors group">
                  <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Location</p>
                    <p className="text-white font-semibold text-sm mt-0.5">Abbottabad</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/50 flex-shrink-0 group-hover:text-white/80 transition-colors" />
                </div>

                {/* Date selector */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 sm:min-w-[210px] cursor-pointer hover:bg-white/15 transition-colors group">
                  <Calendar className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Date</p>
                    <p className="text-white font-semibold text-sm mt-0.5">13 May, 2025</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/50 flex-shrink-0 group-hover:text-white/80 transition-colors" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Hiking woman image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex items-end justify-end self-end flex-shrink-0"
            >
              <img
                src="/images/hiking-woman.png"
                alt="Explorer with backpack ready to discover Pakistan"
                className="h-[68vh] max-h-[580px] w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#14532D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${places.length}+`, label: 'Hidden Places', icon: MapPin },
              { value: `${blogs.length}+`, label: 'Travel Blogs', icon: FileText },
              { value: `${galleryImages.length}+`, label: 'Gallery Photos', icon: Camera },
              { value: '4.8', label: 'Avg Rating', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-emerald-300 mb-2" />
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-emerald-200/70 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Discover</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Featured Destinations</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Explore Pakistan&apos;s most breathtaking hidden gems, from alpine meadows to turquoise lakes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={place.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"} alt={place.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-[#14532D]">{place.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-semibold">{place.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0B0F19] mb-1">{place.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                    {place.region}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{place.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('places')} className="px-6 py-3 bg-[#14532D] hover:bg-[#14532D]/90 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 mx-auto">
              View All Places <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Tour Guide CTA */}
      <section className="py-16 sm:py-20 bg-[#2E8B57]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get a Local Tour Guide</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Connect with experienced local guides who know the hidden trails, secret spots, and rich stories of Pakistan&apos;s most beautiful regions.</p>
          <a href="https://wa.me/923119142765" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2E8B57] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Latest Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Travel Blogs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
                onClick={() => { setSelectedBlogId(blog.id); navigate('blog-detail'); }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.coverImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={blog.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#F97316] rounded-lg text-xs font-semibold text-white">{blog.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0B0F19] mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">{blog.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt={blog.author} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-gray-500 text-xs">{blog.author}</span>
                    </div>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />{blog.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Visual Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Gallery Showcase</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                  img.height === 'tall' ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <img src={img.src || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm">{img.alt}</p>
                  <p className="text-white/70 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />{img.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('gallery')} className="px-6 py-3 bg-[#14532D] hover:bg-[#14532D]/90 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 mx-auto">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Latest Updates</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Pakistan Travel News</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Stay up to date with the latest travel news, seasonal highlights, and destination guides.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fairy Meadows Opens for Summer Season',
                image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
                category: 'Destinations',
                date: 'Apr 18, 2025',
                excerpt: 'The iconic Fairy Meadows base camp near Nanga Parbat is now accessible as weather conditions improve. Visitors can enjoy lush green landscapes and panoramic mountain views.',
              },
              {
                title: 'Hunza Valley Named Top Asian Destination',
                image: 'https://images.unsplash.com/photo-1599236449793-2db7c0c9b2df?w=600&q=80',
                category: 'Awards',
                date: 'Apr 10, 2025',
                excerpt: 'Hunza Valley has been recognised by travel publications as one of Asia\'s top hidden gems. Cherry blossom season draws visitors from across the globe each spring.',
              },
              {
                title: 'New Eco-Tourism Initiative Launches in Gilgit-Baltistan',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
                category: 'Eco Travel',
                date: 'Apr 2, 2025',
                excerpt: 'A new government-backed initiative is promoting sustainable tourism across the Northern Areas, protecting pristine wilderness while supporting local communities.',
              },
            ].map((news, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#14532D] text-white text-xs font-semibold rounded-lg">
                    {news.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {news.date}
                  </div>
                  <h3 className="font-bold text-[#0B0F19] mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#F97316] text-sm font-semibold hover:gap-2.5 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure CTA Section with Woman Hiker */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#14532D] via-[#1a6e3d] to-[#0D3B20] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-emerald-300 text-xs font-semibold mb-4">
                <Mountain className="w-3 h-3" />
                Ready for Adventure?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Start Your Hidden Pakistan Journey Today
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Join thousands of adventurers who've discovered Pakistan's most breathtaking hidden destinations. From alpine peaks to serene valleys, your next unforgettable experience awaits.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('places')} className="px-6 py-3 bg-white hover:bg-gray-100 text-[#14532D] font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-lg">
                  Explore Destinations <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('blogs')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/30 backdrop-blur-sm">
                  Read Travel Guides
                </button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-orange-500/10 rounded-3xl blur-2xl" />
                <img 
                  src="https://images.unsplash.com/photo-1491555103944-7c628ba54d3d?w=600&q=80" 
                  alt="Adventure Woman Hiker" 
                  className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">What Travellers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-[#0B0F19]">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// PLACES PAGE
// ============================================
function PlacesPage({ places }: { places: Place[] }) {
  const categories = ['All', ...Array.from(new Set(places.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? places : places.filter(p => p.category === activeCategory);
  const categoryIcons: Record<string, any> = { Mountain: Mountain, Valley: TreePine, Plateau: Mountain, Town: Building2, City: Building2, Lake: Droplets };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Destinations</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Places to Visit</h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Explore Pakistan&apos;s most stunning hidden destinations.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-[#14532D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={place.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"} alt={place.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-[#14532D]">{place.category}</span>
                  {place.featured && <span className="px-2.5 py-1 bg-[#F97316] rounded-lg text-xs font-semibold text-white">Featured</span>}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{place.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#0B0F19] mb-1">{place.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316]" />{place.region}
                  {place.altitude && <> • <Mountain className="w-3.5 h-3.5 text-[#14532D]" />{place.altitude}</>}
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{place.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />Best: {place.bestTime}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// BLOGS PAGE
// ============================================
function BlogsPage({ blogs, navigate, setSelectedBlogId }: { blogs: Blog[]; navigate: (v: View) => void; setSelectedBlogId: (id: string | null) => void }) {
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? blogs : blogs.filter(b => b.category === activeCategory);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Stories & Guides</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Travel Blogs</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-[#14532D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog, i) => (
            <motion.article key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer" onClick={() => { setSelectedBlogId(blog.id); navigate('blog-detail'); }}>
              <div className="relative h-48 overflow-hidden">
                <img src={blog.coverImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={blog.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#F97316] rounded-lg text-xs font-semibold text-white">{blog.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0B0F19] mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><img src={blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt={blog.author} className="w-7 h-7 rounded-full object-cover" /><span className="text-gray-600 text-xs font-medium">{blog.author}</span></div>
                  <div className="flex items-center gap-3 text-gray-400 text-xs"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span><span>{blog.date}</span></div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// BLOG DETAIL PAGE
// ============================================
function BlogDetailPage({ blogs, selectedBlogId, navigate }: { blogs: Blog[]; selectedBlogId: string | null; navigate: (v: View) => void }) {
  const blog = blogs.find(b => b.id === selectedBlogId);
  if (!blog) return <div className="py-20 text-center text-gray-500">Blog not found</div>;

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('blogs')} className="flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-6 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Blogs
        </button>
        <img src={blog.coverImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={blog.title} className="w-full h-64 sm:h-96 object-cover rounded-2xl mb-8" />
        <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-lg">{blog.category}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-4 mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2"><img src={blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt={blog.author} className="w-10 h-10 rounded-full object-cover" /><div><p className="font-medium text-sm text-[#0B0F19]">{blog.author}</p><p className="text-gray-500 text-xs">{blog.authorBio}</p></div></div>
          <div className="flex items-center gap-3 text-gray-400 text-xs ml-auto"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span><span>{blog.date}</span></div>
        </div>
        <div className="prose prose-gray max-w-none">
          {blog.content.split('\n').map((p, i) => {
            if (p.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-[#0B0F19] mt-8 mb-4">{p.replace('## ', '')}</h2>;
            if (p.startsWith('**') && p.endsWith('**')) return <p key={i} className="font-semibold text-[#0B0F19] mt-4 mb-2">{p.replace(/\*\*/g, '')}</p>;
            if (p.startsWith('- ')) return <li key={i} className="text-gray-600 ml-4">{p.replace('- ', '')}</li>;
            if (p.trim()) return <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>;
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================
// GALLERY PAGE
// ============================================
function GalleryPage({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Visual Journey</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Photo Gallery</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.height === 'tall' ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'}`} onClick={() => setSelectedImage(img)}>
              <img src={img.src || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-sm">{img.alt}</p>
                <p className="text-white/70 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{img.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full">
            <img src={selectedImage.src} alt={selectedImage.alt} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"><X className="w-5 h-5" /></button>
            <div className="mt-4 text-center"><p className="text-white font-semibold">{selectedImage.alt}</p><p className="text-white/60 text-sm">{selectedImage.location}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Who We Are</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">HiddenPak is your gateway to Pakistan&apos;s most beautiful and hidden places. We believe travel is not just about destinations, but about stories, experiences, and connections. From untouched valleys to vibrant cultural streets, we uncover the unseen corners of Pakistan that deserve to be celebrated.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Mountain, title: 'Off the Beaten Path', desc: 'Discovering destinations missed by mainstream travel' },
              { icon: Globe, title: 'Authentic Experiences', desc: 'Promoting responsible and respectful tourism' },
              { icon: Compass, title: 'Support Local', desc: 'Supporting local communities through awareness' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#14532D]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-[#14532D]" />
                </div>
                <h3 className="font-bold text-[#0B0F19] mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTACT PAGE
// ============================================
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F97316] text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mt-2">Contact Us</h1>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19] mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-[#14532D] hover:bg-[#0D3B1F] text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input name="name" required value={form.name} onChange={handleChange} type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#14532D] transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" required value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#14532D] transition-colors" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input name="subject" required value={form.subject} onChange={handleChange} type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#14532D] transition-colors" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" required value={form.message} onChange={handleChange} rows={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#14532D] transition-colors resize-none" placeholder="Tell us more..." />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ADMIN PANEL
// ============================================
function AdminPanel({
  currentView, navigate, isAdmin, adminUser, onLogin, onLogout,
  places, blogs, galleryImages, analytics, fetchAnalytics, fetchData
}: {
  currentView: View; navigate: (v: View) => void; isAdmin: boolean;
  adminUser: { email: string; name: string } | null;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLogout: () => void;
  places: Place[]; blogs: Blog[]; galleryImages: GalleryImage[];
  analytics: AnalyticsData | null; fetchAnalytics: () => void;
  fetchData: () => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (currentView === 'login' || !isAdmin) {
    return <AdminLoginPage onLogin={onLogin} onBack={() => navigate('home')} />;
  }

  const sidebarItems = [
    { section: 'MAIN', items: [
      { label: 'Dashboard', view: 'dashboard' as View, icon: Compass },
      { label: 'Analytics', view: 'admin-analytics' as View, icon: BarChart3 },
    ]},
    { section: 'CONTENT', items: [
      { label: 'Blog Posts', view: 'admin-blogs' as View, icon: FileText },
      { label: 'Places', view: 'admin-places' as View, icon: MapPin },
      { label: 'Gallery', view: 'admin-gallery' as View, icon: Image },
    ]},
    { section: 'SETTINGS', items: [
      { label: 'Settings', view: 'admin-settings' as View, icon: Settings },
    ]},
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      {sidebarOpen && <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <aside className="w-64 flex flex-col h-screen sticky top-0 bg-[#111827] border-r border-[#1F2937]">
          <div className="px-6 py-5 border-b border-[#1F2937]">
            <button onClick={() => navigate('dashboard')} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center"><Compass className="w-5 h-5 text-white" /></div>
              <span className="font-bold text-base tracking-tight"><span className="text-white">Hidden</span><span className="text-[#F97316]">Pak</span></span>
            </button>
          </div>
          <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-6">
            {sidebarItems.map(({ section, items }) => (
              <div key={section}>
                <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest mb-2 px-3">{section}</p>
                <div className="space-y-0.5">
                  {items.map(({ label, view, icon: Icon }) => (
                    <button key={view} onClick={() => { navigate(view); setSidebarOpen(false); }} className={`w-full relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${currentView === view ? 'bg-[#14532D]/20 text-white border-l-2 border-[#F97316] pl-[10px]' : 'text-[#F5F5DC]/70 hover:text-white hover:bg-[#1F2937] border-l-2 border-transparent pl-[10px]'}`}>
                      <Icon className="w-4 h-4 flex-shrink-0" /><span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="px-3 py-4 border-t border-[#1F2937]">
            <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
              <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-sm">A</div>
              <div className="flex-1 min-w-0"><p className="text-white text-sm font-medium truncate">{adminUser?.name || 'Admin'}</p><p className="text-[#6B7280] text-xs truncate">{adminUser?.email}</p></div>
            </div>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-red-400 hover:bg-[#1F2937] transition-all duration-200 border-l-2 border-transparent">
              <LogOut className="w-4 h-4 flex-shrink-0" /><span>Sign Out</span>
            </button>
            <button onClick={() => navigate('home')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#F97316] hover:bg-[#1F2937] transition-all duration-200 border-l-2 border-transparent mt-1">
              <ExternalLink className="w-4 h-4 flex-shrink-0" /><span>View Site</span>
            </button>
          </div>
        </aside>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-[#1F2937] flex items-center justify-between px-6 bg-[#111827] sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#6B7280] hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-base font-bold text-white">{currentView === 'dashboard' ? 'Dashboard' : currentView === 'admin-blogs' ? 'Blog Posts' : currentView === 'admin-places' ? 'Places' : currentView === 'admin-gallery' ? 'Gallery' : currentView === 'admin-analytics' ? 'Analytics' : 'Settings'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 bg-[#1F2937] border border-[#374151] rounded-xl flex items-center justify-center text-[#6B7280] hover:text-white">
              <Bell className="w-4 h-4" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
            </button>
            <div className="w-9 h-9 bg-[#14532D] rounded-xl flex items-center justify-center text-white font-bold text-sm cursor-pointer">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#0B0F19]">
          <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            {currentView === 'dashboard' && <AdminDashboard places={places} blogs={blogs} galleryImages={galleryImages} analytics={analytics} navigate={navigate} />}
            {currentView === 'admin-blogs' && <AdminBlogs blogs={blogs} fetchData={fetchData} />}
            {currentView === 'admin-places' && <AdminPlaces places={places} fetchData={fetchData} />}
            {currentView === 'admin-gallery' && <AdminGallery images={galleryImages} fetchData={fetchData} />}
            {currentView === 'admin-analytics' && <AdminAnalytics analytics={analytics} />}
            {currentView === 'admin-settings' && <AdminSettings />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// ============================================
// ADMIN LOGIN PAGE
// ============================================
function AdminLoginPage({ onLogin, onBack }: { onLogin: (email: string, password: string) => Promise<boolean>; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14532D]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full blur-3xl" />
      </div>
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-sm z-10">
        <ArrowLeft className="w-4 h-4" />Back to site
      </button>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#14532D] rounded-2xl flex items-center justify-center"><Compass className="w-6 h-6 text-white" /></div>
            <div className="w-10 h-10 bg-[#1F2937] border border-[#374151] rounded-xl flex items-center justify-center"><Lock className="w-5 h-5 text-[#F97316]" /></div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1"><span className="text-white">Hidden</span><span className="text-[#F97316]">Pak</span></h1>
          <p className="text-[#6B7280] text-sm">Admin Portal</p>
        </div>
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#F5F5DC] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#F5F5DC] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#14532D] transition-colors" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ADMIN DASHBOARD
// ============================================
function AdminDashboard({ places, blogs, galleryImages, analytics, navigate }: {
  places: Place[]; blogs: Blog[]; galleryImages: GalleryImage[];
  analytics: AnalyticsData | null; navigate: (v: View) => void;
}) {
  const statsCards = [
    { label: 'Total Blogs', value: blogs.length, trend: '+12%', icon: FileText, iconBg: 'bg-[#14532D]/30', iconColor: 'text-emerald-400', borderColor: 'border-[#14532D]/30' },
    { label: 'Total Places', value: places.length, trend: '+8%', icon: MapPin, iconBg: 'bg-[#F97316]/20', iconColor: 'text-[#F97316]', borderColor: 'border-[#F97316]/20' },
    { label: 'Gallery Photos', value: galleryImages.length, trend: '+24%', icon: Image, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', borderColor: 'border-purple-500/20' },
    { label: 'Total Views', value: '48.2K', trend: '+18%', icon: Eye, iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400', borderColor: 'border-teal-500/20' },
  ];

  const quickActions = [
    { label: 'New Blog Post', desc: 'Write and publish a new travel blog', view: 'admin-blogs' as View, icon: FileText, iconBg: 'bg-[#F97316]/20', iconColor: 'text-[#F97316]' },
    { label: 'Add Place', desc: 'Add a new destination to HiddenPak', view: 'admin-places' as View, icon: MapPin, iconBg: 'bg-[#14532D]/30', iconColor: 'text-emerald-400' },
    { label: 'Upload Photos', desc: 'Add images to the gallery', view: 'admin-gallery' as View, icon: Image, iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400' },
    { label: 'View Analytics', desc: 'Check traffic and engagement stats', view: 'admin-analytics' as View, icon: BarChart3, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400' },
  ];

  const recentBlogs = blogs.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, Admin</h2>
        <p className="text-[#6B7280] text-sm">Here&apos;s what&apos;s happening with HiddenPak today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statsCards.map(card => (
          <div key={card.label} className={`bg-[#111827] rounded-2xl border ${card.borderColor} p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center`}><card.icon className={`w-5 h-5 ${card.iconColor}`} /></div>
              <span className="text-xs font-semibold flex items-center gap-1 text-emerald-400"><TrendingUp className="w-3 h-3" />{card.trend}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-[#6B7280]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Recent Blog Posts</h3>
          <button onClick={() => navigate('admin-blogs')} className="text-sm text-[#F97316] hover:text-[#EA6D0E] transition-colors flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#1F2937]">
              <th className="text-left text-[#6B7280] font-medium pb-3 pr-4">Title</th>
              <th className="text-left text-[#6B7280] font-medium pb-3 pr-4 hidden sm:table-cell">Category</th>
              <th className="text-left text-[#6B7280] font-medium pb-3 pr-4 hidden md:table-cell">Date</th>
              <th className="text-left text-[#6B7280] font-medium pb-3 hidden lg:table-cell">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-[#1F2937]/60">
              {recentBlogs.map(blog => (
                <tr key={blog.id} className="group">
                  <td className="py-3 pr-4 max-w-xs"><p className="text-[#F5F5DC] font-medium truncate">{blog.title}</p></td>
                  <td className="py-3 pr-4 hidden sm:table-cell"><span className="px-2.5 py-1 bg-[#14532D]/20 text-emerald-400 rounded-lg text-xs font-medium">{blog.category}</span></td>
                  <td className="py-3 pr-4 text-[#6B7280] hidden md:table-cell">{blog.date}</td>
                  <td className="py-3 hidden lg:table-cell"><span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">Published</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map(action => (
          <button key={action.label} onClick={() => navigate(action.view)} className="bg-[#111827] border border-[#1F2937] hover:border-[#F97316]/40 rounded-2xl p-5 hover:bg-[#1a2235] transition-all duration-200 group text-left">
            <div className={`w-11 h-11 ${action.iconBg} rounded-xl flex items-center justify-center mb-4`}><action.icon className={`w-5 h-5 ${action.iconColor}`} /></div>
            <p className="text-white font-semibold text-sm mb-1">{action.label}</p>
            <p className="text-[#6B7280] text-xs leading-relaxed">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// ADMIN BLOGS
// ============================================
function AdminBlogs({ blogs, fetchData }: { blogs: Blog[]; fetchData: () => void }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const emptyBlog = { title: '', slug: '', excerpt: '', content: '', coverImage: '', author: '', category: '', tags: '', published: false };
  const [form, setForm] = useState(emptyBlog);

  const getAuthHeader = () => {
    try {
      const stored = sessionStorage.getItem('hiddenpak_admin');
      if (stored) { const user = JSON.parse(stored); if (user.token) return { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }; }
    } catch { /* ignore */ }
    return { 'Content-Type': 'application/json' };
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/blogs/${id}`, { method: 'DELETE', headers: getAuthHeader() });
      await fetchData();
    } catch { /* ignore */ }
    finally { setDeleting(null); }
  };

  const openEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setForm({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt, content: blog.content, coverImage: blog.coverImage, author: blog.author, category: blog.category, tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '', published: blog.published });
    setShowModal(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setSaveError('');
    try {
      const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [], date: new Date().toISOString().split('T')[0] };
      const url = editingId ? `${API}/blogs/${editingId}` : `${API}/blogs`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { setShowModal(false); setEditingId(null); setForm(emptyBlog); await fetchData(); }
      else setSaveError(data.message || data.error || 'Failed to save blog');
    } catch { setSaveError('Network error. Please try again.'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyBlog); }} className="p-2 hover:bg-[#1F2937] rounded-lg text-[#6B7280] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Title *</label><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Amazing trek in Hunza..." /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Slug (auto if empty)</label><input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="amazing-trek-hunza" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Author</label><input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Ahmed Khan" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Category</label><input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Trekking" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Tags (comma separated)</label><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="hunza, trek, mountain" /></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Cover Image URL</label><input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="https://images.unsplash.com/..." /></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Excerpt</label><textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] resize-none" placeholder="Brief description..." /></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Content</label><textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] resize-none" placeholder="Full blog content..." /></div>
                <div className="sm:col-span-2 flex items-center gap-3"><input type="checkbox" id="blog-published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#F97316]" /><label htmlFor="blog-published" className="text-sm text-[#9CA3AF]">Publish immediately</label></div>
              </div>
              {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyBlog); }} className="flex-1 px-4 py-2.5 bg-[#1F2937] text-[#9CA3AF] rounded-xl text-sm font-medium hover:bg-[#374151] transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">{saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : editingId ? 'Update Post' : 'Create Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-white">Blog Posts</h2><p className="text-[#6B7280] text-sm">Manage your travel blog content</p></div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"><Plus className="w-4 h-4" />New Post</button>
      </div>
      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#1F2937]">
              <th className="text-left text-[#6B7280] font-medium p-4">Title</th>
              <th className="text-left text-[#6B7280] font-medium p-4 hidden sm:table-cell">Category</th>
              <th className="text-left text-[#6B7280] font-medium p-4 hidden md:table-cell">Author</th>
              <th className="text-left text-[#6B7280] font-medium p-4 hidden lg:table-cell">Status</th>
              <th className="text-left text-[#6B7280] font-medium p-4">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#1F2937]/60">
              {blogs.map(blog => (
                <tr key={blog.id} className="group hover:bg-[#1F2937]/30">
                  <td className="p-4"><p className="text-[#F5F5DC] font-medium truncate max-w-xs">{blog.title}</p><p className="text-[#6B7280] text-xs mt-0.5">{blog.date}</p></td>
                  <td className="p-4 hidden sm:table-cell"><span className="px-2.5 py-1 bg-[#14532D]/20 text-emerald-400 rounded-lg text-xs font-medium">{blog.category}</span></td>
                  <td className="p-4 text-[#6B7280] hidden md:table-cell">{blog.author}</td>
                  <td className="p-4 hidden lg:table-cell"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${blog.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{blog.published ? 'Published' : 'Draft'}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(blog)} className="p-1.5 bg-[#1F2937] hover:bg-blue-500/20 text-[#6B7280] hover:text-blue-400 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(blog.id)} disabled={deleting === blog.id} className="p-1.5 bg-[#1F2937] hover:bg-red-500/20 text-[#6B7280] hover:text-red-400 rounded-lg transition-colors disabled:opacity-50">
                        {deleting === blog.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {blogs.length === 0 && <div className="p-12 text-center text-[#6B7280]">No blog posts yet. Create your first one!</div>}
      </div>
    </div>
  );
}

// ============================================
// ADMIN PLACES
// ============================================
function AdminPlaces({ places, fetchData }: { places: Place[]; fetchData: () => void }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const emptyPlace = { name: '', slug: '', region: '', description: '', longDescription: '', image: '', altitude: '', bestTime: '', category: '', rating: '4.5', featured: false };
  const [form, setForm] = useState(emptyPlace);

  const getAuthHeader = () => {
    try {
      const stored = sessionStorage.getItem('hiddenpak_admin');
      if (stored) { const user = JSON.parse(stored); if (user.token) return { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }; }
    } catch { /* ignore */ }
    return { 'Content-Type': 'application/json' };
  };

  const openEdit = (p: Place) => {
    setEditingId(p.id);
    setForm({ name: p.name, slug: p.slug, region: p.region, description: p.description, longDescription: p.longDescription, image: p.image, altitude: p.altitude, bestTime: p.bestTime, category: p.category, rating: String(p.rating), featured: p.featured });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this place?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/places/${id}`, { method: 'DELETE', headers: getAuthHeader() });
      await fetchData();
    } catch { /* ignore */ }
    finally { setDeleting(null); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setSaveError('');
    try {
      const payload = { ...form, slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), rating: parseFloat(form.rating) || 4.5 };
      const url = editingId ? `${API}/places/${editingId}` : `${API}/places`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { setShowModal(false); setEditingId(null); setForm(emptyPlace); await fetchData(); }
      else setSaveError(data.message || data.error || 'Failed to save place');
    } catch { setSaveError('Network error. Please try again.'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Place' : 'Add New Place'}</h3>
              <button onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyPlace); }} className="p-2 hover:bg-[#1F2937] rounded-lg text-[#6B7280] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-[#6B7280] mb-1">Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Fairy Meadows" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Region *</label><input required value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Gilgit-Baltistan" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Category *</label><input required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Alpine Meadow" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Slug (auto if empty)</label><input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="fairy-meadows" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Altitude</label><input value={form.altitude} onChange={e => setForm(f => ({ ...f, altitude: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="3,300m" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Best Time to Visit</label><input value={form.bestTime} onChange={e => setForm(f => ({ ...f, bestTime: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="June – September" /></div>
                <div><label className="block text-xs text-[#6B7280] mb-1">Rating (0–5)</label><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" /></div>
                <div className="flex items-center gap-3 pt-5"><input type="checkbox" id="place-featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-[#F97316]" /><label htmlFor="place-featured" className="text-sm text-[#9CA3AF]">Mark as Featured</label></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Image URL *</label><input required value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="https://images.unsplash.com/..." /></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Short Description *</label><textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] resize-none" placeholder="Brief description..." /></div>
                <div className="sm:col-span-2"><label className="block text-xs text-[#6B7280] mb-1">Full Description</label><textarea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} rows={4} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] resize-none" placeholder="Detailed description..." /></div>
              </div>
              {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyPlace); }} className="flex-1 px-4 py-2.5 bg-[#1F2937] text-[#9CA3AF] rounded-xl text-sm font-medium hover:bg-[#374151] transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">{saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : editingId ? 'Update Place' : 'Add Place'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-white">Places</h2><p className="text-[#6B7280] text-sm">Manage travel destinations</p></div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"><Plus className="w-4 h-4" />Add Place</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {places.map(place => (
          <div key={place.id} className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden group hover:border-[#14532D]/40 transition-colors">
            <div className="relative h-40 overflow-hidden">
              <img src={place.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"} alt={place.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /><span className="text-white text-xs">{place.rating}</span></div>
              {place.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-[#F97316] rounded-lg text-xs font-semibold text-white">Featured</div>}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{place.name}</h3>
              <p className="text-[#6B7280] text-xs flex items-center gap-1 mb-3"><MapPin className="w-3 h-3 text-[#F97316]" />{place.region}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#14532D]/20 text-emerald-400 rounded-lg text-xs font-medium">{place.category}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(place)} className="p-1.5 bg-[#1F2937] hover:bg-blue-500/20 text-[#6B7280] hover:text-blue-400 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(place.id)} disabled={deleting === place.id} className="p-1.5 bg-[#1F2937] hover:bg-red-500/20 text-[#6B7280] hover:text-red-400 rounded-lg transition-colors disabled:opacity-50">
                    {deleting === place.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {places.length === 0 && <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-12 text-center text-[#6B7280]">No places yet. Add your first destination!</div>}
    </div>
  );
}

// ============================================
// ADMIN GALLERY
// ============================================
function AdminGallery({ images, fetchData }: { images: GalleryImage[]; fetchData: () => void }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const emptyImg = { src: '', alt: '', location: '', height: 'normal' };
  const [form, setForm] = useState(emptyImg);

  const getAuthHeader = () => {
    try {
      const stored = sessionStorage.getItem('hiddenpak_admin');
      if (stored) { const user = JSON.parse(stored); if (user.token) return { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }; }
    } catch { /* ignore */ }
    return { 'Content-Type': 'application/json' };
  };

  const openEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setForm({ src: img.src, alt: img.alt, location: img.location, height: img.height });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/gallery/${id}`, { method: 'DELETE', headers: getAuthHeader() });
      await fetchData();
    } catch { /* ignore */ }
    finally { setDeleting(null); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setSaveError('');
    try {
      const url = editingId ? `${API}/gallery/${editingId}` : `${API}/gallery`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setShowModal(false); setEditingId(null); setForm(emptyImg); await fetchData(); }
      else setSaveError(data.message || data.error || 'Failed to save image');
    } catch { setSaveError('Network error. Please try again.'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Photo' : 'Add Photo'}</h3>
              <button onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyImg); }} className="p-2 hover:bg-[#1F2937] rounded-lg text-[#6B7280] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div><label className="block text-xs text-[#6B7280] mb-1">Image URL *</label><input required value={form.src} onChange={e => setForm(f => ({ ...f, src: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="https://images.unsplash.com/..." /></div>
              <div><label className="block text-xs text-[#6B7280] mb-1">Caption / Alt Text *</label><input required value={form.alt} onChange={e => setForm(f => ({ ...f, alt: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Sunset over Nanga Parbat" /></div>
              <div><label className="block text-xs text-[#6B7280] mb-1">Location *</label><input required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]" placeholder="Gilgit-Baltistan" /></div>
              <div><label className="block text-xs text-[#6B7280] mb-1">Height</label>
                <select value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))} className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]">
                  <option value="normal">Normal</option><option value="tall">Tall</option><option value="short">Short</option>
                </select>
              </div>
              {form.src && <div className="rounded-xl overflow-hidden h-32 bg-[#1F2937]"><img src={form.src} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} /></div>}
              {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); setForm(emptyImg); }} className="flex-1 px-4 py-2.5 bg-[#1F2937] text-[#9CA3AF] rounded-xl text-sm font-medium hover:bg-[#374151] transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#F97316] hover:bg-[#EA6D0E] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">{saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : editingId ? 'Update Photo' : 'Add Photo'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-white">Gallery</h2><p className="text-[#6B7280] text-sm">{images.length} photos in your gallery</p></div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6D0E] text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"><Plus className="w-4 h-4" />Add Photo</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative rounded-2xl overflow-hidden group bg-[#111827] border border-[#1F2937] aspect-[4/3]">
            <img src={img.src || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => openEdit(img)} className="p-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-xl transition-colors"><Pencil className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(img.id)} disabled={deleting === img.id} className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl transition-colors disabled:opacity-50">
                {deleting === img.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-medium truncate">{img.alt}</p>
              <p className="text-white/60 text-[10px] flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{img.location}</p>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-12 text-center text-[#6B7280]">No images yet. Upload your first photo!</div>}
    </div>
  );
}

// ============================================
// ADMIN ANALYTICS
// ============================================
function AdminAnalytics({ analytics }: { analytics: AnalyticsData | null }) {
  if (!analytics) return <div className="text-[#6B7280] text-center py-12">Loading analytics...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Analytics Overview</h2>
        <p className="text-[#6B7280] text-sm">Platform event tracking and statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <p className="text-sm text-[#6B7280] mb-2">Total Events Tracked</p>
          <p className="text-4xl font-bold text-white">{analytics.totalEvents}</p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <p className="text-sm text-[#6B7280] mb-2">Event Types</p>
          <p className="text-4xl font-bold text-white">{analytics.eventTypes.length}</p>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <p className="text-sm text-[#6B7280] mb-2">Recent Events (last 10)</p>
          <p className="text-4xl font-bold text-white">{analytics.recentEvents.length}</p>
        </div>
      </div>

      {analytics.eventTypes.length > 0 && (
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Events by Type</h3>
          <div className="space-y-3">
            {analytics.eventTypes.map(et => (
              <div key={et._id} className="flex items-center gap-4 p-3 bg-[#1F2937]/50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{et._id}</p>
                </div>
                <span className="px-3 py-1 bg-[#14532D]/20 text-emerald-400 rounded-lg text-sm font-bold">{et.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics.recentEvents.length > 0 && (
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Events</h3>
          <div className="space-y-2">
            {analytics.recentEvents.map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-[#1F2937]/50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{ev.eventType}</p>
                  <p className="text-[#6B7280] text-xs">{ev.page}</p>
                </div>
                <span className="text-[#6B7280] text-xs whitespace-nowrap">
                  {ev.timestamp ? new Date(ev.timestamp).toLocaleDateString() : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics.totalEvents === 0 && (
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-12 text-center text-[#6B7280]">
          No analytics events tracked yet.
        </div>
      )}
    </div>
  );
}

// ============================================
// ADMIN SETTINGS
// ============================================
function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/settings`).then(r => r.json()).then(d => { if (d.success) setSettings(d.data); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      let authHeader = '';
      try {
        const stored = sessionStorage.getItem('hiddenpak_admin');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.token) authHeader = `Bearer ${user.token}`;
        }
      } catch { /* ignore */ }
      await fetch(`${API}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(authHeader ? { Authorization: authHeader } : {}) },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  if (!settings) return <div className="text-[#6B7280] text-center py-12">Loading settings...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-white">Settings</h2><p className="text-[#6B7280] text-sm">Manage your site configuration</p></div>
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#F97316] hover:bg-[#EA6D0E] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : saved ? <><CheckCircle2 className="w-4 h-4" />Saved!</> : 'Save Changes'}
        </button>
      </div>
      <div className="space-y-6">
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-[#6B7280] mb-1">Site Name</label><input value={settings.siteName || ''} onChange={e => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">Tagline</label><input value={settings.siteTagline || ''} onChange={e => setSettings({ ...settings, siteTagline: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">Contact Email</label><input value={settings.contactEmail || ''} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">Contact Phone</label><input value={settings.contactPhone || ''} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
          </div>
        </div>
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-[#6B7280] mb-1">Facebook</label><input value={settings.facebookUrl || ''} onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">Instagram</label><input value={settings.instagramUrl || ''} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">Twitter/X</label><input value={settings.twitterUrl || ''} onChange={e => setSettings({ ...settings, twitterUrl: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
            <div><label className="block text-sm text-[#6B7280] mb-1">YouTube</label><input value={settings.youtubeUrl || ''} onChange={e => setSettings({ ...settings, youtubeUrl: e.target.value })} className="w-full px-4 py-2.5 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm focus:outline-none focus:border-[#14532D]" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
