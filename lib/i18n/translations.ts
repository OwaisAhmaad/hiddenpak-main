/**
 * HiddenPak — Bilingual translations (English + Urdu)
 * Add new keys here and use via useLanguage() hook.
 */

export type Lang = "en" | "ur";

export const translations = {
  en: {
    /** Navbar */
    nav_home: "Home",
    nav_places: "Places",
    nav_blog: "Blog",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    nav_explore: "Explore",
    nav_lang_toggle: "اردو",

    /** Hero */
    hero_badge: "Explore Pakistan Like Never Before",
    hero_title_1: "Discover Pakistan's",
    hero_title_2: "Hidden Gems",
    hero_subtitle:
      "From untouched valleys to forgotten villages — uncover the breathtaking landscapes and rich culture that most travellers never see.",
    hero_search_placeholder: "Search destinations...",
    hero_cta_explore: "Explore Places",
    hero_cta_stories: "Read Stories",
    hero_stat_places: "Hidden Places",
    hero_stat_stories: "Travel Stories",
    hero_stat_explorers: "Explorers",
    hero_scroll: "Scroll",

    /** Sections */
    section_featured_label: "POPULAR DESTINATIONS",
    section_featured_title: "Featured Destinations",
    section_featured_desc:
      "Hand-picked hidden gems across Pakistan waiting to be explored.",
    section_featured_cta: "View All Destinations",

    section_blogs_label: "TRAVEL STORIES",
    section_blogs_title: "Latest Travel Stories",
    section_blogs_desc:
      "Real experiences from travellers who ventured off the beaten path.",
    section_blogs_cta: "View All Stories",

    section_gallery_label: "PHOTO GALLERY",
    section_gallery_title: "Moments Captured",
    section_gallery_desc:
      "A visual journey through Pakistan's most stunning landscapes.",
    section_gallery_cta: "View Full Gallery",

    section_testimonials_label: "WHAT TRAVELERS SAY",
    section_testimonials_title: "Trusted by Explorers",

    /** Place detail */
    place_back: "Back to Places",
    place_about: "About this Place",
    place_gallery: "Photo Gallery",
    place_map: "Location on Map",
    place_open_maps: "Open in Google Maps",
    place_quick_info: "Quick Info",
    place_region: "Region",
    place_category: "Category",
    place_altitude: "Altitude",
    place_best_time: "Best Time to Visit",
    place_rating: "Rating",
    place_weather: "Local Weather",
    place_weather_desc: "Check current weather before your trip.",
    place_check_weather: "Check Weather",
    place_plan_visit: "Plan Your Visit",
    place_plan_desc: "Ready to explore? Get tips and plan your perfect trip.",
    place_contact_us: "Contact Us",
    place_reviews: "Traveler Reviews",
    place_related: "Nearby Places",
    place_share: "Share this Place",

    /** Blog detail */
    blog_back: "Back to Blogs",
    blog_share: "Share:",
    blog_tags: "Tags:",
    blog_about_author: "About the Author",
    blog_related: "Related Stories",
    blog_read_more: "Read More",
    blog_toc: "Table of Contents",

    /** Gallery */
    gallery_title: "Photo Gallery",
    gallery_subtitle:
      "A visual journey through Pakistan's most breathtaking landscapes.",
    gallery_filter_all: "All",
    gallery_close: "Close",

    /** Contact */
    contact_title: "Get in Touch",
    contact_subtitle:
      "Have a question or want to share a hidden gem? We'd love to hear from you.",
    contact_name: "Full Name",
    contact_email: "Email Address",
    contact_subject: "Subject",
    contact_message: "Message",
    contact_send: "Send Message",
    contact_sending: "Sending...",
    contact_success: "Message sent successfully! We'll get back to you soon.",
    contact_error_name: "Name is required",
    contact_error_email: "Valid email is required",
    contact_error_subject: "Subject is required",
    contact_error_message: "Message must be at least 20 characters",
    contact_info_location: "Location",
    contact_info_email: "Email",
    contact_info_phone: "Phone",
    contact_info_hours: "Office Hours",
    contact_follow: "Follow Us",

    /** Footer */
    footer_desc:
      "Your ultimate guide to Pakistan's most breathtaking and undiscovered destinations.",
    footer_explore: "Explore",
    footer_categories: "Categories",
    footer_newsletter: "Stay Updated",
    footer_newsletter_desc: "Get the latest travel stories delivered to your inbox.",
    footer_newsletter_placeholder: "your@email.com",
    footer_newsletter_btn: "Subscribe",
    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    /** Admin */
    admin_login_title: "Admin Portal",
    admin_login_subtitle: "Sign in to manage your platform",
    admin_login_email: "Email Address",
    admin_login_password: "Password",
    admin_login_btn: "Sign In",
    admin_login_loading: "Signing in...",
    admin_login_back: "Back to Website",

    /** Common */
    btn_explore: "Explore →",
    btn_read_more: "Read More →",
    btn_view_all: "View All",
    loading: "Loading...",
    not_found: "Not found",
    error_generic: "Something went wrong.",
  },

  ur: {
    /** Navbar */
    nav_home: "ہوم",
    nav_places: "مقامات",
    nav_blog: "بلاگ",
    nav_gallery: "گیلری",
    nav_contact: "رابطہ",
    nav_explore: "دریافت کریں",
    nav_lang_toggle: "English",

    /** Hero */
    hero_badge: "پاکستان کو نئے انداز سے دریافت کریں",
    hero_title_1: "پاکستان کے",
    hero_title_2: "پوشیدہ خزانے",
    hero_subtitle:
      "انچھوئی وادیوں سے لے کر بھولے ہوئے گاؤں تک — ان حیرت انگیز مناظر اور بھرپور ثقافت کو دریافت کریں جو زیادہ تر سیاح کبھی نہیں دیکھتے۔",
    hero_search_placeholder: "منزل تلاش کریں...",
    hero_cta_explore: "مقامات دریافت کریں",
    hero_cta_stories: "سفرنامے پڑھیں",
    hero_stat_places: "پوشیدہ مقامات",
    hero_stat_stories: "سفری کہانیاں",
    hero_stat_explorers: "مسافر",
    hero_scroll: "نیچے",

    /** Sections */
    section_featured_label: "مشہور مقامات",
    section_featured_title: "نمایاں منازل",
    section_featured_desc: "پاکستان بھر میں ہاتھ سے چنے ہوئے پوشیدہ خزانے آپ کا انتظار کر رہے ہیں۔",
    section_featured_cta: "تمام مقامات دیکھیں",

    section_blogs_label: "سفری کہانیاں",
    section_blogs_title: "تازہ ترین سفرنامے",
    section_blogs_desc: "ان مسافروں کے حقیقی تجربات جنہوں نے عام راستوں سے ہٹ کر سفر کیا۔",
    section_blogs_cta: "تمام کہانیاں دیکھیں",

    section_gallery_label: "فوٹو گیلری",
    section_gallery_title: "یادگار لمحات",
    section_gallery_desc: "پاکستان کے حیرت انگیز مناظر کا بصری سفر۔",
    section_gallery_cta: "مکمل گیلری دیکھیں",

    section_testimonials_label: "مسافروں کی رائے",
    section_testimonials_title: "مسافروں کا اعتماد",

    /** Place detail */
    place_back: "مقامات پر واپس",
    place_about: "اس جگہ کے بارے میں",
    place_gallery: "تصویری گیلری",
    place_map: "نقشے پر مقام",
    place_open_maps: "گوگل میپس میں کھولیں",
    place_quick_info: "فوری معلومات",
    place_region: "علاقہ",
    place_category: "قسم",
    place_altitude: "بلندی",
    place_best_time: "بہترین وقت",
    place_rating: "درجہ بندی",
    place_weather: "مقامی موسم",
    place_weather_desc: "سفر سے پہلے موسم چیک کریں۔",
    place_check_weather: "موسم چیک کریں",
    place_plan_visit: "سفر کا منصوبہ بنائیں",
    place_plan_desc: "تیار ہیں؟ تجاویز حاصل کریں اور اپنا بہترین سفر ترتیب دیں۔",
    place_contact_us: "ہم سے رابطہ کریں",
    place_reviews: "مسافروں کے تاثرات",
    place_related: "قریبی مقامات",
    place_share: "شیئر کریں",

    /** Blog detail */
    blog_back: "بلاگ پر واپس",
    blog_share: "شیئر کریں:",
    blog_tags: "ٹیگز:",
    blog_about_author: "مصنف کے بارے میں",
    blog_related: "متعلقہ کہانیاں",
    blog_read_more: "مزید پڑھیں",
    blog_toc: "فہرست مضامین",

    /** Gallery */
    gallery_title: "فوٹو گیلری",
    gallery_subtitle: "پاکستان کے حیرت انگیز مناظر کا بصری سفر۔",
    gallery_filter_all: "سب",
    gallery_close: "بند کریں",

    /** Contact */
    contact_title: "رابطہ کریں",
    contact_subtitle: "کوئی سوال ہے یا کوئی پوشیدہ مقام شیئر کرنا چاہتے ہیں؟ ہم آپ کا انتظار کر رہے ہیں۔",
    contact_name: "پورا نام",
    contact_email: "ای میل",
    contact_subject: "موضوع",
    contact_message: "پیغام",
    contact_send: "پیغام بھیجیں",
    contact_sending: "بھیجا جا رہا ہے...",
    contact_success: "پیغام کامیابی سے بھیج دیا گیا! ہم جلد آپ سے رابطہ کریں گے۔",
    contact_error_name: "نام ضروری ہے",
    contact_error_email: "درست ای میل درکار ہے",
    contact_error_subject: "موضوع ضروری ہے",
    contact_error_message: "پیغام کم از کم ۲۰ حروف کا ہونا چاہیے",
    contact_info_location: "پتہ",
    contact_info_email: "ای میل",
    contact_info_phone: "فون",
    contact_info_hours: "دفتری اوقات",
    contact_follow: "ہمیں فالو کریں",

    /** Footer */
    footer_desc: "پاکستان کے انتہائی خوبصورت اور نادریافت مقامات کے لیے آپ کی مکمل رہنما۔",
    footer_explore: "دریافت کریں",
    footer_categories: "اقسام",
    footer_newsletter: "تازہ رہیں",
    footer_newsletter_desc: "تازہ ترین سفری کہانیاں اپنے ان باکس میں پائیں۔",
    footer_newsletter_placeholder: "آپ کی ای میل",
    footer_newsletter_btn: "سبسکرائب",
    footer_rights: "تمام حقوق محفوظ ہیں۔",
    footer_privacy: "رازداری کی پالیسی",
    footer_terms: "خدمات کی شرائط",

    /** Admin */
    admin_login_title: "ایڈمن پورٹل",
    admin_login_subtitle: "اپنا پلیٹ فارم منظم کرنے کے لیے سائن ان کریں",
    admin_login_email: "ای میل",
    admin_login_password: "پاس ورڈ",
    admin_login_btn: "سائن ان",
    admin_login_loading: "سائن ان ہو رہا ہے...",
    admin_login_back: "ویب سائٹ پر واپس",

    /** Common */
    btn_explore: "دریافت کریں ←",
    btn_read_more: "مزید پڑھیں ←",
    btn_view_all: "سب دیکھیں",
    loading: "لوڈ ہو رہا ہے...",
    not_found: "نہیں ملا",
    error_generic: "کچھ غلط ہو گیا۔",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
